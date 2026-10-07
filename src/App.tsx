/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquare, Phone, Sparkles, Disc, Radio } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MusicSection } from "./components/MusicSection";
import { DebutanteSection } from "./components/DebutanteSection";
import { BiographySection } from "./components/BiographySection";
import { Footer } from "./components/Footer";
import { ChatbotModal } from "./components/ChatbotModal";
import { LiveVoiceModal } from "./components/LiveVoiceModal";
import { DI_GRECCO_INFO } from "./data/diGreccoData";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<"pt" | "es" | "en">("pt");

  const scrollToMusic = () => {
    const el = document.getElementById("musicas");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-[#f4f4f6] relative selection:bg-pink-500/30 selection:text-pink-300">
      {/* Top Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          onExploreMusic={scrollToMusic}
          onOpenChat={() => setIsChatOpen(true)}
          lang={lang}
        />

        {/* Music Section with Interactive Spotify Snippets & Notice */}
        <MusicSection lang={lang} />

        {/* 15 Anos (Debutantes) Specialization & Direct WhatsApp Booking */}
        <DebutanteSection
          lang={lang}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* Real Biography: Architecture to Pop & Ballet */}
        <BiographySection lang={lang} />
      </main>

      {/* Official Footer with verified social links */}
      <Footer lang={lang} />

      {/* Gemini AI Multi-turn Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        lang={lang}
      />

      {/* Gemini Live Voice Modal */}
      <LiveVoiceModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
        lang={lang}
      />

      {/* Floating Action Buttons (Sticky at bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Live Voice API Floating Button */}
        <button
          onClick={() => setIsLiveVoiceOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/90 to-purple-600/90 hover:from-pink-500 hover:to-purple-600 text-white font-bold text-xs shadow-xl shadow-pink-500/25 backdrop-blur-md transition-all hover:scale-105 border border-pink-400/40"
          title="Iniciar Conversa por Voz em Tempo Real (gemini-3.8-live)"
        >
          <Radio className="w-4 h-4 text-white animate-pulse" />
          <span className="hidden sm:inline">Voz ao Vivo (Live API)</span>
        </button>

        {/* Spotify Quick Pill */}
        <a
          href={DI_GRECCO_INFO.spotifyArtistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121212]/90 hover:bg-[#1DB954] text-[#1DB954] hover:text-black border border-[#1DB954]/40 hover:border-[#1DB954] text-xs font-bold shadow-xl backdrop-blur-md transition-all group"
          title="Ouvir no Spotify"
        >
          <Disc className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>Spotify Oficial</span>
        </a>

        {/* Direct WhatsApp Floating Button */}
        <a
          href={DI_GRECCO_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs tracking-wider shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all"
          title="Falar no WhatsApp para Shows de 15 Anos"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Gemini Chatbot Trigger Floating Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-wider shadow-2xl shadow-pink-500/30 hover:scale-105 transition-all group"
          title="Abrir DiGrecco Bot"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-white" />
            <Sparkles className="w-2.5 h-2.5 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span>DiGrecco Bot</span>
        </button>
      </div>
    </div>
  );
}
