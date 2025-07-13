import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import useAdvancedGestures from '../hooks/useAdvancedGestures';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  enableHover?: boolean;
  enablePress?: boolean;
  glowOnHover?: boolean;
  bounceOnTap?: boolean;
  tiltOnHover?: boolean;
  disabled?: boolean;
}

const InteractiveCard = ({
  children,
  className,
  onTap,
  onDoubleTap,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
  enableHover = true,
  enablePress = true,
  glowOnHover = false,
  bounceOnTap = true,
  tiltOnHover = false,
  disabled = false
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { bind, animated, style, isPressed, dragDirection } = useAdvancedGestures({
    onTap: disabled ? undefined : onTap,
    onDoubleTap: disabled ? undefined : onDoubleTap,
    onSwipeLeft: disabled ? undefined : onSwipeLeft,
    onSwipeRight: disabled ? undefined : onSwipeRight,
    onSwipeUp: disabled ? undefined : onSwipeUp,
    onSwipeDown: disabled ? undefined : onSwipeDown,
    onLongPress: disabled ? undefined : onLongPress,
    enableHaptic: !disabled
  });

  const getSwipeIndicator = () => {
    if (!dragDirection) return null;
    
    const indicators = {
      left: '← ',
      right: ' →',
      up: '↑',
      down: '↓'
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-2 right-2 text-primary font-bold text-lg"
      >
        {indicators[dragDirection]}
      </motion.div>
    );
  };

  const cardVariants = {
    idle: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0
    },
    hover: {
      scale: enableHover ? 1.02 : 1,
      rotateX: tiltOnHover ? 5 : 0,
      rotateY: tiltOnHover ? 5 : 0,
      z: enableHover ? 10 : 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    press: {
      scale: enablePress && bounceOnTap ? 0.98 : 1,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    },
    focus: {
      scale: 1.01,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "relative transition-all duration-200",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      variants={cardVariants}
      initial="idle"
      animate={
        disabled ? "idle" :
        isPressed ? "press" :
        isFocused ? "focus" :
        isHovered ? "hover" : 
        "idle"
      }
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      <animated.div
        {...bind()}
        style={style}
        className="w-full h-full"
      >
        <Card className={cn(
          "relative overflow-hidden transition-all duration-300",
          "border-2 border-transparent",
          isHovered && !disabled && "border-primary/20 shadow-lg",
          isFocused && !disabled && "ring-2 ring-primary/30",
          glowOnHover && isHovered && !disabled && "shadow-[0_0_20px_rgba(var(--primary),0.3)]",
          isPressed && !disabled && "shadow-inner"
        )}>
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isHovered 
                  ? "radial-gradient(circle at center, rgba(var(--primary), 0.1) 0%, transparent 70%)"
                  : "transparent"
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Swipe Direction Indicator */}
          {getSwipeIndicator()}

          {/* Long Press Progress Ring */}
          {isPressed && onLongPress && (
            <motion.div
              className="absolute top-2 left-2 w-6 h-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <svg className="w-full h-full transform -rotate-90">
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>
          )}

          {/* Ripple Effect */}
          {isPressed && !disabled && (
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-lg"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}

          <CardContent className="relative z-10">
            {children}
          </CardContent>
        </Card>
      </animated.div>

      {/* Focus Ring */}
      {isFocused && !disabled && (
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default InteractiveCard;