import { useState, useEffect, useCallback } from 'react';

interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<SpeechSynthesisErrorEvent | null>(null);

  const cancel = useCallback(() => {
    if (!window.speechSynthesis) return;
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const handleVoicesChanged = () => {
        const availableVoices = synth.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          if (!isReady) setIsReady(true);
        }
      };

      if (synth.getVoices().length > 0) {
        handleVoicesChanged();
      } else {
        synth.addEventListener('voiceschanged', handleVoicesChanged);
      }

      return () => {
        synth.removeEventListener('voiceschanged', handleVoicesChanged);
        cancel();
      };
    }
  }, [isReady, cancel]);

  const speak = useCallback((text: string, options?: SpeakOptions) => {
    if (!isReady || !text) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const englishVoice =
      voices.find(v => v.name === 'Google US English') ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang.startsWith('en-'));
    
    if (options?.voice) {
      utterance.voice = options.voice;
    } else if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.lang = options?.lang || 'en-US';
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setError(event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isReady, voices]);

  return { voices, isSpeaking, isReady, error, speak, cancel };
};

export default useSpeechSynthesis; 