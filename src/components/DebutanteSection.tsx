import React from "react";
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  Phone,
} from "lucide-react";

// ============================================================================
// 📱 NÚMERO DE WHATSAPP OFICIAL PARA CONTRATACIONES
// ============================================================================
export const ARTIST_WHATSAPP_PHONE = "5511973087302";

// ============================================================================
// 🎬 LOS 3 VÍDEOS REALES DE SHOWS DE 15 AÑOS
// ============================================================================
export const REAL_SHOW_VIDEOS = [
  {
    id: "reel-1",
    src: "/videos/reel1.mp4",
    poster: "/videos/poster1.jpg",
  },
  {
    id: "reel-2",
    src: "/videos/reel2.mp4",
    poster: "/videos/poster2.jpg",
  },
  {
    id: "reel-3",
    src: "/videos/reel3.mp4",
    poster: "/videos/poster3.jpg",
  },
];

interface DebutanteSectionProps {
  lang: "pt" | "es" | "en";
  onOpenChat: () => void;
}

export const DebutanteSection: React.FC<DebutanteSectionProps> = ({
  lang,
  onOpenChat,
}) => {
  // Textos adaptados
  const t = {
    pt: {
      badge: "ESPECIALISTAS EM DEBUTANTES",
      title: "Shows Eletrizantes para Festas de 15 Anos",
      subtitle:
        "O momento mais mágico da sua vida merece o show pop mais enérgico do Brasil. Camilla e Giovanna Di Grecco criam uma experiência inesquecível no palco, com dança sincronizada, vocais ao vivo e coreografia personalizada para a debutante.",
      videosHeading: "Vídeos Reais dos Shows de 15 Anos",
      videosSubheading: "Assista às apresentações reais gravadas diretamente nos eventos ao vivo",
      watchOnInstagram: "Ver no Instagram",
      whyUsTitle: "Por que o Show da Di Grecco é Incomparável?",
      reason1Title: "Visão Arquitetônica de Palco",
      reason1Desc:
        "Formadas em arquitetura, as irmãs planejam a iluminação, cenografia e passarela para valorizar cada foto e vídeo da debutante.",
      reason2Title: "Coreografias Pop & Sincronismo",
      reason2Desc:
        "Corpo coreográfico de ponta e passos sincronizados milimetricamente que transformam a pista em um verdadeiro espetáculo pop.",
      reason3Title: "A Debutante Brilha no Palco",
      reason3Desc:
        "Ensaio e momento especial para a aniversariante dançar junto com a Di Grecco e seus bailarinos no momento clímax.",
      bookingBadge: "CONTRATAÇÕES OFICIAIS & SHOWS",
      bookingTitle: "Contratações Diretas para Festas de 15 Anos",
      bookingDesc:
        "Para contratações, disponibilidade de datas e orçamentos oficiais da Di Grecco, fale diretamente com a produção executiva pelo WhatsApp. Sem intermediários, converse ao vivo com nossa equipe e alinhe todos os detalhes do seu evento!",
      directPhoneNotice: "Canal Oficial de Atendimento no WhatsApp:",
      btnSendWhatsApp: "Enviar Solicitação para o WhatsApp Oficial",
      whatsappNotice: "Atendimento direto com a produção executiva da Di Grecco",
      askBot: "Consultar no Chatbot IA",
    },
    es: {
      badge: "ESPECIALISTAS EN DEBUTANTES & 15 AÑOS",
      title: "Shows Electrizantes para Fiestas de 15 Años",
      subtitle:
        "El momento cumbre de tus 15 años merece el show pop más memorable. Camilla y Giovanna Di Grecco ofrecen un espectáculo de primer nivel con bailarines, vocales en vivo y coreografía exclusiva junto a la quinceañera.",
      videosHeading: "Vídeos Reales de los Shows de 15 Años",
      videosSubheading: "Mira las presentaciones reales de Di Grecco grabadas en directo en fiestas de 15 años",
      watchOnInstagram: "Ver en Instagram",
      whyUsTitle: "¿Por qué el Show de Di Grecco es Incomparable?",
      reason1Title: "Visión Arquitectónica de Escenario",
      reason1Desc:
        "Graduadas en arquitectura, planifican la iluminación, escenografía y visuales para fotos y videos de ensueño.",
      reason2Title: "Coreografías Pop & Sincronismo",
      reason2Desc:
        "Bailarines de primer nivel y movimientos pop sincronizados que encienden la pista y crean un show deslumbrante.",
      reason3Title: "La Quinceañera en el Escenario",
      reason3Desc:
        "Ensayo previo para que la cumpleañera protagonice una coreografía inolvidable con Di Grecco.",
      bookingBadge: "CONTRATACIONES & SHOWS",
      bookingTitle: "Contrataciones Directas para Fiestas de 15 Años",
      bookingDesc:
        "Para contrataciones, disponibilidad de fechas y presupuestos oficiales de la gira de Di Grecco, escribe directamente a la producción por WhatsApp. ¡Conversa en vivo con el equipo y coordina todos los detalles de tu fiesta sin intermediarios!",
      directPhoneNotice: "WhatsApp Oficial de Producción:",
      btnSendWhatsApp: "Enviar Consulta Directa a WhatsApp",
      whatsappNotice: "Contacto directo con la producción oficial de Di Grecco",
      askBot: "Consultar en el Chatbot IA",
    },
    en: {
      badge: "15TH BIRTHDAY & SWEET 16 SPECIALISTS",
      title: "High-Energy Pop Shows for 15th Birthday Parties",
      subtitle:
        "The milestone celebration deserves Brazil's most dazzling pop duo. Camilla and Giovanna Di Grecco bring concert-level choreography, live vocals, and custom dance routines rehearsed with the debutante.",
      videosHeading: "Real 15th Birthday Party Show Videos",
      videosSubheading: "Watch real performances filmed live at actual 15th birthday celebrations",
      watchOnInstagram: "Watch on Instagram",
      whyUsTitle: "Why Di Grecco Makes the Difference",
      reason1Title: "Architectural Stage Vision",
      reason1Desc:
        "Trained architects designing bespoke lighting and stage geometry that make every photo and video look like a stadium concert.",
      reason2Title: "Pop Choreography & Synchronization",
      reason2Desc:
        "Synchronized professional choreography and vibrant dancers that transform the stage into a cinematic pop celebration.",
      reason3Title: "The Birthday Girl as the Star",
      reason3Desc:
        "Exclusive rehearsal so the debutante can perform a choreographed break center stage with Di Grecco and dancers.",
      bookingBadge: "OFFICIAL BOOKINGS & SHOWS",
      bookingTitle: "Direct Bookings for 15th Birthday Parties",
      bookingDesc:
        "For tour dates, calendar availability, and official quotes for Di Grecco 15th birthday party shows, contact official production directly on WhatsApp. Direct and personalized booking!",
      directPhoneNotice: "Official WhatsApp Production Line:",
      btnSendWhatsApp: "Send Inquiry Directly to WhatsApp",
      whatsappNotice: "Direct communication with Di Grecco executive production",
      askBot: "Consult AI Chatbot",
    },
  }[lang];

  const handleOpenWhatsApp = () => {
    const text =
      lang === "es"
        ? "¡Hola equipo Di Grecco! Quisiera información sobre contrataciones y disponibilidad de fechas para Show de 15 Años."
        : lang === "en"
        ? "Hello Di Grecco team! I would like to inquire about booking availability and dates for the 15th Birthday Show."
        : "Olá equipe Di Grecco! Gostaria de informações sobre contratações e disponibilidade de datas para Show de 15 Anos.";
    const url = `https://wa.me/${ARTIST_WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="debutantes" className="py-24 relative overflow-hidden bg-[#0a0a10]">
      {/* Background radial spotlights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 🎬 3 VÍDEOS REALES DE INSTAGRAM (SIN TÍTULOS - REPRODUCCIÓN DIRECTA)      */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {t.videosHeading}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              {t.videosSubheading}
            </p>
          </div>

          {/* Cuadrícula limpia con los 3 vídeos reales verticales sin títulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {REAL_SHOW_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="glass-panel rounded-3xl border border-white/10 hover:border-pink-500/50 overflow-hidden transition-all bg-black shadow-2xl flex flex-col group"
              >
                {/* Reproductor de vídeo nativo vertical 9:16 */}
                <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                    className="w-full h-full object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mb-20">
          <h3 className="font-display font-bold text-2xl text-white text-center mb-10">
            {t.whyUsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-pink-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
                01
              </div>
              <h4 className="font-display font-bold text-white text-lg">{t.reason1Title}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{t.reason1Desc}</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                02
              </div>
              <h4 className="font-display font-bold text-white text-lg">{t.reason2Title}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{t.reason2Desc}</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                03
              </div>
              <h4 className="font-display font-bold text-white text-lg">{t.reason3Title}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{t.reason3Desc}</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CONTRATACIONES DIRECTAS POR WHATSAPP (SIN FORMULARIO DE CAMPOS)         */}
        {/* ========================================================================= */}
        <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-pink-500/30 max-w-3xl mx-auto shadow-2xl bg-[#0f0f1c]/95 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-extrabold px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-5">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.bookingBadge}</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
            {t.bookingTitle}
          </h3>

          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed mb-6">
            {t.bookingDesc}
          </p>

          {/* WhatsApp Direct Phone Box */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-black/50 border border-white/10 mb-8">
            <span className="text-xs text-zinc-400">{t.directPhoneNotice}</span>
            <a
              href={`https://wa.me/${ARTIST_WHATSAPP_PHONE}?text=${encodeURIComponent(
                lang === "es"
                  ? "¡Hola equipo Di Grecco! Quisiera información sobre contrataciones y disponibilidad para Show de 15 Años."
                  : lang === "en"
                  ? "Hello Di Grecco team! I would like to inquire about booking availability for the 15th Birthday Show."
                  : "Olá equipe Di Grecco! Gostaria de informações sobre contratação para Show de 15 Anos."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              +55 11 97308-7302
            </a>
          </div>

          {/* BOTONES DE ACCIÓN: Envío Directo a WhatsApp y Chatbot IA (Centrados y Alineados) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10 w-full">
            <button
              onClick={onOpenChat}
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>{t.askBot}</span>
            </button>

            {/* BOTÓN PRINCIPAL DESTACADO EN VERDE: Abre directamente WhatsApp */}
            <button
              onClick={handleOpenWhatsApp}
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:scale-102 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>{t.btnSendWhatsApp}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 text-center mt-6">
            🔒 {t.whatsappNotice} • Atendimento em todo o território nacional e internacional.
          </p>
        </div>
      </div>
    </section>
  );
};
