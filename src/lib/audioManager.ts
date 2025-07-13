interface AudioAsset {
  url: string;
  buffer?: AudioBuffer;
  loaded: boolean;
  error?: string;
}

interface SoundEffects {
  click: string;
  success: string;
  error: string;
  complete: string;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioAssets: Map<string, AudioAsset> = new Map();
  // Sound effects URLs (currently empty, can be populated with real audio files later)
  private soundEffects: SoundEffects = {
    click: '',
    success: '',
    error: '',
    complete: ''
  };
  private masterVolume: number = 0.7;
  private sfxVolume: number = 0.5;

  async initialize(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // For now, we'll skip preloading sound effects since we're using empty strings
      // This can be enhanced later with real audio files
      console.log('Audio manager initialized. Sound effects available:', Object.keys(this.soundEffects));
    } catch (error) {
      console.warn('Web Audio API not supported, falling back to HTML5 Audio:', error);
    }
  }

  // Preload sound effects (currently disabled as we're using empty strings)
  // private async preloadSoundEffects(): Promise<void> {
  //   if (!this.soundEffects.click) {
  //     return;
  //   }
  //   const promises = Object.entries(this.soundEffects).map(([key, dataUrl]) => 
  //     this.preloadAudio(key, dataUrl)
  //   );
  //   await Promise.allSettled(promises);
  // }

  async preloadAudio(key: string, url: string): Promise<void> {
    if (this.audioAssets.has(key) || !url) {
      return;
    }

    const asset: AudioAsset = {
      url,
      loaded: false
    };

    this.audioAssets.set(key, asset);

    try {
      if (this.audioContext) {
        // Use Web Audio API for better performance
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        asset.buffer = audioBuffer;
        asset.loaded = true;
      } else {
        // Fallback: preload with HTML5 Audio
        const audio = new Audio(url);
        audio.preload = 'auto';
        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve);
          audio.addEventListener('error', reject);
          audio.load();
        });
        asset.loaded = true;
      }
    } catch (error) {
      asset.error = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Failed to preload audio ${key}:`, error);
    }
  }

  async playAudio(key: string, volume: number = 1): Promise<void> {
    const asset = this.audioAssets.get(key);
    if (!asset || !asset.loaded) {
      // For development, just log instead of playing actual sounds
      console.log(`Playing sound effect: ${key}`);
      return;
    }

    try {
      if (this.audioContext && asset.buffer) {
        // Use Web Audio API for precise control
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = asset.buffer;
        gainNode.gain.value = Math.min(1, volume * this.masterVolume);
        
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        source.start(0);
      } else {
        // Fallback to HTML5 Audio
        const audio = new Audio(asset.url);
        audio.volume = Math.min(1, volume * this.masterVolume);
        await audio.play();
      }
    } catch (error) {
      console.warn(`Failed to play audio ${key}:`, error);
    }
  }

  // Sound effect shortcuts
  async playClick(): Promise<void> {
    await this.playAudio('click', this.sfxVolume);
  }

  async playSuccess(): Promise<void> {
    await this.playAudio('success', this.sfxVolume);
  }

  async playError(): Promise<void> {
    await this.playAudio('error', this.sfxVolume);
  }

  async playComplete(): Promise<void> {
    await this.playAudio('complete', this.sfxVolume);
  }

  // Text-to-Speech with improved settings
  async speak(text: string, options: {
    lang?: string;
    rate?: number;
    pitch?: number;
    voice?: SpeechSynthesisVoice;
  } = {}): Promise<void> {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Enhanced voice selection for children
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = 
        options.voice ||
        voices.find(v => v.name.includes('Google US English')) ||
        voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en-'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.85; // Slower for children
      utterance.pitch = options.pitch || 1.1; // Slightly higher for appeal
      utterance.volume = this.masterVolume;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      window.speechSynthesis.speak(utterance);
    });
  }

  // Volume controls
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  getSfxVolume(): number {
    return this.sfxVolume;
  }

  // Cleanup
  dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.audioAssets.clear();
  }
}

// Singleton instance
export const audioManager = new AudioManager();

// Auto-initialize on first user interaction
let initialized = false;
const initializeOnInteraction = async () => {
  if (!initialized) {
    await audioManager.initialize();
    initialized = true;
    // Remove listeners after initialization
    document.removeEventListener('click', initializeOnInteraction);
    document.removeEventListener('touchstart', initializeOnInteraction);
  }
};

document.addEventListener('click', initializeOnInteraction);
document.addEventListener('touchstart', initializeOnInteraction);