import express from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

/**
 * Robust Language Detection based primarily on user's actual typed message.
 * Gives precedence to the language used by the user, not just UI preference.
 */
function detectLanguage(text: string, userLangPref?: string): "es" | "pt" | "en" {
  const t = (text || "").toLowerCase().trim();

  // Spanish strong markers
  const esMarkers = [
    /\b(hola|buenas|buenos dias|buenas tardes|buenas noches)\b/,
    /\b(quien|quién|quienes|quiénes|donde|dónde|como|cómo|cuanto|cuánto|cuesta|cuestan|precio|precios|costo|costos)\b/,
    /\b(que|qué|hacen|hace|hacer|tienen|tiene|pueden|puede|quiero|quisiera|saber|decir|decirme)\b/,
    /\b(canta|cantan|cantar|cancion|canción|canciones|baila|bailan|bailar|ensayo|ensayan|ensayos)\b/,
    /\b(fiesta|fiestas|quinceañera|quinceañeras|quince|cumpleaños|debutante|debutantes)\b/,
    /\b(ellas|ellos|usted|ustedes|nosotros|con ellas|de ellas)\b/,
    /\b(redes|sociales|dicen|dicho|comentarios|testimonios|reales|verdad|falso|falsa|informacion|información)\b/,
    /\b(por favor|gracias|muchas gracias|saludos|ayuda|ayúdame|ayudame|presupuesto|cotizacion|cotización)\b/,
    /[¿¡ñáéíóú]/
  ];

  // Portuguese strong markers
  const ptMarkers = [
    /\b(olá|ola|bom dia|boa tarde|boa noite)\b/,
    /\b(quanto|custa|custam|preço|preços|valor|valores|orçamento|orçamentos)\b/,
    /\b(quem|onde|como|fazer|fazem|faz|podem|pode|quero|gostaria|saber|dizer|dizer-me)\b/,
    /\b(canta|cantam|cantar|música|musica|músicas|musicas|canção|canções|dança|dançam|dançar|ensaio|ensaiam)\b/,
    /\b(festa|festas|aniversário|aniversario|debutante|debutantes)\b/,
    /\b(elas|eles|você|voce|vocês|voces|com elas|delas)\b/,
    /\b(redes|sociais|dizem|disseram|depoimentos|reais|verdade|informações|informacoes)\b/,
    /\b(por favor|obrigado|obrigada|muito obrigado|muito obrigada|valeu)\b/,
    /[ãõç]/
  ];

  // English strong markers
  const enMarkers = [
    /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/,
    /\b(how much|price|cost|quote|booking|hire|rates)\b/,
    /\b(who|what|where|how|why|when|can they|do they|can i|would like)\b/,
    /\b(sing|songs|dance|dancing|routine|rehearsal|rehearse)\b/,
    /\b(party|birthday|15th|quinceanera|debutante|sweet 16)\b/,
    /\b(they|them|she|her|with them)\b/,
    /\b(reviews|testimonials|social media|real|instagram|facts)\b/,
    /\b(please|thank you|thanks)\b/
  ];

  let esScore = 0;
  let ptScore = 0;
  let enScore = 0;

  for (const m of esMarkers) {
    if (m.test(t)) esScore += 2;
  }
  for (const m of ptMarkers) {
    if (m.test(t)) ptScore += 2;
  }
  for (const m of enMarkers) {
    if (m.test(t)) enScore += 2;
  }

  // Highly definitive differentiators between ES and PT
  if (/\b(ellas|cantan|quien|quienes|cuanto|cuánto|canciones|cancion|hacen|fiestas|quinceañera|precio|costo|buenas)\b/.test(t) || /[¿¡ñ]/.test(t)) {
    esScore += 5;
  }
  if (/\b(elas|cantam|quem|quanto|músicas|musicas|canções|fazem|festas|você|voce|orçamento|obrigado|obrigada|olá)\b/.test(t) || /[ãõç]/.test(t)) {
    ptScore += 5;
  }

  if (esScore > ptScore && esScore > enScore) return "es";
  if (ptScore > esScore && ptScore > enScore) return "pt";
  if (enScore > esScore && enScore > ptScore) return "en";

  // If score is tied or text has no specific markers, use UI preference
  if (userLangPref === "es") return "es";
  if (userLangPref === "en") return "en";
  if (userLangPref === "pt") return "pt";

  // Default to Spanish if user language is ambiguous
  return "es";
}

/**
 * Builds the exact system instruction tailored to the detected user language.
 */
function buildSystemInstruction(lang: "es" | "pt" | "en", customRole?: string): string {
  const langName = lang === "es" ? "Español (Spanish)" : lang === "en" ? "English" : "Português (Portuguese)";

  return `You are "DiGrecco Bot", the official VIP virtual concierge and assistant for Brazilian pop duo Di Grecco (sisters Camilla Di Grecco and Giovanna Di Grecco).

CRITICAL RULE #1: STRICT LANGUAGE REQUIREMENT (ABSOLUTE TOP PRIORITY):
- The user is asking in: ${langName.toUpperCase()}.
- You MUST respond 100% in ${langName}.
- NEVER respond in Portuguese to a user speaking Spanish or English!
- Speak naturally, warmly, elegantly, and fluently in ${langName}.
- Always introduce yourself as "DiGrecco Bot" if asked for your name.

CRITICAL RULE #2: 100% REAL AND VERIFIED INFORMATION (NO FALSE INFORMATION):
1. WHO ARE DI GRECCO?
   - Camilla Di Grecco and Giovanna Di Grecco are sisters born in Cuiabá (Mato Grosso), based and creating in São Paulo, Brazil.
   - Both are graduated in Architecture and Urbanism (Arquitetura e Urbanismo). Their architectural vision directly influences the visual precision of their shows: stage symmetry, lighting geometry, and cohesive pop aesthetics.
   - They are singers, professional dancers, choreographers, and pop artists.

2. DO THEY SING LIVE AND HOW DO THEIR SHOWS ACTUALLY WORK AT 15TH BIRTHDAY PARTIES (FIESTAS DE 15 AÑOS / DEBUTANTES)?
   [REALITY FROM THE ARTISTS, SOCIAL MEDIA & REAL DEBUTANTES - EXACT TRUTH]:
   - YES, THEY DO SING LIVE! ("¡Ellas sí cantan en vivo!"):
     * In their live shows and 15th birthday parties, Camilla and Giovanna SING LIVE!
     * What they sing live are COVERS of popular hits and songs by other famous artists, adapted and rearranged to their own style, vocal harmonies, and unique sound.
     * What they do NOT normally sing live in 15th birthday parties right now are their own original songs (like Checkmate, Veneno, Mi Amor, etc., which are studio recordings on Spotify/YouTube). In 15th birthday parties, their live vocal performance focuses on crowd-favorite covers adapted to their voice!
   - What the full 15th birthday party show includes:
     * Live singing with covers adapted to their vocal style and energy.
     * High-energy pop dance and choreography show with their team of professional dancers.
     * "Abertura de Pista" (opening the dance floor): Electrifying the party with viral dance hits, pop, funk, and reggaeton that get all guests, teenagers, and families dancing.
     * Star moment of the debutante: Camilla and Giovanna conduct private rehearsals with the quinceañera/debutante beforehand. In the highlight moment of the party, the birthday girl steps center stage to dance an exclusive, synchronized choreography alongside Camilla, Giovanna, and the dancers, experiencing what it feels like to be a real pop star with total confidence.
   - What debutantes and families share on social media (@digrecco):
     * Real debutantes highlight the tremendous affection, patience, and dedication of Camilla and Giovanna during rehearsals, giving them total confidence on stage.
     * Parents and event organizers consistently praise their live performance and vocal talent, how the dance floor remained packed and energized the entire night, as well as their punctuality and professionalism.

3. ORIGINAL SONGS (Checkmate, Veneno, Mi Amor, Na Minha Mão, Lado B, Anjo Querubim):
   - These are their official studio recorded singles, available to listen on Spotify and YouTube (their "Checkmate" music video has over 344k views).
   - If asked if they sing these original songs at 15th birthday parties, clarify with complete transparency: At 15th birthday parties, they normally sing live covers of other artists adapted to their voice rather than their own original singles. Their original songs can be enjoyed in full on Spotify and YouTube.

4. BOOKING, QUOTES & PRODUCTION:
   - Pricing depends on the host city (travel logistics/flights from São Paulo), event date, and staging requirements.
   - For official proposals and calendar availability, contact their executive production directly via WhatsApp: +55 11 97308-7302 (https://wa.me/5511973087302).

Formatting & Tone:
- Enthusiastic, professional, honest, and direct.
- Use neat markdown: bold key concepts, clear bullet points, and WhatsApp links.
${customRole ? `Specific session persona: ${customRole}` : ""}`;
}

/**
 * Intelligent instant fallback for offline / model unavailability scenarios,
 * guaranteed to reply in the detected user language with 100% truthful data.
 */
function getSmartFallback(msg: string, lang: "es" | "pt" | "en"): string {
  const text = msg.toLowerCase();

  if (lang === "es") {
    if (text.includes("canta") || text.includes("cover") || text.includes("cancion propia") || text.includes("canciones propias") || text.includes("voz en vivo") || text.includes("vocal")) {
      return `¡Sí, totalmente! Camilla y Giovanna **sí cantan en vivo** 🎤✨\n\nTe explico con total detalle y transparencia cómo es su presentación musical en las Fiestas de 15 Años:\n\n• **Cantan en vivo covers adaptados a su estilo**: En sus eventos y fiestas de 15 años interpretan en vivo grandes éxitos y covers de otros artistas consagrados, adaptándolos a su propia voz, arreglos pop y armonías vocales.\n• **¿Y sus canciones propias?**: Normalmente en las fiestas de 15 años no cantan sus canciones de autor originales (como *Checkmate*, *Veneno* o *Mi Amor*); esas canciones oficiales están disponibles para escuchar en **Spotify** y **YouTube**.\n• **Show completo de canto, baile y apertura de pista**: Su show combina voces en vivo con un potente espectáculo coreográfico junto a bailarines profesionales y el **ensayo exclusivo con la quinceañera** para que ella suba al escenario a bailar y brillar con ellas.\n\nPara consultar presupuestos y fechas en su agenda oficial, puedes escribir directamente a la producción por WhatsApp: **+55 11 97308-7302**.`;
    }
    if (text.includes("hacen") || text.includes("como es") || text.includes("show") || text.includes("fiesta") || text.includes("15") || text.includes("quinceañera")) {
      return `¡Hola! Con mucho gusto te cuento cómo es el show de **Di Grecco** en Fiestas de 15 Años 🎉\n\n• **Voces en Vivo con Covers**: Camilla y Giovanna cantan en vivo covers de grandes éxitos musicales adaptados a sus voces y estilo pop.\n• **Show Coreográfico de Alto Impacto**: Junto a su cuerpo de bailarines profesionales, realizan una apertura de pista (*Abertura de Pista*) electrizante con los mejores hits virales del pop, funk y reguetón.\n• **Ensayo Previo con la Quinceañera**: Camilla y Giovanna ensayan previamente con la cumpleañera para que ella suba al centro del escenario a bailar una coreografía sincronizada junto a ellas como una verdadera estrella pop.\n• **Lo que dicen las debutantes**: En redes sociales (@digrecco), las quinceañeras y sus madres destacan la paciencia y el cariño en los ensayos, y cómo la pista de baile estuvo encendida toda la noche.\n\n¿Deseas consultar disponibilidad de fechas o contactar a su producción?`;
    }
    if (text.includes("dicen") || text.includes("redes") || text.includes("testimonio") || text.includes("instagram") || text.includes("opinion") || text.includes("comentario")) {
      return `¡En las redes sociales oficiales (@digrecco) los testimonios de las debutantes y sus familias son muy emocionantes! ✨\n\n• **Las Quinceañeras**: Destacan la paciencia, dulzura y dedicación de Camilla y Giovanna en los ensayos privados, quitándoles cualquier nervio y dándoles total seguridad para lucirse en el escenario.\n• **Padres y Organizadores**: Resaltan su puntualidad impecable, el profesionalismo del equipo de bailarines, su gran talento vocal cantando en vivo covers adaptados y que la pista de baile se mantuvo encendida y llena de gente toda la noche.\n\nSu show combina canto en vivo, baile pop sincronizado y una experiencia estelar inolvidable para la debutante.`;
    }
    if (text.includes("precio") || text.includes("cuanto") || text.includes("costo") || text.includes("cotiz") || text.includes("presupuesto") || text.includes("contrat")) {
      return `¡Hola! Con mucho gusto te oriento sobre la contratación de **Di Grecco** 🎉\n\n• El valor del show depende de la **ciudad del evento** (logística de traslados/vuelos desde São Paulo), la fecha y la estructura técnica requerida.\n• El paquete incluye el show con canto en vivo de covers adaptados, cuerpo de bailarines, apertura de pista y los **ensayos privados con la quinceañera** para su coreografía estelar.\n\nPara recibir una propuesta formal y verificar disponibilidad de fechas en la agenda oficial, comunícate directamente por WhatsApp con la producción ejecutiva: **+55 11 97308-7302** (o haz clic en los botones de WhatsApp de la web).`;
    }
    if (text.includes("quien") || text.includes("arquitect") || text.includes("historia") || text.includes("biografia")) {
      return `**Camilla y Giovanna Di Grecco** son hermanas nacidas en Cuiabá (Mato Grosso) y radicadas en São Paulo 💖\n\nAmbas se graduaron en **Arquitectura y Urbanismo**, y esa formación es su gran sello distintivo: trasladan el rigor del diseño espacial a la simetría de sus coreografías, la iluminación escénica y el vestuario.\n\nSon cantantes, bailarinas, coreógrafas y artistas pop que han conquistado a miles de debutantes en todo Brasil con su energía y profesionalismo.`;
    }
    if (text.includes("cancion") || text.includes("musica") || text.includes("checkmate") || text.includes("spotify")) {
      return `¡La discografía oficial de Di Grecco está disponible en Spotify y YouTube! 🎶\n\n• **Checkmate**: Su hit principal (+344 mil reproducciones en YouTube).\n• **Veneno**: Pop urbano con estética moderna.\n• **Mi Amor**: Pop latino con ritmo bailable.\n• **Na Minha Mão**, **Lado B** y **Anjo Querubim**: Sencillos oficiales.\n\n*En Fiestas de 15 Años*: Ellas cantan en vivo covers de otros artistas adaptados a su voz y estilo pop, mientras que sus canciones originales están disponibles en plataformas de streaming como Spotify.`;
    }
    return `¡Hola! Soy **DiGrecco Bot**, asistente oficial de **Di Grecco** (Camilla y Giovanna) 💖\n\nTe puedo informar con total veracidad y honestidad sobre:\n• Cómo es el show en vivo para Fiestas de 15 Años (covers en directo adaptados a su voz + baile con bailarines y ensayo con la debutante).\n• Qué dicen las debutantes reales en redes sociales (@digrecco).\n• Su historia como arquitectas y artistas pop.\n• Contacto directo con su producción oficial por WhatsApp (**+55 11 97308-7302**).\n\n¿Qué te gustaría saber?`;
  }

  if (lang === "en") {
    if (text.includes("sing") || text.includes("cover") || text.includes("own songs") || text.includes("live voice") || text.includes("vocal")) {
      return `Yes, absolutely! Camilla and Giovanna **do sing live** 🎤✨\n\nHere is how their musical performance works at 15th birthday parties:\n\n• **Live Vocals on Adapted Covers**: In their shows and 15th birthday events, they sing live covers of famous hits by other artists, uniquely rearranged and adapted to their own vocal style, harmonies, and pop energy.\n• **Their Original Songs**: At 15th birthday parties, they normally do not perform their own studio singles (like *Checkmate* or *Veneno*), which are official studio releases available on **Spotify** and **YouTube**.\n• **Full Stage Show**: Along with their live vocals, their performance features synchronized pop choreography with professional dancers and **private rehearsals with the debutante** so she shines on stage!\n\nTheir executive production can be contacted directly on WhatsApp at **+55 11 97308-7302**.`;
    }
    if (text.includes("price") || text.includes("cost") || text.includes("book") || text.includes("package") || text.includes("how much") || text.includes("hire")) {
      return `Hello! We'd love to help you bring **Di Grecco** to your 15th birthday or special celebration! 🎉\n\n• **The Show**: An explosive dance performance with professional dancers and viral hits to get the entire party jumping.\n• **The Debutante Star Moment**: Camilla & Giovanna rehearse beforehand with the birthday girl so she performs a showstopping choreographed routine center stage.\n• **Reviews**: Real debutantes on social media (@digrecco) praise their kindness in rehearsals and how the dance floor stayed packed all night.\n\nPricing depends on the city/travel logistics and date. For an exact quote and schedule verification, message executive production on WhatsApp at **+55 11 97308-7302**.`;
    }
    return `Hi! I am **DiGrecco Bot**, official VIP assistant for Brazilian pop duo **Di Grecco** (Camilla & Giovanna) 💖\n\nI can share real facts about their 15th birthday dance shows, rehearsals with the debutante, songs on Spotify, or connect you with executive booking on WhatsApp (**+55 11 97308-7302**). How can I assist you?`;
  }

  // Portuguese
  if (text.includes("canta") || text.includes("cover") || text.includes("músicas próprias") || text.includes("musicas proprias") || text.includes("cantam") || text.includes("ao vivo")) {
    return `Sim, com certeza! A Camilla e a Giovanna **cantam ao vivo sim** 🎤✨\n\nVamos explicar com total clareza como funciona a apresentação delas nos eventos de 15 anos:\n\n• **Cantam ao vivo covers adaptados**: Nos shows e festas de 15 anos, elas cantam ao vivo grandes sucessos e covers de outros artistas consagrados, adaptando cada música ao estilo vocal, arranjos pop e harmonias próprias da dupla!\n• **E as músicas autorais?**: Normalmente nos 15 anos elas não cantam as músicas autorais próprias (como *Checkmate*, *Veneno* ou *Mi Amor*); essas faixas são lançamentos de estúdio que você pode ouvir no **Spotify** e no **YouTube**.\n• **Show Completo**: Além do canto ao vivo com covers contagiantes, a apresentação conta com corpo de balé profissional, abertura eletrizante da pista de dança e o **ensaio exclusivo com a debutante** para ela subir ao palco e brilhar como estrela pop!\n\nQuer consultar a agenda ou falar com a produção no WhatsApp (**+55 11 97308-7302**)?`;
  }
  if (text.includes("preço") || text.includes("quanto") || text.includes("valor") || text.includes("orçamento") || text.includes("contratar")) {
    return `Olá! Os shows da **Di Grecco** para Festas de 15 Anos são uma experiência pop inesquecível! 🎉\n\n• **Como é o show**: Canto ao vivo com covers adaptados à voz da dupla, corpo de balé profissional e abertura de pista com os maiores hits do momento, além do ensaio especial para a debutante dançar no palco.\n• **Orçamento**: Os valores variam conforme a cidade (logística) e data. Fale diretamente com a produção no WhatsApp: **+55 11 97308-7302**!`;
  }
  return `Oi! Sou o **DiGrecco Bot**, assistente oficial da dupla **Di Grecco** (Camilla & Giovanna) 💖\n\nPosso te contar tudo com base nas informações reais das artistas e debutantes:\n• Como funciona o show ao vivo com covers adaptados, dança com bailarinos e ensaio com a debutante.\n• Depoimentos reais de debutantes nas redes sociais (@digrecco).\n• As músicas oficiais no Spotify.\n• Contato direto com a produção executiva no WhatsApp (**+55 11 97308-7302**).\n\nComo posso te ajudar?`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  const server = http.createServer(app);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Multi-Turn Chatbot Endpoint supporting accurate multilingual responses & resilience
  app.post("/api/chat", async (req, res) => {
    const { message, history, modelChoice, useSearchGrounding, customRole, userLang } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mensaje requerido." });
      return;
    }

    // Accurately detect the language of the user's message
    const detectedLang = detectLanguage(message, userLang);

    const ai = getGenAI();
    if (!ai) {
      res.json({
        reply: getSmartFallback(message, detectedLang),
        modelUsed: "knowledge-base",
      });
      return;
    }

    // Assemble multi-turn history
    const chatContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item && item.text && (item.role === "user" || item.role === "model")) {
          chatContents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    chatContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const systemInstruction = buildSystemInstruction(detectedLang, customRole);

    // Prioritize fast and reliable models
    // gemini-3.1-flash-lite is rapid and resilient against 503 spikes; gemini-3.8-flash as secondary
    const candidateModels = [
      modelChoice === "gemini-3.8-flash" ? "gemini-3.8-flash" : "gemini-3.1-flash-lite",
      modelChoice === "gemini-3.8-flash" ? "gemini-3.1-flash-lite" : "gemini-3.8-flash",
    ];

    const enableSearch = Boolean(useSearchGrounding);

    let reply = "";
    let modelUsed = "";
    let searchSources: Array<{ title: string; uri: string }> = [];

    for (const model of candidateModels) {
      try {
        const modelConfig: any = {
          systemInstruction,
          temperature: 0.5,
        };

        if (enableSearch) {
          modelConfig.tools = [{ googleSearch: {} }];
        }

        const response = await ai.models.generateContent({
          model,
          contents: chatContents,
          config: modelConfig,
        });

        if (response && response.text) {
          reply = response.text;
          modelUsed = model;

          const candidates = response.candidates;
          if (candidates && candidates.length > 0) {
            const metadata = candidates[0].groundingMetadata;
            if (metadata && Array.isArray(metadata.groundingChunks)) {
              for (const chunk of metadata.groundingChunks) {
                if (chunk.web?.uri) {
                  searchSources.push({
                    title: chunk.web.title || chunk.web.uri,
                    uri: chunk.web.uri,
                  });
                }
              }
            }
          }
          break; // successfully obtained reply
        }
      } catch (modelErr: any) {
        console.warn(`Model ${model} encounter error:`, modelErr?.status || modelErr?.message || modelErr);
      }
    }

    // If models were unavailable or returned empty, use verified smart fallback
    if (!reply) {
      reply = getSmartFallback(message, detectedLang);
      modelUsed = "verified-knowledge";
    }

    res.json({
      reply,
      modelUsed,
      detectedLang,
      searchGrounded: enableSearch,
      searchSources: searchSources.slice(0, 4),
    });
  });

  // Audio Transcription Endpoint using gemini-3.5-transcribe
  app.post("/api/transcribe", async (req, res) => {
    try {
      const { audioBase64, mimeType } = req.body;

      if (!audioBase64) {
        res.status(400).json({ error: "Áudio em base64 é obrigatório para transcrição." });
        return;
      }

      const ai = getGenAI();
      if (!ai) {
        res.status(503).json({ error: "Gemini API key não configurada no servidor." });
        return;
      }

      const cleanBase64 = audioBase64.replace(/^data:audio\/[^;]+;base64,/, "");

      const audioPart = {
        inlineData: {
          mimeType: mimeType || "audio/webm",
          data: cleanBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            audioPart,
            {
              text: "Transcreva com máxima precisão o conteúdo falado neste áudio. Retorne apenas o texto transcrito, sem introduções ou comentários adicionais.",
            },
          ],
        },
      });

      const transcript = response.text ? response.text.trim() : "";
      res.json({ transcript });
    } catch (err: any) {
      console.error("Erro na transcrição de áudio:", err);
      res.status(500).json({
        error: "Falha ao transcrever o áudio com gemini-3.5-transcribe.",
        details: err.message,
      });
    }
  });

  // Serve static videos and assets with full HTTP Range request support for media streaming
  const publicVideosPath = path.join(process.cwd(), "public", "videos");
  app.use("/videos", express.static(publicVideosPath, {
    acceptRanges: true,
    maxAge: "1d",
  }));

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Di Grecco App server running on port ${PORT}`);
  });
}

startServer();
