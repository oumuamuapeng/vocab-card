import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star, Rocket, Waves, TreePine, Sun } from 'lucide-react';

interface SpaceFamilyCardProps {
  family: {
    id: string;
    name: string;
    rime: string;
    description: string;
    words: any[];
  };
  progress: number;
  masteryLevel: number;
  onClick: () => void;
  className?: string;
}

const SpaceFamilyCard = ({
  family,
  progress,
  masteryLevel,
  onClick,
  className
}: SpaceFamilyCardProps) => {
  // 根据family id获取主题配色
  const getThemeConfig = (id: string) => {
    const themes = {
      'ap': {
        gradient: 'from-cyan-500 via-blue-500 to-purple-500',
        icon: <Rocket className="w-8 h-8" />,
        bgGlow: 'rgba(0, 245, 255, 0.2)',
        borderColor: 'rgba(0, 245, 255, 0.3)',
        environment: '太空探索'
      },
      'at': {
        gradient: 'from-purple-500 via-pink-500 to-red-500',
        icon: <Waves className="w-8 h-8" />,
        bgGlow: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        environment: '深海奥秘'
      },
      'an': {
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        icon: <TreePine className="w-8 h-8" />,
        bgGlow: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        environment: '丛林探险'
      },
      'ad': {
        gradient: 'from-yellow-500 via-orange-500 to-red-500',
        icon: <Sun className="w-8 h-8" />,
        bgGlow: 'rgba(251, 191, 36, 0.2)',
        borderColor: 'rgba(251, 191, 36, 0.3)',
        environment: '沙漠奇观'
      }
    };
    return themes[id as keyof typeof themes] || themes.ap;
  };

  const theme = getThemeConfig(family.id);
  const completionRate = Math.round(progress);
  const isCompleted = completionRate >= 100;

  return (
    <motion.div
      className={cn("relative group cursor-pointer", className)}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* 背景发光效果 */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"
        style={{
          background: `linear-gradient(45deg, ${theme.bgGlow}, rgba(255, 255, 255, 0.1))`
        }}
        animate={{
          background: [
            `linear-gradient(45deg, ${theme.bgGlow}, rgba(255, 255, 255, 0.1))`,
            `linear-gradient(225deg, ${theme.bgGlow}, rgba(255, 255, 255, 0.1))`,
            `linear-gradient(45deg, ${theme.bgGlow}, rgba(255, 255, 255, 0.1))`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* 主卡片 */}
      <div 
        className="relative rounded-2xl p-6 hologram overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          border: `1px solid ${theme.borderColor}`
        }}
      >
        {/* 神经网络背景 */}
        <div className="absolute inset-0 neural-grid opacity-20" />
        
        {/* 数据流动画 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60">
          <motion.div
            className="h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ['-100px', '400px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* 完成状态徽章 */}
        {isCompleted && (
          <motion.div
            className="absolute top-4 right-4 achievement-badge w-8 h-8 rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <Star size={16} className="text-white fill-white" />
          </motion.div>
        )}

        {/* 图标区域 */}
        <motion.div 
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.gradient} p-3 mb-4 flex items-center justify-center floating`}
          whileHover={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white">
            {theme.icon}
          </div>
        </motion.div>

        {/* 标题区域 */}
        <div className="mb-4">
          <h3 className="text-2xl orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            -{family.rime} 词族
          </h3>
          <h4 className="text-lg font-semibold text-slate-200 mb-1">
            {family.name}
          </h4>
          <Badge variant="secondary" className="text-xs bg-slate-700/50 text-cyan-400 border-cyan-400/30">
            {theme.environment}
          </Badge>
        </div>

        {/* 描述 */}
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          {family.description}
        </p>

        {/* 统计信息 */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-slate-400">
            {family.words.length} 个单词
          </span>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={12}
                className={cn(
                  "transition-all duration-300",
                  index < masteryLevel
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-600"
                )}
              />
            ))}
          </div>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">学习进度</span>
            <span className="text-cyan-400 font-bold">{completionRate}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`skill-bar h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            {/* 进度条发光效果 */}
            <div 
              className="absolute inset-0 rounded-full blur-sm opacity-50 pointer-events-none"
              style={{
                background: `linear-gradient(to right, transparent ${completionRate}%, ${theme.bgGlow} ${completionRate}%, transparent ${Math.min(completionRate + 10, 100)}%)`
              }}
            />
          </div>
        </div>

        {/* 悬停时的额外信息 */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="text-center">
            <div className="text-cyan-400 text-sm font-medium orbitron">
              开始探险
            </div>
            <div className="text-xs text-slate-400">
              点击进入学习
            </div>
          </div>
        </motion.div>

        {/* 装饰性粒子效果 */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
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
      </div>
    </motion.div>
  );
};

export default SpaceFamilyCard;