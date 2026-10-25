/**
 * Cute Kawaii Web Audio Sound Synthesizer
 * Generates adorable cartoon squeaks, toy bonks, bubble pops,
 * and sweet magical sparkle chimes without external media files.
 */

class KawaiiAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private loopTimer: NodeJS.Timeout | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.28;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: (isPlaying: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying));
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.notify();
    this.startCuteLullabyLoop();
  }

  public pause() {
    this.isPlaying = false;
    this.notify();
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play a soft bell/music-box note
  private playMusicBoxNote(freq: number, startTime: number, duration: number, gainVal = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // Sweet music box chord loop (C - G - Am - F)
  private startCuteLullabyLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const notesSequence = [
      [523.25, 659.25, 783.99], // C5, E5, G5
      [392.0, 493.88, 587.33],  // G4, B4, D5
      [440.0, 523.25, 659.25],  // A4, C5, E5
      [349.23, 440.0, 523.25],  // F4, A4, C5
    ];

    let chordIdx = 0;

    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = notesSequence[chordIdx];

      notes.forEach((freq, i) => {
        this.playMusicBoxNote(freq, now + i * 0.22, 2.2, 0.06 - i * 0.01);
      });

      chordIdx = (chordIdx + 1) % notesSequence.length;
      this.loopTimer = setTimeout(playNext, 3800);
    };

    playNext();
  }

  // Adorable bubble pop sound
  public playPop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.07);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Squeaky cartoon toy bonk
  public playBonk() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Low bouncy boing
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);

    // High squeak overlay
    const squeak = this.ctx.createOscillator();
    const squeakGain = this.ctx.createGain();

    squeak.type = 'sine';
    squeak.frequency.setValueAtTime(900, now + 0.02);
    squeak.frequency.exponentialRampToValueAtTime(1800, now + 0.08);

    squeakGain.gain.setValueAtTime(0.08, now + 0.02);
    squeakGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    squeak.connect(squeakGain);
    squeakGain.connect(this.masterGain);

    squeak.start(now + 0.02);
    squeak.stop(now + 0.14);
  }

  // Playful cute meow chirping squeak
  public playCuteMeow() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.09);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.22);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Sweet fairy sparkle chime
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [659.25, 880.0, 1046.5, 1318.51, 1567.98]; // E5, A5, C6, E6, G6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      this.playMusicBoxNote(freq, now + idx * 0.07, 1.4, 0.07);
    });
  }

  // Heartbeat pulse sound for holding interaction
  public playHeartbeat(intensity = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1 * intensity, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Magical zoom out whoosh / gentle shimmer
  public playZoomOut() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.35); // G6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Silky ribbon untie whoosh and sparkle sound
  public playRibbonUntie() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Soft high-frequency shimmer slide
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1180, now + 0.28);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.38);

    setTimeout(() => {
      this.playSparkle();
    }, 120);
  }

  // Gentle subtle scratch friction sound
  public playScratch() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Fast noise-like frequency sweep for scratch feel
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400 + Math.random() * 200, now);
    osc.frequency.linearRampToValueAtTime(800 + Math.random() * 400, now + 0.04);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Compatibility methods
  public playWaxSealBreak() {
    this.playPop();
  }

  public playHeartbeatThud(intensity = 0.5) {
    this.playHeartbeat(intensity);
  }

  public playSuccessChime() {
    this.playSparkle();
  }
}

export const kawaiiAudio = new KawaiiAudioManager();
export const romanticAudio = kawaiiAudio;
