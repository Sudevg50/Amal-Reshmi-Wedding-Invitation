import { invite } from "../config/invite";

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private userMuted: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private interactionListenersBound: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;

    const audio = new Audio(invite.assets.music);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    // Extra guarantee: loop when ended in case loop property has browser quirks
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      if (!this.userMuted) {
        audio.play().catch(() => {});
      }
    });

    audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.notify();
    });

    audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio = audio;
    (window as any).__weddingAudio = audio;

    // Try auto-playing by default immediately
    this.play();

    // In case browser blocks autoplay without prior user gesture,
    // unlock audio on the very first user interaction (touch/click/key).
    this.bindAutoPlayInteraction();
  }

  private bindAutoPlayInteraction() {
    if (this.interactionListenersBound || typeof window === "undefined") return;
    this.interactionListenersBound = true;

    const unlock = () => {
      if (!this.userMuted && (!this.audio || this.audio.paused)) {
        this.play();
      }
      // Remove listeners once interacted
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });
  }

  public play() {
    if (!this.audio) return;
    this.userMuted = false;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // Autoplay was prevented by browser policy; will unlock on first interaction
          this.isPlaying = false;
          this.notify();
        });
    }
  }

  public pause() {
    if (!this.audio) return;
    this.userMuted = true;
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (!this.audio) {
      this.init();
    }
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }
}

export const audioManager = new AudioManager();
