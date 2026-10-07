import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  PhoneOff,
  Radio,
  Volume2,
  Sparkles,
  X,
  AlertCircle,
  HelpCircle,
  Phone,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { ARTIST_WHATSAPP_PHONE } from "./DebutanteSection";

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "pt" | "es" | "en";
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Audio references
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isMutedRef = useRef<boolean>(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Multilingual labels
  const t = {
    pt: {
      title: "Voz ao Vivo com Di Grecco",
      badge: "GEMINI 3.8 LIVE API • TEMPO REAL",
      subtitle:
        "Fale naturalmente pelo microfone e converse em tempo real com a inteligência oficial de Camilla e Giovanna Di Grecco.",
      statusListening: "Ouvindo você... Fale agora!",
      statusSpeaking: "Di Grecco respondendo...",
      statusConnecting: "Conectando ao Gemini 3.8 Live API...",
      statusIdle: "Pronto para iniciar a chamada de voz",
      btnStart: "Iniciar Chamada de Voz",
      btnEnd: "Encerrar Chamada",
      btnExit: "Cancelar e Sair",
      btnBack: "Voltar para o site",
      mistakeNotice: "Abriu por engano? Pode fechar a qualquer momento.",
      muteMic: "Silenciar Microfone",
      unmuteMic: "Ativar Microfone",
      quickTopicsTitle: "Sugestões de perguntas para fazer por voz:",
      topics: [
        "Qual é o repertório para festa de 15 anos?",
        "Como funciona a dança com a debutante?",
        "Como contratar pelo WhatsApp oficial?",
        "Me fale sobre a música Checkmate!",
      ],
      whatsappNotice: "Para reservas diretas, você também pode falar no WhatsApp:",
    },
    es: {
      title: "Voz en Vivo con Di Grecco",
      badge: "GEMINI 3.8 LIVE API • TIEMPO REAL",
      subtitle:
        "Habla libremente por el micrófono y conversa en tiempo real con la voz oficial de Camilla y Giovanna Di Grecco.",
      statusListening: "Escuchándote... ¡Habla ahora!",
      statusSpeaking: "Di Grecco respondiendo...",
      statusConnecting: "Conectando con Gemini 3.8 Live API...",
      statusIdle: "Listo para iniciar la llamada de voz",
      btnStart: "Iniciar Llamada de Voz",
      btnEnd: "Finalizar Llamada",
      btnExit: "Cancelar y Salir",
      btnBack: "Volver a la página",
      mistakeNotice: "¿Abriste por error? Puedes salir en cualquier momento sin iniciar.",
      muteMic: "Silenciar Micrófono",
      unmuteMic: "Activar Micrófono",
      quickTopicsTitle: "Sugerencias de preguntas para hacer por voz:",
      topics: [
        "¿Cuál es el repertorio para fiesta de 15 años?",
        "¿Cómo se ensaya la coreografía con la quinceañera?",
        "¿Cómo contratar por WhatsApp oficial?",
        "¡Háblame de su canción Checkmate!",
      ],
      whatsappNotice: "Para reservas directas, también puedes escribir por WhatsApp:",
    },
    en: {
      title: "Live Voice with Di Grecco",
      badge: "GEMINI 3.8 LIVE API • REAL-TIME",
      subtitle:
        "Speak naturally through your microphone and chat in real-time with the official AI voice of Camilla and Giovanna Di Grecco.",
      statusListening: "Listening to you... Speak now!",
      statusSpeaking: "Di Grecco is speaking...",
      statusConnecting: "Connecting to Gemini 3.8 Live API...",
      statusIdle: "Ready to start live voice call",
      btnStart: "Start Voice Call",
      btnEnd: "End Call",
      btnExit: "Cancel & Exit",
      btnBack: "Go back to website",
      mistakeNotice: "Opened by mistake? You can exit anytime without starting.",
      muteMic: "Mute Microphone",
      unmuteMic: "Unmute Microphone",
      quickTopicsTitle: "Suggested topics to ask via voice:",
      topics: [
        "What is the playlist for 15th birthday parties?",
        "How do you rehearse dance with the debutante?",
        "How do I book via official WhatsApp?",
        "Tell me about the hit song Checkmate!",
      ],
      whatsappNotice: "For direct bookings, you can also reach us on WhatsApp:",
    },
  }[lang];

  // Helper to convert Float32 array to 16-bit PCM little-endian Base64
  const float32ToPcm16Base64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Helper to play 24kHz PCM from model
  const playChunk = (base64Data: string) => {
    if (!outputAudioCtxRef.current) {
      outputAudioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
    }

    const ctx = outputAudioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }

    const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);

    // Schedule gapless playback
    const currentTime = ctx.currentTime;
    if (nextStartTimeRef.current < currentTime) {
      nextStartTimeRef.current = currentTime;
    }
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
  };

  // Start Voice Session
  const handleStartCall = async () => {
    setErrorMsg(null);
    setIsConnecting(true);

    try {
      // 1. Request Microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
        },
      });
      streamRef.current = stream;

      // 2. Set up Input Audio Context (16kHz for Gemini Live API)
      inputAudioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      const inputCtx = inputAudioCtxRef.current;

      // 3. Connect WebSocket to backend Live route
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live-voice`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected to /api/live-voice");
        setIsConnected(true);
        setIsConnecting(false);

        // Set up audio processing node
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        const analyser = inputCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;

        source.connect(analyser);
        analyser.connect(processor);
        processor.connect(inputCtx.destination);

        // Visualizer loop
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            setAudioLevel(Math.min(100, Math.round((sum / dataArray.length) * 1.5)));
          }
          animFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current) return;
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBase64 = float32ToPcm16Base64(inputData);
            ws.send(JSON.stringify({ audio: pcmBase64 }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playChunk(data.audio);
          }
          if (data.interrupted) {
            if (outputAudioCtxRef.current) {
              nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
            }
          }
          if (data.error) {
            setErrorMsg(data.error);
          }
        } catch (e) {
          console.error("Error handling incoming live WS message:", e);
        }
      };

      ws.onerror = (e) => {
        console.error("Live WebSocket error:", e);
        setErrorMsg("Erro na conexão com o servidor Live API.");
        handleEndCall();
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
      };
    } catch (err: any) {
      console.error("Microphone or Live API error:", err);
      setIsConnecting(false);
      setIsConnected(false);
      setErrorMsg(
        err.message?.includes("Permission") || err.name === "NotAllowedError"
          ? "Permissão de microfone negada. Por favor, permita o acesso ao microfone no navegador."
          : `Erro ao iniciar microfone: ${err.message || "Tente novamente"}`
      );
    }
  };

  // End Voice Session
  const handleEndCall = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setAudioLevel(0);
  };

  // Safe exit if user clicked by mistake or wants to leave
  const handleExit = () => {
    handleEndCall();
    onClose();
  };

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      handleEndCall();
    }
    return () => {
      handleEndCall();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        // If clicked on backdrop outside modal dialog, exit cleanly
        if (e.target === e.currentTarget) {
          handleExit();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel-glow w-full max-w-lg rounded-3xl border border-pink-500/40 bg-[#0d0d1a]/95 p-6 sm:p-8 shadow-2xl relative flex flex-col items-center text-center cursor-default"
      >
        {/* Prominent Exit button in top right with label */}
        <button
          onClick={handleExit}
          className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-zinc-300 hover:text-white border border-white/10 hover:border-rose-500/40 transition-all text-xs font-semibold group shadow-sm"
          title={t.btnExit}
        >
          <X className="w-4 h-4 text-zinc-400 group-hover:text-rose-400 transition-colors" />
          <span>{t.btnExit}</span>
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[11px] font-bold text-pink-400 uppercase tracking-widest mb-4">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>{t.badge}</span>
        </div>

        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          {t.title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mt-2 mb-6">
          {t.subtitle}
        </p>

        {/* Central Audio Visualizer Circle */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Animated pulsing glow wave rings */}
          {isConnected && (
            <>
              <div
                className="absolute rounded-full border border-pink-500/40 animate-ping pointer-events-none"
                style={{
                  width: `${140 + audioLevel * 1.2}px`,
                  height: `${140 + audioLevel * 1.2}px`,
                  animationDuration: "2s",
                }}
              />
              <div
                className="absolute rounded-full bg-pink-500/20 blur-xl pointer-events-none transition-all duration-75"
                style={{
                  width: `${130 + audioLevel * 1.5}px`,
                  height: `${130 + audioLevel * 1.5}px`,
                }}
              />
            </>
          )}

          {/* Core Visualizer Orb */}
          <div
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-2 shadow-2xl relative ${
              isConnected
                ? "bg-gradient-to-tr from-pink-600 to-purple-600 border-pink-300 shadow-pink-500/50 scale-105"
                : isConnecting
                ? "bg-purple-900/60 border-purple-400/50 animate-pulse shadow-purple-500/30"
                : "bg-white/5 border-white/10 hover:border-pink-500/40"
            }`}
          >
            {isConnected ? (
              <div className="flex flex-col items-center">
                <Volume2 className="w-9 h-9 text-white animate-bounce" />
                <span className="text-[10px] font-extrabold text-white uppercase tracking-wider mt-1">
                  Ao Vivo
                </span>
              </div>
            ) : isConnecting ? (
              <Radio className="w-8 h-8 text-purple-300 animate-spin" />
            ) : (
              <Mic className="w-9 h-9 text-pink-400" />
            )}
          </div>
        </div>

        {/* Status Text */}
        <div className="my-3 min-h-[28px] flex items-center justify-center">
          <p
            className={`text-xs font-semibold ${
              isConnected
                ? "text-emerald-400"
                : isConnecting
                ? "text-purple-300"
                : "text-zinc-400"
            }`}
          >
            {isConnected
              ? isMuted
                ? "Microfone silenciado"
                : t.statusListening
              : isConnecting
              ? t.statusConnecting
              : t.statusIdle}
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left max-w-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Primary Call Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-3">
          {!isConnected ? (
            <>
              <button
                onClick={handleStartCall}
                disabled={isConnecting}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-pink-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Mic className="w-4 h-4" />
                <span>{isConnecting ? "Conectando..." : t.btnStart}</span>
              </button>

              <button
                type="button"
                onClick={handleExit}
                className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
                title={t.btnExit}
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400" />
                <span>{t.btnExit}</span>
              </button>
            </>
          ) : (
            <>
              {/* Mute/Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isMuted
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
                title={isMuted ? t.unmuteMic : t.muteMic}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* End Call & Exit */}
              <button
                onClick={handleExit}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{t.btnEnd}</span>
              </button>
            </>
          )}
        </div>

        {/* Accidental click helper text */}
        {!isConnected && (
          <button
            type="button"
            onClick={handleExit}
            className="text-[11px] text-zinc-400 hover:text-pink-300 inline-flex items-center gap-1.5 transition-colors underline underline-offset-4 mt-1 mb-2"
          >
            <LogOut className="w-3 h-3 text-zinc-500" />
            <span>{t.mistakeNotice}</span>
          </button>
        )}

        {/* Suggested Voice Prompts */}
        <div className="w-full mt-4 pt-4 border-t border-white/10 text-left">
          <p className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5 mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.quickTopicsTitle}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {t.topics.map((topic, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-300 hover:border-pink-500/30 transition-colors"
              >
                "{topic}"
              </div>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp Notice */}
        <div className="mt-4 pt-3 flex items-center justify-between w-full text-[11px] text-zinc-400 border-t border-white/5">
          <span>{t.whatsappNotice}</span>
          <a
            href={`https://wa.me/${ARTIST_WHATSAPP_PHONE}?text=${encodeURIComponent(
              "Olá Di Grecco! Gostaria de falar sobre contratação de show."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>+{ARTIST_WHATSAPP_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
