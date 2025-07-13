import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { useState, useCallback, useRef } from 'react';
import { useHapticFeedback } from '../lib/hapticFeedback';

export interface GestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
  swipeThreshold?: number;
  longPressThreshold?: number;
  enableHaptic?: boolean;
}

export const useAdvancedGestures = (config: GestureConfig = {}) => {
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
    enableHaptic = true
  } = config;

  const haptic = useHapticFeedback();
  const [isPressed, setIsPressed] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);
  const lastTapTime = useRef(0);
  const longPressTimer = useRef<NodeJS.Timeout>();

  // Spring animation for visual feedback
  const [{ x, y, scale, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    config: { tension: 300, friction: 30 }
  }));

  const resetAnimation = useCallback(() => {
    api.start({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0
    });
    setIsPressed(false);
    setDragDirection(null);
  }, [api]);

  const bind = useGesture({
    onDrag: ({ offset: [ox, oy], down, movement: [mx, my] }) => {
      if (down) {
        setIsPressed(true);
        
        // Determine swipe direction based on movement
        const absX = Math.abs(mx);
        const absY = Math.abs(my);
        
        if (absX > absY && absX > 20) {
          setDragDirection(mx > 0 ? 'right' : 'left');
        } else if (absY > absX && absY > 20) {
          setDragDirection(my > 0 ? 'down' : 'up');
        }

        // Apply visual feedback during drag
        api.start({
          x: ox * 0.3, // Reduced movement for subtlety
          y: oy * 0.3,
          scale: 1.02,
          rotate: ox * 0.1
        });
      } else {
        // Check for swipe gestures
        const absX = Math.abs(ox);
        const absY = Math.abs(oy);
        
        if (absX > swipeThreshold || absY > swipeThreshold) {
          if (enableHaptic) haptic.swipe();
          
          if (absX > absY) {
            // Horizontal swipe
            if (ox > 0 && onSwipeRight) {
              onSwipeRight();
            } else if (ox < 0 && onSwipeLeft) {
              onSwipeLeft();
            }
          } else {
            // Vertical swipe
            if (oy > 0 && onSwipeDown) {
              onSwipeDown();
            } else if (oy < 0 && onSwipeUp) {
              onSwipeUp();
            }
          }
        }
        
        resetAnimation();
      }
    },

    onPinch: ({ offset: [scale] }) => {
      if (onPinch) {
        onPinch(scale);
      }
      api.start({ scale: 1 + scale * 0.1 });
    },

    onClick: () => {
      const now = Date.now();
      const timeDiff = now - lastTapTime.current;
      
      if (timeDiff < 300 && onDoubleTap) {
        // Double tap detected
        if (enableHaptic) haptic.tap();
        onDoubleTap();
        lastTapTime.current = 0; // Reset to prevent triple tap
      } else {
        // Single tap
        lastTapTime.current = now;
        setTimeout(() => {
          if (lastTapTime.current === now && onTap) {
            if (enableHaptic) haptic.tap();
            onTap();
          }
        }, 300);
      }
    },

    onPointerDown: () => {
      setIsPressed(true);
      api.start({ scale: 0.98 });
      
      // Start long press timer
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          if (enableHaptic) haptic.longPress();
          onLongPress();
        }, longPressThreshold);
      }
    },

    onPointerUp: () => {
      setIsPressed(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      
      setTimeout(() => {
        api.start({ scale: 1 });
      }, 100);
    }
  });

  return {
    bind,
    animated,
    style: { x, y, scale, rotate },
    isPressed,
    dragDirection,
    resetAnimation
  };
};

export default useAdvancedGestures;