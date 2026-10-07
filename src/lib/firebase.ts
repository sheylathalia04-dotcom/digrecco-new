import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Initialize Firestore with specific database ID if provided
const customDbId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;
export const db = customDbId
  ? getFirestore(app, customDbId)
  : getFirestore(app);

// Types
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  favoriteSongs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FanReply {
  id: string;
  userId?: string;
  userName: string;
  userPhoto?: string;
  replyText: string;
  createdAt: string;
  likesCount?: number;
}

export interface FanMessage {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  message: string;
  favoriteSong?: string;
  rating?: number; // 1 a 5 estrelas tipo avaliação / reseña
  roleTag?: string; // "Debutante 15 Anos", "Fã Oficial", etc.
  likesCount?: number;
  replies?: FanReply[];
  createdAt: string;
}

export interface DebutanteQuote {
  id?: string;
  userId: string;
  debutanteName: string;
  eventDate: string;
  city: string;
  packageType: string;
  estimatedGuests: number;
  specialSong: string;
  notes: string;
  phone: string;
  status: "pending" | "contacted" | "confirmed";
  createdAt: string;
}

let inMemoryGoogleAccessToken: string | null = null;

export function getGoogleAccessToken(): string | null {
  return inMemoryGoogleAccessToken;
}

export function setGoogleAccessToken(token: string | null) {
  inMemoryGoogleAccessToken = token;
}

// Google Sign-In helper
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      inMemoryGoogleAccessToken = credential.accessToken;
    }

    // Sync or create user profile in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      const newProfile: UserProfile = {
        id: user.uid,
        displayName: user.displayName || "Fã Di Grecco",
        email: user.email || "",
        photoURL: user.photoURL || undefined,
        favoriteSongs: ["checkmate"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, newProfile);
    }

    return user;
  } catch (error: any) {
    console.error("Google Sign-in error:", error);
    throw error;
  }
}

// Sign-out helper
export async function logoutUser() {
  inMemoryGoogleAccessToken = null;
  await signOut(auth);
}

// Fetch user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (e) {
    console.warn("Error fetching user profile:", e);
    return null;
  }
}

// Toggle song favorite
export async function toggleFavoriteSong(uid: string, songId: string): Promise<string[]> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  let favorites: string[] = [];

  if (snap.exists()) {
    favorites = (snap.data() as UserProfile).favoriteSongs || [];
  }

  if (favorites.includes(songId)) {
    favorites = favorites.filter((id) => id !== songId);
  } else {
    favorites.push(songId);
  }

  await setDoc(ref, { favoriteSongs: favorites, updatedAt: new Date().toISOString() }, { merge: true });
  return favorites;
}

// Fan Messages Firestore real-time listener
export function subscribeFanMessages(callback: (messages: FanMessage[]) => void) {
  const colRef = collection(db, "fanMessages");
  const q = query(colRef, orderBy("createdAt", "desc"), limit(50));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: FanMessage[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<FanMessage, "id">) });
      });
      callback(list);
    },
    (err) => {
      console.warn("Firestore snapshot error (fanMessages):", err);
    }
  );
}

// Add new Fan Message (Reseña / Comentario de fan)
export async function addFanMessage(msg: Omit<FanMessage, "id">): Promise<string> {
  const colRef = collection(db, "fanMessages");
  const res = await addDoc(colRef, {
    ...msg,
    likesCount: msg.likesCount || 0,
    replies: msg.replies || [],
  });
  return res.id;
}

// Add reply to an existing comment (estilo comentários do Instagram)
export async function addFanReply(messageId: string, reply: FanReply): Promise<void> {
  const msgRef = doc(db, "fanMessages", messageId);
  await updateDoc(msgRef, {
    replies: arrayUnion(reply),
  });
}

// Like a comment
export async function likeFanMessage(messageId: string): Promise<void> {
  const msgRef = doc(db, "fanMessages", messageId);
  await updateDoc(msgRef, {
    likesCount: increment(1),
  });
}

// Save Debutante Quote
export async function saveDebutanteQuote(quote: Omit<DebutanteQuote, "id">): Promise<string> {
  const colRef = collection(db, "debutanteQuotes");
  const res = await addDoc(colRef, quote);
  return res.id;
}

// Get user's saved Debutante Quotes
export async function getUserDebutanteQuotes(userId: string): Promise<DebutanteQuote[]> {
  try {
    const colRef = collection(db, "debutanteQuotes");
    const q = query(colRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const list: DebutanteQuote[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as Omit<DebutanteQuote, "id">) });
    });
    return list;
  } catch (e) {
    console.warn("Error fetching user quotes:", e);
    return [];
  }
}
