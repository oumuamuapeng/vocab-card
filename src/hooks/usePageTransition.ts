import { useState, useCallback } from 'react';

export interface TransitionConfig {
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  type?: 'slide' | 'fade' | 'scale';
}

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionConfig, setTransitionConfig] = useState<TransitionConfig>({
    duration: 300,
    direction: 'right',
    type: 'slide'
  });

  const startTransition = useCallback((config?: TransitionConfig) => {
    if (config) {
      setTransitionConfig(prev => ({ ...prev, ...config }));
    }
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const getTransitionVariants = useCallback(() => {
    const { direction, type } = transitionConfig;

    if (type === 'fade') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }

    if (type === 'scale') {
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.2 }
      };
    }

    // Default slide transitions
    const slideVariants = {
      left: {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 }
      },
      right: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 }
      },
      up: {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 }
      },
      down: {
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 }
      }
    };

    return slideVariants[direction || 'right'];
  }, [transitionConfig]);

  const getTransition = useCallback(() => {
    return {
      duration: (transitionConfig.duration || 300) / 1000,
      ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
    };
  }, [transitionConfig]);

  return {
    isTransitioning,
    startTransition,
    endTransition,
    getTransitionVariants,
    getTransition,
    transitionConfig
  };
};