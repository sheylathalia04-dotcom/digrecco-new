/**
 * Real Audio Player for official Di Grecco 30-second master previews.
 * Handles HTML5 audio playback with local and Spotify CDN sources.
 */

type Listener = (state: {
  isPlaying: boolean;
  songId: string | null;
  currentTime: number;
  duration: number;
  progress: number;
}) => void;

class RealAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentSongId: string | null = null;
  private listeners: Listener[] = [];
  private volume: number = 0.85;

  constructor() {
    // Client-side initialization
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const isPlaying = !!(this.audio && !this.audio.paused && !this.audio.ended);
    const currentTime = this.audio ? this.audio.currentTime : 0;
    const duration = this.audio && this.audio.duration ? this.audio.duration : 30;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const state = {
      isPlaying,
      songId: this.currentSongId,
      currentTime,
      duration,
      progress,
    };

    this.listeners.forEach((l) => l(state));
  }

  public play(songId: string, primarySrc: string, fallbackSrc?: string) {
    if (this.currentSongId === songId && this.audio) {
      if (this.audio.paused) {
        this.audio.play().then(() => this.notify()).catch(() => {});
      } else {
        this.audio.pause();
        this.notify();
      }
      return;
    }

    // Stop current track
    this.stop();

    this.currentSongId = songId;
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.volume = this.volume;
    this.audio = audio;

    let triedFallback = false;

    audio.src = primarySrc;

    audio.addEventListener("timeupdate", () => {
      this.notify();
    });

    audio.addEventListener("ended", () => {
      this.notify();
    });

    audio.addEventListener("play", () => {
      this.notify();
    });

    audio.addEventListener("pause", () => {
      this.notify();
    });

    audio.addEventListener("error", () => {
      if (!triedFallback && fallbackSrc) {
        triedFallback = true;
        audio.src = fallbackSrc;
        audio.load();
        audio.play().catch(() => {});
      } else {
        this.notify();
      }
    });

    audio.play().then(() => this.notify()).catch(() => {
      if (fallbackSrc && !triedFallback) {
        triedFallback = true;
        audio.src = fallbackSrc;
        audio.load();
        audio.play().catch(() => {});
      }
    });
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.notify();
    }
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.currentSongId = null;
    this.notify();
  }

  public seek(percent: number) {
    if (this.audio && this.audio.duration) {
      this.audio.currentTime = (percent / 100) * this.audio.duration;
      this.notify();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }
}

export const realAudioPlayer = new RealAudioPlayer();
