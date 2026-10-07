import { GoogleGenAI } from "@google/genai";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

type ChatRequest = {
  message?: unknown;
  history?: unknown;
  modelChoice?: unknown;
  userLang?: unknown;
  customRole?: unknown;
  useSearchGrounding?: unknown;
};

type ApiRequest = {
  method?: string;
  body?: ChatRequest;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (data: Record<string, unknown>) => void;
};

const systemInstruction = (language: "es" | "pt" | "en", role?: string) => {
  const languageName = language === "es" ? "Spanish" : language === "en" ? "English" : "Portuguese";

  return `You are DiGrecco Bot, the official assistant for Brazilian pop duo Camilla and Giovanna Di Grecco. Reply only in ${languageName}. Be friendly and accurate. They are sisters from Cuiabá, based in São Paulo, and both studied Architecture and Urbanism. Their 15th-birthday shows feature live covers, pop choreography, professional dancers, and a rehearsal with the debutante. Their original songs are available on Spotify and YouTube; do not claim they usually perform their original songs at these events. Booking prices depend on event location and date. Direct booking contact: WhatsApp +55 11 97308-7302. ${role ? `Additional requested role: ${role}` : ""}`;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { message, history, modelChoice, userLang, customRole, useSearchGrounding } = req.body || {};
  if (typeof message !== "string" || !message.trim() || message.length > 4000) {
    res.status(400).json({ error: "A message of up to 4000 characters is required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "GEMINI_API_KEY is not configured." });
    return;
  }

  const language = userLang === "pt" || userLang === "en" ? userLang : "es";
  const safeHistory: ChatMessage[] = Array.isArray(history)
    ? history.slice(-8).filter(
        (item): item is ChatMessage =>
          !!item &&
          typeof item === "object" &&
          (item as ChatMessage).role !== undefined &&
          ((item as ChatMessage).role === "user" || (item as ChatMessage).role === "model") &&
          typeof (item as ChatMessage).text === "string"
      )
    : [];
  const contents = [
    ...safeHistory.map(({ role, text }) => ({ role, parts: [{ text }] })),
    { role: "user" as const, parts: [{ text: message.trim() }] },
  ];
  const preferredModel = modelChoice === "gemini-3.8-flash"
    ? "gemini-3.8-flash"
    : "gemini-3.1-flash-lite";
  const models = [preferredModel, preferredModel === "gemini-3.1-flash-lite" ? "gemini-3.8-flash" : "gemini-3.1-flash-lite"];
  const enableSearch = Boolean(useSearchGrounding);

  try {
    const ai = new GoogleGenAI({ apiKey });
    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemInstruction(
              language,
              typeof customRole === "string" ? customRole.slice(0, 200) : undefined
            ),
            temperature: 0.5,
            ...(enableSearch ? { tools: [{ googleSearch: {} }] } : {}),
          },
        });
        if (response.text) {
          const searchSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.flatMap((chunk) => chunk.web?.uri
              ? [{ title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri }]
              : [])
            .slice(0, 4);
          res.status(200).json({ reply: response.text, modelUsed: model, searchSources });
          return;
        }
      } catch (error) {
        console.warn(`Gemini model ${model} failed:`, error);
      }
    }

    res.status(502).json({ error: "Gemini did not return a response. Please try again." });
  } catch (error) {
    console.error("Gemini chat request failed:", error);
    res.status(502).json({ error: "The chat service is temporarily unavailable." });
  }
}
