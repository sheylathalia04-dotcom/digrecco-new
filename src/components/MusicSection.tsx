import React, { useState, useEffect } from "react";
import { Play, Pause, ExternalLink, Disc, Sparkles, Volume2, Radio, Music, VolumeX } from "lucide-react";
import { SONGS, DI_GRECCO_INFO } from "../data/diGreccoData";
import { Song } from "../types";
import { realAudioPlayer } from "../utils/realAudioPlayer";

interface MusicSectionProps {
  lang: "pt" | "es" | "en";
}

export const MusicSection: React.FC<MusicSectionProps> = ({ lang }) => {
  const [activeSong, setActiveSong] = useState<Song>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [progress, setProgress] = useState<number>(0);
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = realAudioPlayer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTime(state.currentTime);
      setDuration(state.duration || 30);
      setProgress(state.progress);
    });

    return () => {
      unsubscribe();
      realAudioPlayer.stop();
    };
  }, []);

  const handlePlaySong = (song: Song) => {
    setActiveSong(song);
    realAudioPlayer.play(song.id, song.previewUrl, song.spotifyPreviewUrl);
  };

  const handleTogglePlay = (song: Song) => {
    if (activeSong.id === song.id && isPlaying) {
      realAudioPlayer.pause();
    } else {
      handlePlaySong(song);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    realAudioPlayer.seek(percent);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      realAudioPlayer.setVolume(0.85);
      setIsMuted(false);
    } else {
      realAudioPlayer.setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const t = {
    pt: {
      badge: "ÁUDIO REAL DE ESTÚDIO • 30S PREVIEW",
      title: "Músicas Oficiais da Di Grecco",
      subtitle:
        "Ouça trechos 100% REAIS com as vozes autênticas de Camilla e Giovanna Di Grecco gravadas em estúdio. Para ouvir a faixa completa sem cortes, clique no link oficial do Spotify.",
      filterAll: "Todas as Músicas (6)",
      filterHits: "Hits & Singles",
      filter15: "Especial Debutantes",
      listenSnippet: "Ouvir Áudio Real (30s)",
      playingSnippet: "Reproduzindo Vocal Original...",
      fullSongAlertTitle: "Canción completa en Spotify",
      fullSongAlertSub: "Ouça a gravação completa e siga o perfil oficial da Di Grecco no Spotify!",
      openInSpotify: "Canción completa en Spotify",
      realBadge: "Voz Real de Estúdio",
      bpmLabel: "BPM",
    },
    es: {
      badge: "AUDIO REAL DE ESTUDIO • ADELANTO DE 30S",
      title: "Canciones Oficiales de Di Grecco",
      subtitle:
        "Escucha fragmentos 100% REALES con las voces auténticas de Camilla y Giovanna Di Grecco grabadas en estudio. Para escuchar la canción completa sin cortes, haz clic en el enlace oficial de Spotify.",
      filterAll: "Todas las Canciones (6)",
      filterHits: "Hits & Singles",
      filter15: "Especial 15 Años",
      listenSnippet: "Escuchar Audio Real (30s)",
      playingSnippet: "Reproduciendo Voces Reales...",
      fullSongAlertTitle: "Canción completa en Spotify",
      fullSongAlertSub: "¡Disfruta de la canción completa en alta fidelidad en el perfil oficial de Spotify!",
      openInSpotify: "Canción completa en Spotify",
      realBadge: "Voz Real de Estudio",
      bpmLabel: "BPM",
    },
    en: {
      badge: "REAL MASTER AUDIO • 30S PREVIEW",
      title: "Official Di Grecco Songs",
      subtitle:
        "Stream 100% REAL audio clips featuring Camilla and Giovanna Di Grecco's actual studio vocals and master tracks. To stream the complete uncut song, tap the official Spotify button.",
      filterAll: "All Songs (6)",
      filterHits: "Hits & Singles",
      filter15: "Debutante Favorites",
      listenSnippet: "Play Real Audio (30s)",
      playingSnippet: "Playing Real Studio Vocals...",
      fullSongAlertTitle: "Canción completa en Spotify",
      fullSongAlertSub: "Stream the complete song and follow Di Grecco's verified Spotify profile!",
      openInSpotify: "Canción completa en Spotify",
      realBadge: "Original Studio Vocal",
      bpmLabel: "BPM",
    },
  }[lang];

  const filteredSongs = SONGS.filter((song) => {
    if (filterGenre === "hits") return song.id === "checkmate" || song.id === "veneno" || song.id === "mi-amor";
    if (filterGenre === "15") return song.id === "anjo-querubim" || song.id === "checkmate" || song.id === "na-minha-mao";
    return true;
  });

  return (
    <section id="musicas" className="py-24 relative overflow-hidden bg-[#07070b]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#1DB954]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/40 text-xs font-bold text-[#1DB954] uppercase tracking-widest shadow-md shadow-[#1DB954]/10">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setFilterGenre("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterGenre === "all"
                  ? "bg-[#1DB954] text-black font-extrabold shadow-lg shadow-[#1DB954]/25"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilterGenre("hits")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterGenre === "hits"
                  ? "bg-purple-500 text-white font-extrabold shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {t.filterHits}
            </button>
            <button
              onClick={() => setFilterGenre("15")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterGenre === "15"
                  ? "bg-pink-500 text-white font-extrabold shadow-lg shadow-pink-500/25"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {t.filter15}
            </button>
          </div>
        </div>

        {/* PROMINENT MANDATORY SPOTIFY SNIPPET & NOTICE BANNER (Plays the real master recording!) */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-[#1DB954]/70 shadow-2xl shadow-[#1DB954]/25 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Song cover & metadata */}
            <div className="flex items-center gap-5 w-full lg:w-auto">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-black border border-white/10 shadow-lg">
                <img
                  src={activeSong.coverImage}
                  alt={activeSong.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="flex items-end gap-1 h-6">
                      <span className="w-1 bg-[#1DB954] rounded-full animate-eq-1" />
                      <span className="w-1 bg-white rounded-full animate-eq-2" />
                      <span className="w-1 bg-[#1DB954] rounded-full animate-eq-3" />
                      <span className="w-1 bg-pink-400 rounded-full animate-eq-4" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                {/* MANDATORY PROMPT: "Canción completa en Spotify" */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/60 text-[#1DB954] text-xs font-black tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.fullSongAlertTitle}</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {activeSong.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2">
                  <span className="font-bold text-white">Di Grecco</span>
                  <span>•</span>
                  <span>{activeSong.releaseYear}</span>
                  <span>•</span>
                  <span className="text-[#1DB954] font-semibold">{t.realBadge}</span>
                </p>

                <p className="text-xs text-zinc-400 max-w-lg line-clamp-2">
                  {activeSong.description}
                </p>
              </div>
            </div>

            {/* Action buttons: Play/Pause Real Audio & DIRECT SPOTIFY LINK */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
              {/* Play/Pause Real Audio Button */}
              <button
                onClick={() => handleTogglePlay(activeSong)}
                className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-extrabold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-105 ${
                  isPlaying
                    ? "bg-white text-black shadow-white/20"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/30"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pausar Audio Real</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Reproducir Audio Real (30s)</span>
                  </>
                )}
              </button>

              {/* DIRECT SPOTIFY LINK WITH MANDATORY NOTICE */}
              <a
                href={activeSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-sm tracking-wide shadow-xl shadow-[#1DB954]/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                title="Escuchar canción completa en Spotify"
              >
                <Disc className="w-5 h-5 animate-spin" />
                <span className="whitespace-nowrap font-black">Canción completa en Spotify</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              {/* Mute button */}
              <button
                onClick={handleToggleMute}
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                title={isMuted ? "Desmutear" : "Mutear"}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-zinc-300" />}
              </button>
            </div>
          </div>

          {/* Interactive Seekable Waveform & Progress Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-[#1DB954] font-bold">
                {formatTime(currentTime)}
              </span>
              <span className="text-zinc-300 text-[11px] font-semibold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-pink-400" />
                <span>{isPlaying ? t.playingSnippet : t.listenSnippet}</span>
              </span>
              <span className="font-mono text-zinc-400">
                {formatTime(duration)}
              </span>
            </div>

            {/* Clickable scrub bar */}
            <div
              onClick={handleSeek}
              className="h-3 bg-white/10 hover:bg-white/15 rounded-full cursor-pointer overflow-hidden p-0.5 relative group"
            >
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-[#1DB954] rounded-full transition-all duration-100 shadow-md shadow-[#1DB954]/40"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Official Spotify Embed Player as supplemental widget */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-300 font-semibold flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#1DB954]" />
                <span>Widget Oficial de Spotify para <strong>{activeSong.title}</strong>:</span>
              </span>
              <a
                href={activeSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DB954] hover:underline text-xs font-bold flex items-center gap-1"
              >
                <span>Canción completa en Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
              <iframe
                style={{ borderRadius: "16px" }}
                src={`https://open.spotify.com/embed/track/${activeSong.spotifyTrackId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify Embed: ${activeSong.title}`}
              />
            </div>
          </div>
        </div>

        {/* 6 Real Song Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => {
            const isSelected = activeSong.id === song.id;
            const isThisPlaying = isSelected && isPlaying;

            return (
              <div
                key={song.id}
                onClick={() => handlePlaySong(song)}
                className={`group relative rounded-3xl p-5 transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "glass-panel-glow border-[#1DB954]/70 shadow-2xl shadow-[#1DB954]/20 scale-[1.01]"
                    : "glass-panel border-white/10 hover:border-white/25 hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Song Cover & Real Audio Play overlay */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-zinc-900 shadow-md">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-zinc-200 border border-white/10">
                      <span>{song.releaseYear}</span>
                      <span>•</span>
                      <span>{song.genre}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#1DB954] text-[10px] font-black text-black flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Áudio Real</span>
                    </div>

                    {/* Quick play real MP3 button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay(song);
                      }}
                      className={`absolute bottom-3 right-3 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                        isThisPlaying
                          ? "bg-white text-black scale-105 shadow-white/40"
                          : "bg-[#1DB954] hover:bg-[#1ed760] text-black hover:scale-110 shadow-black/50"
                      }`}
                      aria-label={`Reproduzir ${song.title}`}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* Animated equalizer if playing */}
                    {isThisPlaying && (
                      <div className="absolute bottom-3 left-3 flex items-end gap-1 h-6 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm">
                        <span className="w-1 bg-[#1DB954] rounded-full animate-eq-1" />
                        <span className="w-1 bg-white rounded-full animate-eq-2" />
                        <span className="w-1 bg-[#1DB954] rounded-full animate-eq-3" />
                        <span className="w-1 bg-pink-400 rounded-full animate-eq-4" />
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#1DB954] transition-colors">
                        {song.title}
                      </h3>
                      <span className="text-xs text-zinc-400 font-mono">
                        {song.duration}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                      {song.description}
                    </p>
                  </div>
                </div>

                {/* Card Action footer with mandatory "Canción completa en Spotify" */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <Volume2 className="w-3.5 h-3.5 text-[#1DB954]" />
                      <span>{song.highlightText}</span>
                    </span>
                    <span className="text-zinc-500 font-mono">
                      {t.bpmLabel}: {song.bpm}
                    </span>
                  </div>

                  {/* DIRECT BUTTON WITH MANDATORY TEXT */}
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-black border border-[#1DB954]/40 hover:border-[#1DB954] text-xs font-black transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                  >
                    <Disc className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                    <span>Canción completa en Spotify</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Spotify Callout strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-purple-950/40 border border-[#1DB954]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Discografia Completa da Di Grecco no Spotify
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300">
              Siga o perfil oficial para ouvir as versões completas de "Mi Amor", "Checkmate", "Veneno", "Na Minha Mão", "Lado B" e "Anjo Querubim".
            </p>
          </div>

          <a
            href={DI_GRECCO_INFO.spotifyArtistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-sm tracking-wide shadow-xl shadow-[#1DB954]/30 flex items-center gap-2.5 transition-all hover:scale-105 flex-shrink-0"
          >
            <span>Seguir no Spotify Oficial</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
