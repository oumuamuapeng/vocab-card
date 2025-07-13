import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/web';
import { useHapticFeedback } from '@/lib/hapticFeedback';
import { useEnhancedAudio } from './useEnhancedAudio';

interface UseGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
  
  // Gesture thresholds
  swipeThreshold?: number;
  longPressThreshold?: number;
  doubleTapTimeout?: number;
  
  // Feedback options
  enableHaptic?: boolean;
  enableAudio?: boolean;
  enableSpring?: boolean;
}

// Gesture state interface for animation springs (for future use)
// interface GestureState {
//   x: SpringValue<number>;
//   y: SpringValue<number>;
//   scale: SpringValue<number>;
//   rotate: SpringValue<number>;
//   opacity: SpringValue<number>;
// }

export const useGestures = (options: UseGesturesOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onDoubleTap,
    onLongPress,
    onPinch,
    swipeThreshold = 50,
    longPressThreshold = 500,
    doubleTapTimeout = 300,
    enableHaptic = true,
    enableAudio = true,
    enableSpring = true,
  } = options;

  const haptic = useHapticFeedback();
  const { playClick, playSuccess } = useEnhancedAudio({ autoInitialize: false });

  // Spring animation state
  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    config: { tension: 300, friction: 30 }
  }));

  // Gesture state
  let tapCount = 0;
  let tapTimeout: NodeJS.Timeout | null = null;
  let longPressTimeout: NodeJS.Timeout | null = null;
  let isLongPressed = false;

  // Gesture handlers
  const gestureHandlers = useGesture({
    // Drag gesture for swipe detection
    onDrag: ({ active, movement: [mx, my], direction: [dx, dy], velocity: [vx, vy] }) => {
      if (isLongPressed) return;

      if (enableSpring) {
        api.start({
          x: active ? mx : 0,
          y: active ? my : 0,
          scale: active ? 1.05 : 1,
          immediate: active
        });
      }

      // Detect swipe gestures
      if (!active) {
        const distance = Math.sqrt(mx * mx + my * my);
        const speed = Math.sqrt(vx * vx + vy * vy);
        
        if (distance > swipeThreshold && speed > 0.5) {
          // Determine swipe direction
          if (Math.abs(mx) > Math.abs(my)) {
            // Horizontal swipe
            if (dx > 0 && onSwipeRight) {
              onSwipeRight();
              if (enableHaptic) haptic.swipe();
              if (enableAudio) playClick();
            } else if (dx < 0 && onSwipeLeft) {
              onSwipeLeft();
              if (enableHaptic) haptic.swipe();
              if (enableAudio) playClick();
            }
          } else {
            // Vertical swipe
            if (dy > 0 && onSwipeDown) {
              onSwipeDown();
              if (enableHaptic) haptic.swipe();
              if (enableAudio) playClick();
            } else if (dy < 0 && onSwipeUp) {
              onSwipeUp();
              if (enableHaptic) haptic.swipe();
              if (enableAudio) playClick();
            }
          }
        }
      }
    },

    // Pinch gesture for scaling
    onPinch: ({ offset: [scale], active }) => {
      if (onPinch) {
        onPinch(scale);
      }
      
      if (enableSpring) {
        api.start({
          scale: active ? scale : 1,
          immediate: active
        });
      }
    },

    // Tap detection (single and double)
    onClick: ({ event }) => {
      event.preventDefault();
      
      if (isLongPressed) {
        isLongPressed = false;
        return;
      }

      tapCount++;
      
      if (enableHaptic) haptic.tap();
      if (enableAudio) playClick();

      if (tapCount === 1) {
        tapTimeout = setTimeout(() => {
          if (tapCount === 1 && onTap) {
            onTap();
          }
          tapCount = 0;
        }, doubleTapTimeout);
      } else if (tapCount === 2) {
        if (tapTimeout) {
          clearTimeout(tapTimeout);
          tapTimeout = null;
        }
        
        if (onDoubleTap) {
          onDoubleTap();
          if (enableHaptic) haptic.selection();
          if (enableAudio) playSuccess();
        }
        
        tapCount = 0;
      }
    },

    // Long press detection
    onPointerDown: () => {
      if (onLongPress) {
        longPressTimeout = setTimeout(() => {
          isLongPressed = true;
          onLongPress();
          if (enableHaptic) haptic.longPress();
          if (enableAudio) playSuccess();
        }, longPressThreshold);
      }
    },

    onPointerUp: () => {
      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
        longPressTimeout = null;
      }
    },

    // Hover effects for desktop
    onHover: ({ hovering }) => {
      if (enableSpring) {
        api.start({
          scale: hovering ? 1.02 : 1,
          opacity: hovering ? 0.9 : 1,
        });
      }
    },

    // Focus effects for accessibility
    onFocus: () => {
      if (enableSpring) {
        api.start({
          scale: 1.02,
          opacity: 0.9,
        });
      }
    },

    onBlur: () => {
      if (enableSpring) {
        api.start({
          scale: 1,
          opacity: 1,
        });
      }
    },
  }, {
    drag: {
      threshold: 10,
      filterTaps: true,
    },
    pinch: {
      scaleBounds: { min: 0.5, max: 3 },
      rubberband: true,
    },
  });

  // Cleanup function
  const cleanup = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      tapTimeout = null;
    }
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      longPressTimeout = null;
    }
    tapCount = 0;
    isLongPressed = false;
  };

  // Reset animation to default state
  const resetAnimation = () => {
    api.start({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
    });
  };

  // Manual trigger functions for programmatic control
  const triggerSwipeLeft = () => {
    if (onSwipeLeft) {
      onSwipeLeft();
      if (enableHaptic) haptic.swipe();
      if (enableAudio) playClick();
    }
  };

  const triggerSwipeRight = () => {
    if (onSwipeRight) {
      onSwipeRight();
      if (enableHaptic) haptic.swipe();
      if (enableAudio) playClick();
    }
  };

  const triggerTap = () => {
    if (onTap) {
      onTap();
      if (enableHaptic) haptic.tap();
      if (enableAudio) playClick();
    }
  };

  return {
    // Gesture binding
    ...gestureHandlers(),
    
    // Animation state
    springs: enableSpring ? springs : undefined,
    
    // Control functions
    cleanup,
    resetAnimation,
    triggerSwipeLeft,
    triggerSwipeRight,
    triggerTap,
    
    // Feedback controls
    haptic: enableHaptic ? haptic : undefined,
  };
};