/**
 * Clean Web Audio API sound effects for magical sister birthday celebration.
 * Works reliably without external audio asset network failures.
 */

class MagicAudioEngine {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmInterval: any = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play delicate chime
  playChime(frequency = 587.33, type: OscillatorType = 'sine', duration = 0.8) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Sparkle magical arpeggio
  playSparkleSound() {
    try {
      this.initCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C E G C E G
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 'triangle', 0.6);
        }, idx * 60);
      });
    } catch (e) {}
  }

  // Candle blow whoosh sound
  playBlowSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Noise buffer for gentle wind/breath
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {}
  }

  // Cake cut / celebration fanfare
  playCelebrationSound() {
    try {
      this.initCtx();
      // Fanfare chords
      const chords = [
        [523.25, 659.25, 783.99], // C Major
        [587.33, 739.99, 880.00], // D Major
        [659.25, 830.61, 987.77], // E Major
        [783.99, 987.77, 1318.51] // G / High Major
      ];

      chords.forEach((chord, step) => {
        setTimeout(() => {
          chord.forEach(freq => this.playChime(freq, 'sine', 0.8));
        }, step * 180);
      });
    } catch (e) {}
  }

  // Toggle ambient music loop
  toggleAmbientMusic(onStateChange?: (playing: boolean) => void) {
    this.initCtx();
    if (this.isBgmPlaying) {
      clearInterval(this.bgmInterval);
      this.isBgmPlaying = false;
      if (onStateChange) onStateChange(false);
    } else {
      this.isBgmPlaying = true;
      if (onStateChange) onStateChange(true);

      const melody = [
        392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 783.99, 659.25,
        523.25, 493.88, 440.00, 392.00, 440.00, 523.25, 587.33, 659.25
      ];
      let step = 0;

      this.playChime(melody[0], 'sine', 1.2);
      this.bgmInterval = setInterval(() => {
        if (!this.isBgmPlaying) return;
        step = (step + 1) % melody.length;
        this.playChime(melody[step], 'sine', 1.2);
      }, 700);
    }
  }

  getIsBgmPlaying() {
    return this.isBgmPlaying;
  }
}

export const magicAudio = new MagicAudioEngine();
