/**
 * Custom Synthesizer using Web Audio API to create futuristic sci-fi sound effects
 */
class SciFiSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMutedState() {
    return this.isMuted;
  }

  playBeep(freq: number = 600, duration: number = 0.08, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Ignored gracefully
    }
  }

  playConfirm() {
    this.playBeep(450, 0.05, 'sine');
    setTimeout(() => this.playBeep(900, 0.12, 'sine'), 50);
  }

  playError() {
    this.playBeep(220, 0.25, 'triangle');
    setTimeout(() => this.playBeep(180, 0.15, 'triangle'), 100);
  }

  playSuccess() {
    this.playBeep(600, 0.1, 'sine');
    setTimeout(() => this.playBeep(800, 0.1, 'sine'), 80);
    setTimeout(() => this.playBeep(1200, 0.2, 'sine'), 160);
  }

  playTick() {
    this.playBeep(1000, 0.02, 'sine');
  }

  playLevelUp() {
    const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    scale.forEach((freq, index) => {
      setTimeout(() => {
        this.playBeep(freq, 0.15, 'sine');
      }, index * 100);
    });
  }
}

export const sysSynth = new SciFiSynth();
