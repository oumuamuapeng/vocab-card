import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ActionItem {
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: ActionItem[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FloatingActionButton = ({ 
  actions, 
  className,
  size = 'md',
  direction = 'up'
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const getActionPosition = (index: number) => {
    const distance = 70;
    const baseOffset = (index + 1) * distance;
    
    switch (direction) {
      case 'up':
        return { x: 0, y: -baseOffset };
      case 'down':
        return { x: 0, y: baseOffset };
      case 'left':
        return { x: -baseOffset, y: 0 };
      case 'right':
        return { x: baseOffset, y: 0 };
      default:
        return { x: 0, y: -baseOffset };
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Action Items */}
            {actions.map((action, index) => {
              const position = getActionPosition(index);
              const Icon = action.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: position.x,
                    y: position.y
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1
                  }}
                  className="absolute bottom-0 right-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group"
                  >
                    <Button
                      size="sm"
                      className={cn(
                        "w-12 h-12 rounded-full shadow-lg",
                        action.color || "bg-primary hover:bg-primary/90"
                      )}
                      onClick={() => {
                        action.onClick();
                        setIsOpen(false);
                      }}
                    >
                      <Icon size={iconSizes.sm} />
                    </Button>
                    
                    {/* Label Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "absolute right-14 top-1/2 transform -translate-y-1/2",
                        "bg-slate-900 text-white text-xs px-2 py-1 rounded-md",
                        "whitespace-nowrap shadow-lg pointer-events-none",
                        direction === 'left' && "right-auto left-14"
                      )}
                    >
                      {action.label}
                      <div className={cn(
                        "absolute top-1/2 transform -translate-y-1/2",
                        "w-2 h-2 bg-slate-900 rotate-45",
                        direction === 'left' ? "-right-1" : "-left-1"
                      )} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          className={cn(
            sizeClasses[size],
            "rounded-full shadow-xl bg-gradient-to-r from-primary to-primary/80",
            "hover:from-primary/90 hover:to-primary/70",
            "border-2 border-white/20"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X size={iconSizes[size]} />
            ) : (
              <Plus size={iconSizes[size]} />
            )}
          </motion.div>
        </Button>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: isOpen ? [1, 1.5, 1] : 1,
            opacity: isOpen ? [0.5, 0, 0.5] : 0
          }}
          transition={{
            duration: 0.6,
            repeat: isOpen ? Infinity : 0
          }}
        />
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;