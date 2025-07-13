import { useState, useEffect, useCallback } from 'react';
import { audioManager } from '@/lib/audioManager';

interface UseEnhancedAudioOptions {
  autoInitialize?: boolean;
  preloadWords?: string[];
}

interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
  playClickFirst?: boolean;
}

export const useEnhancedAudio = (options: UseEnhancedAudioOptions = {}) => {
  const [isReady, setIsReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio system
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await audioManager.initialize();
        setIsReady(true);
        
        // Load available voices
        if (window.speechSynthesis) {
          const availableVoices = window.speechSynthesis.getVoices();
          setVoices(availableVoices);
          
          // Handle voice loading for some browsers
          if (availableVoices.length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', () => {
              setVoices(window.speechSynthesis.getVoices());
            });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize audio');
      }
    };

    if (options.autoInitialize !== false) {
      initializeAudio();
    }

    return () => {
      // Cleanup is handled by audioManager
    };
  }, [options.autoInitialize]);

  // Preload specific words if provided
  useEffect(() => {
    if (options.preloadWords && options.preloadWords.length > 0) {
      // For TTS, we don't need to preload audio files, but we can prepare the voices
      const prepareVoices = () => {
        if (window.speechSynthesis && voices.length > 0) {
          // Trigger voice loading by speaking a silent utterance
          const silent = new SpeechSynthesisUtterance('');
          silent.volume = 0;
          window.speechSynthesis.speak(silent);
        }
      };
      
      if (voices.length > 0) {
        prepareVoices();
      }
    }
  }, [options.preloadWords, voices]);

  // Enhanced speak function
  const speak = useCallback(async (text: string, speakOptions: SpeakOptions = {}) => {
    if (!isReady || !text.trim()) {
      return;
    }

    try {
      setIsSpeaking(true);
      setError(null);

      // Play click sound first if requested
      if (speakOptions.playClickFirst) {
        await audioManager.playClick();
        // Small delay to prevent overlap
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Use the enhanced TTS from audioManager
      await audioManager.speak(text, {
        lang: speakOptions.lang,
        rate: speakOptions.rate,
        pitch: speakOptions.pitch,
        voice: speakOptions.voice
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speech synthesis failed');
    } finally {
      setIsSpeaking(false);
    }
  }, [isReady]);

  // Quick pronunciation for vocabulary words
  const pronounceWord = useCallback(async (word: string, withClick: boolean = true) => {
    await speak(word, {
      rate: 0.8,  // Slower for learning
      pitch: 1.1, // Child-friendly pitch
      playClickFirst: withClick
    });
  }, [speak]);

  // Spell out word letter by letter
  const spellWord = useCallback(async (word: string) => {
    if (!isReady) return;
    
    const letters = word.split('');
    await audioManager.playClick();
    
    for (let i = 0; i < letters.length; i++) {
      await speak(letters[i], { 
        rate: 0.6, 
        pitch: 1.2,
        playClickFirst: false 
      });
      
      // Pause between letters
      if (i < letters.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }, [speak, isReady]);

  // Sound effect shortcuts
  const playClick = useCallback(() => audioManager.playClick(), []);
  const playSuccess = useCallback(() => audioManager.playSuccess(), []);
  const playError = useCallback(() => audioManager.playError(), []);
  const playComplete = useCallback(() => audioManager.playComplete(), []);

  // Cancel current speech
  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Volume controls
  const setVolume = useCallback((volume: number) => {
    audioManager.setMasterVolume(volume);
  }, []);

  const setSfxVolume = useCallback((volume: number) => {
    audioManager.setSfxVolume(volume);
  }, []);

  // Get preferred voice for children
  const getChildFriendlyVoice = useCallback(() => {
    return voices.find(v => 
      v.lang === 'en-US' && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('samantha') ||
       v.name.includes('Google US English'))
    ) || voices.find(v => v.lang === 'en-US') || voices[0];
  }, [voices]);

  return {
    // State
    isReady,
    isSpeaking,
    voices,
    error,
    
    // Main functions
    speak,
    pronounceWord,
    spellWord,
    cancel,
    
    // Sound effects
    playClick,
    playSuccess,
    playError,
    playComplete,
    
    // Controls
    setVolume,
    setSfxVolume,
    getChildFriendlyVoice,
    
    // Utils
    masterVolume: audioManager.getMasterVolume(),
    sfxVolume: audioManager.getSfxVolume(),
  };
};