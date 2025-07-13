import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      {/* 神经网络加载动画 */}
      <div className="relative">
        {/* 外圈 - 神经网络 */}
        <motion.div
          className={cn(
            "border-2 border-slate-700 rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* 中圈 - 能量环 */}
        <motion.div
          className={cn(
            "absolute top-1 left-1 border-2 border-cyan-400/50 border-t-cyan-400 rounded-full",
            size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-12 h-12' : 'w-20 h-20'
          )}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.5))'
          }}
        />
        
        {/* 内圈 - 核心 */}
        <motion.div
          className={cn(
            "absolute top-2 left-2 border-2 border-purple-400/50 border-b-purple-400 rounded-full",
            size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-8 h-8' : 'w-16 h-16'
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))'
          }}
        />
        
        {/* 中心点 */}
        <motion.div
          className={cn(
            "absolute bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full",
            size === 'sm' ? 'w-2 h-2 top-3 left-3' : size === 'md' ? 'w-4 h-4 top-6 left-6' : 'w-8 h-8 top-10 left-10'
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(0, 245, 255, 0.8))'
          }}
        />
      </div>

      {/* 数据流点点 */}
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 4px currentColor)'
            }}
          />
        ))}
      </div>

      {text && (
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-cyan-400 font-mono text-sm mb-1">
            {text}
          </p>
          <motion.p
            className="text-xs text-slate-400 font-mono loading-dots"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            NEURAL NETWORK LOADING
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;