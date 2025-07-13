import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Volume2, RotateCcw, Star, Zap } from 'lucide-react';

interface SpaceCardProps {
  word: string;
  translation: string;
  phonetic: string;
  examples: Array<{ en: string; zh: string }>;
  icon: string;
  isFlipped: boolean;
  onFlip: () => void;
  onPronounce: (text: string) => void;
  isCompleted?: boolean;
  className?: string;
}

const SpaceCard = ({
  word,
  translation,
  phonetic,
  examples,
  icon,
  isFlipped,
  onFlip,
  onPronounce,
  isCompleted = false,
  className
}: SpaceCardProps) => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
  };

  return (
    <div className={cn("relative w-full h-96", className)}>
      {/* 背景发光效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-75" />
      
      {/* 主卡片容器 */}
      <motion.div
        className="card-3d relative w-full h-full cursor-pointer"
        onClick={onFlip}
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* 正面 - 单词显示 */}
        <motion.div 
          className="card-face absolute inset-0 rounded-2xl p-8 flex flex-col justify-center items-center"
          style={{ 
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            border: '1px solid rgba(0, 245, 255, 0.3)'
          }}
        >
          {/* 装饰性网格 */}
          <div className="absolute inset-0 neural-grid opacity-30 rounded-2xl" />
          
          {/* 成就状态指示器 */}
          {isCompleted && (
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Star size={16} className="text-white fill-white" />
            </motion.div>
          )}

          {/* 单词图标 */}
          <motion.div
            className="text-8xl mb-6 floating"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>

          {/* 单词文本 */}
          <motion.h2
            className="text-5xl orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 text-neon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {word}
          </motion.h2>

          {/* 音标 */}
          <motion.p
            className="text-xl text-slate-300 font-mono mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {phonetic}
          </motion.p>

          {/* 中文翻译 */}
          <motion.p
            className="text-2xl text-slate-200 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {translation}
          </motion.p>

          {/* 发音按钮 */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onPronounce(word);
            }}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center btn-space group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 size={20} className="text-white group-hover:animate-pulse" />
          </motion.button>

          {/* 翻转提示 */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-slate-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <RotateCcw size={16} />
            <span>点击翻转查看例句</span>
          </motion.div>
        </motion.div>

        {/* 背面 - 例句显示 */}
        <motion.div 
          className="card-face absolute inset-0 rounded-2xl p-8 flex flex-col justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 50%, #0f3460 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}
        >
          {/* 装饰性网格 */}
          <div className="absolute inset-0 neural-grid opacity-20 rounded-2xl" />

          {/* 例句标题 */}
          <motion.h3
            className="text-3xl orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            例句学习
          </motion.h3>

          {/* 例句内容 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExampleIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              {/* 英文例句 */}
              <div className="relative p-4 rounded-lg hologram">
                <p className="text-xl text-slate-100 font-medium leading-relaxed">
                  {examples[currentExampleIndex]?.en}
                </p>
                {/* 数据流效果 */}
                <div className="data-stream" />
              </div>

              {/* 中文翻译 */}
              <div className="relative p-4 rounded-lg bg-slate-800/50 border border-purple-500/30">
                <p className="text-lg text-slate-300">
                  {examples[currentExampleIndex]?.zh}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 控制按钮区域 */}
          <div className="flex justify-between items-center mt-8">
            {/* 发音按钮 */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPronounce(examples[currentExampleIndex]?.en);
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center btn-space group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 size={20} className="text-white group-hover:animate-pulse" />
            </motion.button>

            {/* 例句切换 */}
            {examples.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  nextExample();
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-700/50 border border-cyan-500/30 text-cyan-400 hover:bg-slate-600/50 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={16} />
                <span className="text-sm">
                  {currentExampleIndex + 1}/{examples.length}
                </span>
              </motion.button>
            )}
          </div>

          {/* 返回提示 */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-slate-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <RotateCcw size={16} />
            <span>点击返回单词</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 外部装饰环 */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)',
        }}
        animate={{
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)',
            'linear-gradient(225deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default SpaceCard;