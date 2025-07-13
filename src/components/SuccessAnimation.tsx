import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessAnimationProps {
  show: boolean;
  type?: 'word' | 'level' | 'achievement';
  onComplete?: () => void;
  message?: string;
}

const SuccessAnimation = ({ 
  show, 
  type = 'word', 
  onComplete, 
  message 
}: SuccessAnimationProps) => {
  const getIcon = () => {
    switch (type) {
      case 'word':
        return <CheckCircle size={48} className="text-green-500" />;
      case 'level':
        return <Trophy size={48} className="text-yellow-500" />;
      case 'achievement':
        return <Star size={48} className="text-purple-500 fill-purple-500" />;
      default:
        return <CheckCircle size={48} className="text-green-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'word':
        return 'from-green-400 to-emerald-600';
      case 'level':
        return 'from-yellow-400 to-orange-600';
      case 'achievement':
        return 'from-purple-400 to-pink-600';
      default:
        return 'from-green-400 to-emerald-600';
    }
  };

  const getMessage = () => {
    if (message) return message;
    switch (type) {
      case 'word':
        return '单词学会了！';
      case 'level':
        return '词族完成！';
      case 'achievement':
        return '获得成就！';
      default:
        return '太棒了！';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={onComplete}
        >
          {/* 背景粒子效果 */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* 主要动画卡片 */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              duration: 0.8
            }}
            className={cn(
              "relative p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4",
              "bg-gradient-to-br", getColors(),
              "text-white"
            )}
          >
            {/* 光圈效果 */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-white/20"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* 顶部装饰星星 */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={24} className="text-yellow-300" />
              </motion.div>
            </div>

            {/* 主图标 */}
            <motion.div
              className="mb-4"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {getIcon()}
            </motion.div>

            {/* 成功消息 */}
            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getMessage()}
            </motion.h2>

            {/* 鼓励文字 */}
            <motion.p
              className="text-white/90 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              继续加油！你做得很棒！
            </motion.p>

            {/* 底部星星装饰 */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Star size={12} className="text-yellow-300 fill-yellow-300" />
                </motion.div>
              ))}
            </div>

            {/* 提示文字 */}
            <motion.p
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-xs whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              点击任意地方继续
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;