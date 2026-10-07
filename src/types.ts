export interface Song {
  id: string;
  spotifyTrackId: string;
  title: string;
  releaseYear: string;
  duration: string;
  genre: string;
  description: string;
  spotifyUrl: string;
  previewUrl: string;
  spotifyPreviewUrl: string;
  coverImage: string;
  bpm: number;
  highlightText: string;
  stats?: string;
}

export interface ShowPackage {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  description: string;
  duration: string;
  features: string[];
  recommendedFor: string;
  whatsappMessage: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  handle: string;
  followers?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
