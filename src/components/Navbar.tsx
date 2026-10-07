import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  Music,
  Menu,
  X,
  ArrowUpRight,
  Radio,
  Globe,
} from "lucide-react";
import { DI_GRECCO_INFO } from "../data/diGreccoData";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenLiveVoice: () => void;
  lang: "pt" | "es" | "en";
  setLang: (l: "pt" | "es" | "en") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenLiveVoice,
  lang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    pt: {
      music: "Músicas & Spotify",
      debutantes: "Shows 15 Anos",
      bio: "Biografia",
      liveVoice: "Voz ao Vivo",
      vipChat: "DiGrecco Bot",
      bookWhatsapp: "Contratar Show",
      langLabel: "Idioma",
      official: "Oficial",
    },
    es: {
      music: "Música & Spotify",
      debutantes: "Shows 15 Años",
      bio: "Biografía",
      liveVoice: "Voz en Vivo",
      vipChat: "DiGrecco Bot",
      bookWhatsapp: "Contratar Show",
      langLabel: "Idioma",
      official: "Oficial",
    },
    en: {
      music: "Music & Spotify",
      debutantes: "15th Birthday Shows",
      bio: "Biography",
      liveVoice: "Live Voice",
      vipChat: "DiGrecco Bot",
      bookWhatsapp: "Book Show",
      langLabel: "Language",
      official: "Official",
    },
  }[lang];

  const languages = [
    { code: "pt" as const, label: "PT-BR", flag: "🇧🇷", full: "Português (Brasil)" },
    { code: "es" as const, label: "ES", flag: "🇪🇸", full: "Español" },
    { code: "en" as const, label: "EN", flag: "🇺🇸", full: "English" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090e]/90 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand with REAL PHOTO ICON of Camilla & Giovanna Di Grecco */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/50 group-hover:scale-105 transition-all">
            <img
              src={DI_GRECCO_INFO.artistPhotoUrl}
              alt="Camilla e Giovanna Di Grecco Foto Real"
              className="w-full h-full object-cover rounded-[14px]"
              referrerPolicy="no-referrer"
            />
            {/* Online glow dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#1DB954] border-2 border-[#09090e]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display tracking-wider font-extrabold text-xl text-white group-hover:text-pink-400 transition-colors">
                DI GRECCO
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-[#1DB954]/20 text-[#1DB954] text-[9px] font-bold uppercase tracking-wider">
                Verificado
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">
              Camilla & Giovanna
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          <a
            href="#musicas"
            className="text-xs font-semibold text-zinc-300 hover:text-pink-400 transition-colors flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 text-pink-400" />
            {t.music}
          </a>
          <a
            href="#debutantes"
            className="text-xs font-semibold text-zinc-300 hover:text-purple-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            {t.debutantes}
          </a>
          <a
            href="#biografia"
            className="text-xs font-semibold text-zinc-300 hover:text-cyan-400 transition-colors"
          >
            {t.bio}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Prominent Language Switcher */}
          <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 text-xs">
            {languages.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  title={`${l.full} ${l.code === "pt" ? `(${t.official})` : ""}`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className="text-[11px] font-bold">{l.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Voice API Button */}
          <button
            onClick={onOpenLiveVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-wide transition-all shadow-sm"
            title="Conversar por Voz com gemini-3.8-live"
          >
            <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span className="hidden md:inline">{t.liveVoice}</span>
          </button>

          {/* AI Chat button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">{t.vipChat}</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={DI_GRECCO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold tracking-wide shadow-md shadow-emerald-500/20 transition-all hover:scale-102"
          >
            <span className="whitespace-nowrap">{t.bookWhatsapp}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex xl:hidden items-center gap-1.5">
          {/* Mobile quick language toggle */}
          <button
            onClick={() => setLang(lang === "pt" ? "es" : lang === "es" ? "en" : "pt")}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white"
            title="Alterar Idioma"
          >
            <span className="text-sm">
              {lang === "pt" ? "🇧🇷" : lang === "es" ? "🇪🇸" : "🇺🇸"}
            </span>
            <span className="text-[10px] uppercase font-bold">{lang}</span>
          </button>

          <button
            onClick={onOpenLiveVoice}
            className="p-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30"
            title="Voz ao Vivo"
          >
            <Radio className="w-4 h-4 animate-pulse" />
          </button>
          <button
            onClick={onOpenChat}
            className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30"
            title="DiGrecco Bot"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 bg-[#0c0c14] border-b border-white/10 space-y-4">
          {/* Language selector in mobile menu */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              {t.langLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-all ${
                    lang === l.code
                      ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                      : "bg-black/40 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="mt-1 text-[11px]">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <a
              href="#musicas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-200 py-1.5 flex items-center gap-2"
            >
              <Music className="w-4 h-4 text-pink-400" />
              {t.music}
            </a>
            <a
              href="#debutantes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-200 py-1.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              {t.debutantes}
            </a>
            <a
              href="#biografia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-200 py-1.5"
            >
              {t.bio}
            </a>
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <a
              href={DI_GRECCO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold"
            >
              WhatsApp Oficial
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
