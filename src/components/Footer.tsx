import React from "react";
import { Music, Instagram, Youtube, Video, Share2, Phone, ExternalLink, Heart, Sparkles } from "lucide-react";
import { DI_GRECCO_INFO, SOCIAL_LINKS } from "../data/diGreccoData";

interface FooterProps {
  lang: "pt" | "es" | "en";
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Music":
        return <Music className="w-5 h-5 text-[#1DB954]" />;
      case "Instagram":
        return <Instagram className="w-5 h-5 text-pink-400" />;
      case "Youtube":
        return <Youtube className="w-5 h-5 text-red-500" />;
      case "Video":
        return <Video className="w-5 h-5 text-cyan-400" />;
      case "Share2":
        return <Share2 className="w-5 h-5 text-blue-400" />;
      default:
        return <ExternalLink className="w-5 h-5 text-zinc-400" />;
    }
  };

  const t = {
    pt: {
      bioTitle: "Di Grecco Oficial",
      bioDesc: "Dupla pop brasileira formada pelas irmãs Camilla Di Grecco e Giovanna Di Grecco. Da arquitetura e dança sincronizada aos maiores palcos e festas de 15 anos do Brasil.",
      linksTitle: "Redes & Plataformas Oficiais",
      contactTitle: "Contratações de Shows & Festas",
      whatsappLabel: "WhatsApp Produção Executiva:",
      coverageLabel: "Shows em todo o Brasil e turnês internacionais.",
      rights: "Todos os direitos reservados. Di Grecco Música & Entretenimento.",
      architectureTag: "Design de Palco, Dança & Pop Nacional",
    },
    es: {
      bioTitle: "Di Grecco Oficial",
      bioDesc: "Dupla pop brasileña formada por las hermanas Camilla Di Grecco y Giovanna Di Grecco. De la arquitectura y la danza pop a los escenarios y fiestas de 15 años más memorables.",
      linksTitle: "Redes & Plataformas Oficiales",
      contactTitle: "Contratación de Shows & Fiestas",
      whatsappLabel: "WhatsApp Producción Oficial:",
      coverageLabel: "Shows en todo Brasil y giras internacionales.",
      rights: "Todos los derechos reservados. Di Grecco Música & Entretenimiento.",
      architectureTag: "Diseño Escénico, Danza & Pop Latinoamericano",
    },
    en: {
      bioTitle: "Di Grecco Official",
      bioDesc: "Brazilian pop duo formed by sisters Camilla Di Grecco and Giovanna Di Grecco. From architecture and pop choreography to premier stages and 15th birthday events.",
      linksTitle: "Official Socials & Streaming",
      contactTitle: "Booking & Live Shows",
      whatsappLabel: "WhatsApp Executive Production:",
      coverageLabel: "Available for nationwide and international events.",
      rights: "All rights reserved. Di Grecco Music & Entertainment.",
      architectureTag: "Stage Design, Dance & Brazilian Pop",
    },
  }[lang];

  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 text-zinc-400 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-32 bg-pink-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/20">
                <img
                  src={DI_GRECCO_INFO.artistPhotoUrl}
                  alt="Camilla e Giovanna Di Grecco"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-white tracking-wider">
                  DI GRECCO
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-pink-400 font-semibold">
                  Camilla & Giovanna
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {t.bioDesc}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>{t.architectureTag}</span>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {t.linksTitle}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(link.iconName)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-zinc-200 group-hover:text-white truncate">
                      {link.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate">
                      {link.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {t.contactTitle}
            </h4>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <p className="text-xs text-zinc-300">
                {t.whatsappLabel}
              </p>

              <a
                href={DI_GRECCO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>{DI_GRECCO_INFO.whatsappNumber}</span>
              </a>

              <p className="text-[11px] text-zinc-400 text-center">
                {t.coverageLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Spotify Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} {t.rights}</p>

          <div className="flex items-center gap-4">
            <a
              href={DI_GRECCO_INFO.spotifyArtistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DB954] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Di Grecco no Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href={DI_GRECCO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline"
            >
              @digrecco
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
