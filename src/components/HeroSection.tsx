import React from "react";
import { Sparkles, Play, MessageSquare, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { DI_GRECCO_INFO } from "../data/diGreccoData";

interface HeroSectionProps {
  onExploreMusic: () => void;
  onOpenChat: () => void;
  lang: "pt" | "es" | "en";
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMusic,
  onOpenChat,
  lang,
}) => {
  const content = {
    pt: {
      badge: "DUPLA POP BRASILEIRA • CAMILLA & GIOVANNA",
      titleMain: "A Nova Era do Pop",
      titleAccent: "Brasileiro",
      description:
        "De arquitetas a fenômenos da música pop. Camilla e Giovanna Di Grecco transformam palcos em verdadeiras obras de arte audiovisual com dança sincronizada, vocais ao vivo eletrizantes e projetos exclusivos para festas de 15 anos.",
      listenCta: "Ouvir Prévias das Músicas",
      bookCta: "Contratar Show de 15 Anos",
      chatCta: "Falar com Assistente IA",
      stat1: "+344k Views",
      stat1Label: "No clipe 'Checkmate'",
      stat2: "100% Coreografado",
      stat2Label: "Dança pop & Sincronismo",
      stat3: "Shows 15 Anos",
      stat3Label: "Experiência debutante inesquecível",
      realQuote: "“Unimos a precisão da arquitetura à vibração visceral do pop nacional.”",
    },
    es: {
      badge: "DUPLA POP BRASILEÑA • CAMILLA & GIOVANNA",
      titleMain: "La Nueva Era del Pop",
      titleAccent: "Brasileño",
      description:
        "De arquitectas a referentes del pop brasileño. Camilla y Giovanna Di Grecco combinan coreografías sincronizadas de impacto, vocales en vivo y una puesta en escena inmersiva especializada en fiestas de 15 años.",
      listenCta: "Escuchar Adelantos de Canciones",
      bookCta: "Contratar Show de 15 Años",
      chatCta: "Preguntar al Asistente IA",
      stat1: "+344k Vistas",
      stat1Label: "En videoclip 'Checkmate'",
      stat2: "100% Coreografiado",
      stat2Label: "Danza pop & Sincronismo",
      stat3: "Shows 15 Años",
      stat3Label: "Experiencia debutante soñada",
      realQuote: "“Unimos la precisión de la arquitectura a la vibración visceral del pop.”",
    },
    en: {
      badge: "BRAZILIAN POP DUO • CAMILLA & GIOVANNA",
      titleMain: "The New Era of Brazilian",
      titleAccent: "Pop",
      description:
        "From architects to pop stage sensations. Camilla and Giovanna Di Grecco craft high-energy synchronized pop spectacles, acclaimed hits, and signature 15th birthday (debutante) performances.",
      listenCta: "Listen to Song Snippets",
      bookCta: "Book 15th Birthday Show",
      chatCta: "Chat with AI Assistant",
      stat1: "+344k Views",
      stat1Label: "On 'Checkmate' Music Video",
      stat2: "100% Choreographed",
      stat2Label: "Pop Dance & Stage Sync",
      stat3: "15th Birthday Shows",
      stat3Label: "Signature Debutante Experience",
      realQuote: "“We combine architectural precision with the vibrant electricity of pop.”",
    },
  }[lang];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden">
      {/* 21st.dev Ambient Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              <span className="text-[11px] font-bold tracking-widest text-zinc-300 uppercase">
                {content.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.08]">
              {content.titleMain}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300">
                {content.titleAccent}
              </span>
            </h1>

            {/* Subtitle / Bio summary */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              {content.description}
            </p>

            {/* Quote badge */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border-l-2 border-pink-500 text-xs sm:text-sm text-zinc-400 italic">
              {content.realQuote}
              <span className="block mt-1 font-semibold not-italic text-zinc-300 text-[11px] uppercase tracking-wider">
                — Camilla & Giovanna Di Grecco
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              {/* WhatsApp direct */}
              <a
                href={DI_GRECCO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{content.bookCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Music Snippets */}
              <button
                onClick={onExploreMusic}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 text-pink-400 fill-pink-400" />
                <span>{content.listenCta}</span>
              </button>

              {/* Chatbot shortcut */}
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>{content.chatCta}</span>
              </button>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-3 flex items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Oficial: {DI_GRECCO_INFO.whatsappNumber}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Abertura oficial show Luísa Sonza</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card with 21st.dev aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 blur-xl opacity-75" />

              {/* Main Visual Container */}
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/15 p-2 shadow-2xl">
                <div className="relative h-[430px] rounded-xl overflow-hidden bg-zinc-900 group">
                  <img
                    src={DI_GRECCO_INFO.artistPhotoUrl}
                    alt="Camilla e Giovanna Di Grecco Foto Oficial"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/30 to-transparent" />

                  {/* Floating Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>EM TURNÊ • SHOWS 15 ANOS</span>
                  </div>

                  {/* Floating Spotify preview badge */}
                  <a
                    href={DI_GRECCO_INFO.spotifyArtistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954]/90 hover:bg-[#1DB954] text-black text-xs font-bold transition-all shadow-md"
                  >
                    <span>Spotify Oficial</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>

                  {/* Bottom details inside card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-lg border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-pink-400 font-bold">
                          Camilla & Giovanna
                        </p>
                        <h4 className="font-display font-bold text-white text-base">
                          Di Grecco Live Stage Experience
                        </h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-3 bg-pink-500 rounded-full animate-eq-1" />
                        <span className="w-1 h-5 bg-purple-500 rounded-full animate-eq-2" />
                        <span className="w-1 h-4 bg-cyan-400 rounded-full animate-eq-3" />
                        <span className="w-1 h-6 bg-pink-400 rounded-full animate-eq-4" />
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-300">
                      Cuiabá • São Paulo • Festas de 15 Anos em todo o Brasil
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat badges */}
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <p className="font-display font-bold text-pink-400 text-sm sm:text-base">
                    {content.stat1}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                    {content.stat1Label}
                  </p>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <p className="font-display font-bold text-purple-400 text-sm sm:text-base">
                    {content.stat2}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                    {content.stat2Label}
                  </p>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <p className="font-display font-bold text-cyan-400 text-sm sm:text-base">
                    {content.stat3}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                    {content.stat3Label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
