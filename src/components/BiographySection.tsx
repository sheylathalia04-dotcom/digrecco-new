import React from "react";
import { Compass, Sparkles, Award, Music2, ExternalLink } from "lucide-react";
import { BIOGRAPHY_MILESTONES, DI_GRECCO_INFO } from "../data/diGreccoData";

interface BiographySectionProps {
  lang: "pt" | "es" | "en";
}

export const BiographySection: React.FC<BiographySectionProps> = ({ lang }) => {
  const t = {
    pt: {
      badge: "HISTÓRIA REAL & TRAJETÓRIA",
      title: "Da Arquitetura ao Centro do Pop",
      subtitle:
        "Conheça a história verídica das irmãs Camilla e Giovanna Di Grecco: como o olhar estético de arquitetas e a paixão por coreografias e música pop deram origem a um dos projetos artísticos mais vibrantes do país.",
      card1Title: "A Visão Arquitetônica",
      card1Desc:
        "Ambas formadas em Arquitetura e Urbanismo, Camilla e Giovanna desenham cada detalhe de palco, jogo de luzes e simetria com o rigor conceitual de um projeto estrutural de vanguarda.",
      card2Title: "Coreografia Pop & Presença Cênica",
      card2Desc:
        "Treinamento coreográfico intenso, sincronismo corporal de alto nível e presença de palco magnética trazem para os shows da Di Grecco uma energia contagiante que eletriza o público e as debutantes.",
      milestonesTitle: "Marcos Históricos da Di Grecco",
      watchOnYoutube: "Assistir Clipes no YouTube Oficial",
    },
    es: {
      badge: "HISTORIA REAL & TRAYECTORIA",
      title: "De la Arquitectura al Centro del Pop",
      subtitle:
        "Conoce la historia verídica de las hermanas Camilla y Giovanna Di Grecco: cómo la visión de arquitectas y la pasión por las coreografías pop forjaron un show moderno e inolvidable.",
      card1Title: "Visión Arquitectónica",
      card1Desc:
        "Graduadas en Arquitectura y Urbanismo, conciben la escenografía, los juegos de luces y la simetría de sus shows con el rigor estético de una obra monumental.",
      card2Title: "Coreografía Pop & Presencia Escénica",
      card2Desc:
        "Entrenamiento coreográfico riguroso, sincronismo corporal de primer nivel y una presencia escénica magnética que transforma cada evento en una celebración pop vibrante.",
      milestonesTitle: "Hitos en la Carrera de Di Grecco",
      watchOnYoutube: "Ver Videos en YouTube Oficial",
    },
    en: {
      badge: "GENUINE BIOGRAPHY & ARTISTIC JOURNEY",
      title: "From Architecture to Pop Stardom",
      subtitle:
        "Discover the real story of sisters Camilla and Giovanna Di Grecco: how architectural design and passion for upbeat choreography created one of Brazil's most thrilling pop duos.",
      card1Title: "Architectural Vision",
      card1Desc:
        "Both holding architecture and urbanism degrees, Camilla and Giovanna engineer stage lighting, geometry, and visuals like a living architectural masterpiece.",
      card2Title: "Pop Choreography & Stage Sync",
      card2Desc:
        "Intense dance training, synchronized pop routines, and charismatic live presence that electrify the audience and make every debutante feel like a true pop star.",
      milestonesTitle: "Di Grecco Career Milestones",
      watchOnYoutube: "Watch Music Videos on YouTube",
    },
  }[lang];

  return (
    <section id="biografia" className="py-24 relative overflow-hidden bg-[#08080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2 Core Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Architecture */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-pink-500/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/20">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              {t.card1Title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t.card1Desc}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-pink-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Direção Criativa, Palco & Luz Autoral</span>
            </div>
          </div>

          {/* Card 2: Ballet */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              {t.card2Title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t.card2Desc}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-purple-400 font-semibold">
              <Music2 className="w-4 h-4" />
              <span>Performance 100% Coreografada</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-5xl mx-auto">
          <h3 className="font-display font-bold text-2xl text-white text-center mb-10">
            {t.milestonesTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {BIOGRAPHY_MILESTONES.map((item, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-pink-500/40 hover:border-pink-500 transition-colors space-y-2"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#08080e]" />
                <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
                  {item.year}
                </span>
                <h4 className="font-display font-bold text-white text-lg">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* YouTube link */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 text-center sm:text-left">
              Confira os videoclipes cinematográficos de "Checkmate" e "Veneno" no canal oficial.
            </p>
            <a
              href={DI_GRECCO_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
            >
              <span>{t.watchOnYoutube}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
