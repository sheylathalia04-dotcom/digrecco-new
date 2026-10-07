import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Sparkles,
  MessageCircle,
  ExternalLink,
  RotateCcw,
  Globe,
  Radio,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { DI_GRECCO_INFO } from "../data/diGreccoData";
import { ChatMessage } from "../types";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "pt" | "es" | "en";
  onOpenLiveVoice?: () => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenLiveVoice,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Gemini model selection
  const [modelChoice, setModelChoice] = useState<"gemini-3.1-flash-lite" | "gemini-3.5-flash" | "gemini-3.1-pro-preview">("gemini-3.5-flash");
  // Search grounding toggle
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(false);
  // System role selection
  const [customRole, setCustomRole] = useState<string>("VIP Concierge & Shows");

  const ROLES = [
    { id: "VIP Concierge & Shows", label: "VIP Concierge", desc: "Contratações e orçamentos de shows" },
    { id: "Assessora Debutante 15 Anos", label: "Assessora 15 Anos", desc: "Coreografia e protocolo de debutantes" },
    { id: "Produtor Musical", label: "Produtor Musical", desc: "Arranjos e repertório pop" },
    { id: "Camilla & Giovanna Oficial", label: "Di Grecco (Irmãs)", desc: "Conversa direta das artistas" },
  ];

  // Audio recording / transcription state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting = {
    pt: "Oi! Eu sou o DiGrecco Bot, o assistente virtual VIP da dupla Di Grecco! 💖 Como posso te ajudar hoje? Posso falar sobre a história de Camilla e Giovanna, detalhes dos shows eletrizantes para Festas de 15 Anos, músicas no Spotify com áudio real ou te conectar diretamente ao WhatsApp de contratações (+55 11 97308-7302)!",
    es: "¡Hola! Soy DiGrecco Bot, el asistente VIP oficial de la dupla pop brasileña Di Grecco 💖 ¿En qué puedo ayudarte? Puedo contarte la historia real de Camilla y Giovanna, detalles de los shows para Fiestas de 15 Años, canciones en Spotify o conectarte directamente con su WhatsApp de contrataciones (+55 11 97308-7302).",
    en: "Hi! I am DiGrecco Bot, the official VIP AI assistant for Brazilian pop duo Di Grecco 💖 How can I help you today? Ask me about Camilla & Giovanna's story, 15th birthday debutante shows, music on Spotify, or book directly via WhatsApp (+55 11 97308-7302)!",
  }[lang];

  const suggestedQuestions = {
    pt: [
      "Como funciona o show para festa de 15 anos?",
      "Qual é a formação e história das irmãs?",
      "Pesquisar últimas novidades e agenda com Google Search",
      "Quero falar agora no WhatsApp (+55 11 97308-7302)",
    ],
    es: [
      "¿Cómo funciona el show para fiesta de 15 años?",
      "¿Cuál es la formación e historia de las hermanas?",
      "Buscar últimas novedades con Google Search",
      "Quiero hablar por WhatsApp (+55 11 97308-7302)",
    ],
    en: [
      "How does the 15th birthday debutante show work?",
      "What is Camilla & Giovanna's background?",
      "Search recent news with Google Search Grounding",
      "I want to book on WhatsApp (+55 11 97308-7302)",
    ],
  }[lang];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isTranscribing]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          modelChoice,
          useSearchGrounding,
          customRole,
          history: messages.slice(-8).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      let botReply =
        data.reply ||
        data.fallback ||
        "Adoramos sua mensagem! Para orçamentos rápidos e datas para festas de 15 anos, fale com a produção no WhatsApp (+55 11 97308-7302).";

      if (data.searchSources && data.searchSources.length > 0) {
        botReply += "\n\n🌐 **Fontes do Google Search Grounding:**\n" +
          data.searchSources.map((s: any) => `• [${s.title}](${s.uri})`).join("\n");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          role: "model",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          role: "model",
          text: "A equipe Di Grecco está à sua disposição! Para contratações de shows de 15 anos e eventos, entre em contato direto pelo WhatsApp: +55 11 97308-7302.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio transcription using gemini-3.5-transcribe
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Permissão de microfone negada ou indisponível.");
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const transcribeAudioBlob = async (blob: Blob) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audioBase64: base64,
            mimeType: "audio/webm",
          }),
        });
        const data = await res.json();
        if (data.transcript) {
          setInputValue((prev) => (prev ? `${prev} ${data.transcript}` : data.transcript));
        }
        setIsTranscribing(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Transcription error:", err);
      setIsTranscribing(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-2xl h-[680px] max-h-[92vh] rounded-3xl glass-panel-glow border border-pink-500/40 flex flex-col overflow-hidden shadow-2xl bg-[#0e0e1a] text-white">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#09090e] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-sm sm:text-base">
                  GreccoBot Multi-Turn
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">
                  {modelChoice}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Histórico contínuo • Atendimento VIP Di Grecco
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLiveVoice && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLiveVoice();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-[#1DB954] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-pink-500/20 transition-all hover:scale-102"
                title="Voz ao Vivo com gemini-3.8-live"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Voz ao Vivo</span>
              </button>
            )}

            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Reiniciar Conversa"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Configuration Bar: Model, Role & Search Grounding */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex flex-col gap-2 text-xs">
          {/* Row 1: Model Choice & Google Search Grounding */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-3 h-3 text-purple-400" />
                <span>Modelo:</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setModelChoice("gemini-3.1-flash-lite");
                  if (useSearchGrounding) setUseSearchGrounding(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  modelChoice === "gemini-3.1-flash-lite"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Para tarefas rápidas e respostas ágeis"
              >
                3.1-Flash-Lite (Rápido)
              </button>
              <button
                type="button"
                onClick={() => setModelChoice("gemini-3.5-flash")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  modelChoice === "gemini-3.5-flash"
                    ? "bg-pink-600 text-white shadow-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Para tarefas gerais e compatível com Google Search"
              >
                3.5-Flash (Geral)
              </button>
              <button
                type="button"
                onClick={() => {
                  setModelChoice("gemini-3.1-pro-preview");
                  if (useSearchGrounding) setUseSearchGrounding(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  modelChoice === "gemini-3.1-pro-preview"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Para tarefas particularmente complexas e detalhadas"
              >
                3.1-Pro (Complexo)
              </button>
            </div>

            {/* Search Grounding toggle (Uses gemini-3.5-flash with googleSearch tool) */}
            <button
              type="button"
              onClick={() => {
                const next = !useSearchGrounding;
                setUseSearchGrounding(next);
                if (next) {
                  setModelChoice("gemini-3.5-flash");
                }
              }}
              className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border transition-all ${
                useSearchGrounding
                  ? "bg-[#4285F4]/20 border-[#4285F4] text-[#4285F4] shadow-sm shadow-blue-500/20"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
              }`}
              title="Google Search Grounding (gemini-3.5-flash)"
            >
              <Globe className="w-3 h-3" />
              <span>Google Search Data</span>
              {useSearchGrounding && <CheckCircle2 className="w-2.5 h-2.5 ml-0.5" />}
            </button>
          </div>

          {/* Row 2: Chatbot Specific Role / System Instruction */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-white/5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex-shrink-0">
              Papel:
            </span>
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setCustomRole(r.id)}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  customRole === r.id
                    ? "bg-white/15 text-pink-300 border border-pink-500/40"
                    : "bg-transparent text-zinc-400 hover:text-zinc-200"
                }`}
                title={r.desc}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === "model";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? "bg-white/[0.07] border border-white/10 text-zinc-200"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md shadow-pink-500/20"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      isBot ? "text-zinc-500" : "text-pink-200 text-right"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-zinc-400 text-xs">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1 text-zinc-300">DiGrecco Bot consultando {modelChoice}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Pills */}
        <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <MessageCircle className="w-3 h-3 text-pink-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        {/* Input Bar & Send */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col gap-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta sobre Di Grecco ou shows..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 disabled:opacity-40 text-white font-bold text-sm transition-all flex items-center justify-center shadow-lg shadow-pink-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct WhatsApp Callout Pill inside chat */}
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>Contratação direta para 15 Anos:</span>
            <a
              href={DI_GRECCO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span>WhatsApp: {DI_GRECCO_INFO.whatsappNumber}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
