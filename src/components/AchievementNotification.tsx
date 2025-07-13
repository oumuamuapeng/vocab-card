import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '../hooks/useAchievements';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Star, Trophy, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementNotificationProps {
  achievements: Achievement[];
  onDismiss: () => void;
}

const AchievementNotification = ({ achievements, onDismiss }: AchievementNotificationProps) => {
  if (achievements.length === 0) return null;

  const getRarityIcon = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return <Star size={20} className="text-gray-500" />;
      case 'rare': return <Zap size={20} className="text-blue-500" />;
      case 'epic': return <Trophy size={20} className="text-purple-500" />;
      case 'legendary': return <Crown size={20} className="text-yellow-500" />;
    }
  };

  const getRarityColors = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
    }
  };

  const getRarityBgGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-500/20';
      case 'rare': return 'shadow-blue-500/30';
      case 'epic': return 'shadow-purple-500/40';
      case 'legendary': return 'shadow-yellow-500/50';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onDismiss}
      >
        {/* Background particle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.8
          }}
          className="relative max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="mb-4 last:mb-0"
            >
              <Card className={cn(
                "relative overflow-hidden border-2 shadow-2xl",
                getRarityBgGlow(achievement.rarity)
              )}>
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-20",
                  getRarityColors(achievement.rarity)
                )} />
                
                {/* Animated border */}
                <motion.div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-30",
                    getRarityColors(achievement.rarity)
                  )}
                  animate={{
                    background: [
                      `linear-gradient(0deg, transparent, transparent)`,
                      `linear-gradient(360deg, rgba(255,255,255,0.3), transparent)`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <CardContent className="relative p-6">
                  {/* Close button */}
                  {index === 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={onDismiss}
                    >
                      <X size={14} />
                    </Button>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Achievement Icon */}
                    <motion.div
                      className="flex-shrink-0"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-3xl",
                        "bg-gradient-to-br shadow-lg",
                        getRarityColors(achievement.rarity)
                      )}>
                        {achievement.icon}
                      </div>
                    </motion.div>

                    {/* Achievement Details */}
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        🎉 成就解锁！
                      </motion.h3>
                      
                      <motion.h4
                        className="font-semibold text-slate-800 dark:text-slate-200 mb-2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {achievement.title}
                      </motion.h4>
                      
                      <motion.p
                        className="text-sm text-slate-600 dark:text-slate-400 mb-3"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {achievement.description}
                      </motion.p>

                      <div className="flex items-center justify-between">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "text-white border-0",
                              achievement.rarity === 'common' && 'bg-gray-500',
                              achievement.rarity === 'rare' && 'bg-blue-500',
                              achievement.rarity === 'epic' && 'bg-purple-500',
                              achievement.rarity === 'legendary' && 'bg-yellow-500'
                            )}
                          >
                            <span className="mr-1">{getRarityIcon(achievement.rarity)}</span>
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                        </motion.div>

                        {achievement.unlockedAt && (
                          <motion.p
                            className="text-xs text-slate-500 dark:text-slate-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            {new Date(achievement.unlockedAt).toLocaleString('zh-CN')}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                  style={{
                    transform: 'skewX(-20deg)'
                  }}
                />
              </Card>
            </motion.div>
          ))}

          {/* Bottom action hint */}
          <motion.p
            className="text-center text-white/80 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            点击任意地方继续
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementNotification;