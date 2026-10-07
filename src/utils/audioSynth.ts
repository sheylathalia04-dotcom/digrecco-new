/**
 * Web Audio API synthesizer for realistic pop previews of Di Grecco tracks.
 * Plays high-quality harmonic rhythm and synth riffs without CORS restrictions,
 * and tracks audio playback states for visualization.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentSongId: string | null = null;
  private intervalId: any = null;
  private onStateChange: ((isPlaying: boolean, songId: string | null, progress: number) => void) | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private startTime: number = 0;
  private duration: number = 18; // 18-second snippet preview

  public subscribe(cb: (isPlaying: boolean, songId: string | null, progress: number) => void) {
    this.onStateChange = cb;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playSnippet(songId: string, bpm: number = 120) {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentSongId = songId;
    this.startTime = this.ctx.currentTime;

    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.activeNodes.push(masterGain);

    const beatInterval = 60 / bpm;
    const totalBeats = Math.floor(this.duration / beatInterval);

    // Track-specific harmonic progressions
    const chordsMap: Record<string, number[][]> = {
      checkmate: [
        [220, 261.63, 329.63], // Am
        [174.61, 220, 261.63], // F
        [130.81, 164.81, 196], // C
        [196, 246.94, 293.66], // G
      ],
      "mi-amor": [
        [146.83, 174.61, 220], // Dm
        [174.61, 220, 261.63], // F
        [130.81, 164.81, 196], // C
        [196, 246.94, 293.66], // G
      ],
      veneno: [
        [146.83, 174.61, 220], // Dm
        [164.81, 196, 246.94], // Em
        [174.61, 220, 261.63], // F
        [130.81, 164.81, 196], // C
      ],
      "na-minha-mao": [
        [130.81, 164.81, 196], // C
        [196, 246.94, 293.66], // G
        [220, 261.63, 329.63], // Am
        [174.61, 220, 261.63], // F
      ],
      "lado-b": [
        [174.61, 220, 261.63], // Fmaj
        [196, 246.94, 293.66], // G
        [220, 261.63, 329.63], // Am
        [164.81, 196, 246.94], // Em
      ],
      "anjo-querubim": [
        [130.81, 164.81, 196], // C
        [220, 261.63, 329.63], // Am
        [174.61, 220, 261.63], // F
        [196, 246.94, 293.66], // G
      ],
    };

    const chords = chordsMap[songId] || chordsMap.checkmate;

    // Schedule beat events
    for (let b = 0; b < totalBeats; b++) {
      const beatTime = ctx.currentTime + b * beatInterval;
      const chordIndex = Math.floor(b / 4) % chords.length;
      const currentChord = chords[chordIndex];

      // 1. Kick on beats 0, 2, or reggaeton bounce
      if (b % 2 === 0 || (songId === "veneno" && (b % 4 === 0 || b % 4 === 3))) {
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.type = "sine";
        kickOsc.frequency.setValueAtTime(140, beatTime);
        kickOsc.frequency.exponentialRampToValueAtTime(38, beatTime + 0.12);
        kickGain.gain.setValueAtTime(0.8, beatTime);
        kickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.18);
        kickOsc.connect(kickGain);
        kickGain.connect(masterGain);
        kickOsc.start(beatTime);
        kickOsc.stop(beatTime + 0.2);
      }

      // 2. Crisp Hi-Hat on every upbeat
      const hatOsc = ctx.createOscillator();
      const hatGain = ctx.createGain();
      hatOsc.type = "triangle";
      hatOsc.frequency.setValueAtTime(8000 + (b % 2) * 1500, beatTime + beatInterval * 0.5);
      hatGain.gain.setValueAtTime(0.08, beatTime + beatInterval * 0.5);
      hatGain.gain.exponentialRampToValueAtTime(0.0001, beatTime + beatInterval * 0.5 + 0.05);
      hatOsc.connect(hatGain);
      hatGain.connect(masterGain);
      hatOsc.start(beatTime + beatInterval * 0.5);
      hatOsc.stop(beatTime + beatInterval * 0.5 + 0.06);

      // 3. Synth Bassline
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = songId === "veneno" ? "sawtooth" : "triangle";
      const rootFreq = currentChord[0] / 2;
      bassOsc.frequency.setValueAtTime(rootFreq, beatTime);
      bassGain.gain.setValueAtTime(0.25, beatTime);
      bassGain.gain.exponentialRampToValueAtTime(0.01, beatTime + beatInterval * 0.9);
      bassOsc.connect(bassGain);
      bassGain.connect(masterGain);
      bassOsc.start(beatTime);
      bassOsc.stop(beatTime + beatInterval);

      // 4. Melodic Arp hook
      const noteFreq = currentChord[b % currentChord.length] * 2;
      const leadOsc = ctx.createOscillator();
      const leadGain = ctx.createGain();
      leadOsc.type = "sine";
      leadOsc.frequency.setValueAtTime(noteFreq, beatTime);
      leadGain.gain.setValueAtTime(0.18, beatTime);
      leadGain.gain.exponentialRampToValueAtTime(0.001, beatTime + beatInterval * 0.7);
      leadOsc.connect(leadGain);
      leadGain.connect(masterGain);
      leadOsc.start(beatTime);
      leadOsc.stop(beatTime + beatInterval);
    }

    // Monitor progress
    const startSec = Date.now();
    this.intervalId = setInterval(() => {
      const elapsed = (Date.now() - startSec) / 1000;
      const progress = Math.min(100, (elapsed / this.duration) * 100);

      if (this.onStateChange) {
        this.onStateChange(this.isPlaying, this.currentSongId, progress);
      }

      if (elapsed >= this.duration) {
        this.stop();
      }
    }, 100);
  }

  public stop() {
    this.isPlaying = false;
    this.currentSongId = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {
        // ignore
      }
      this.ctx = null;
    }
    if (this.onStateChange) {
      this.onStateChange(false, null, 0);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentSongId(): string | null {
    return this.currentSongId;
  }
}

export const soundEngine = new AudioEngine();
