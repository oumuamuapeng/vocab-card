import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WordFamily, WordInFamily } from '../types';
import { useEnhancedAudio } from '../hooks/useEnhancedAudio';
import { useProgress } from '../hooks/useProgress';
import { useHapticFeedback } from '../lib/hapticFeedback';
import { useAchievements } from '../hooks/useAchievements';
import SuccessAnimation from '../components/SuccessAnimation';
import AchievementNotification from '../components/AchievementNotification';
import SpaceCard from '../components/SpaceCard';
import SpaceBackground from '../components/SpaceBackground';
import FloatingActionButton from '../components/FloatingActionButton';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import '../styles/space-theme.css';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw, 
  Star, 
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Repeat,
  Trophy,
  Home,
  BarChart3,
  Target,
  Brain,
  Play
} from 'lucide-react';

interface FlipCardPageProps {
  family: WordFamily;
  onBack: () => void;
}

const FlipCardPage: React.FC<FlipCardPageProps> = ({ family, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showWordSuccess, setShowWordSuccess] = useState(false);
  const [showLevelSuccess, setShowLevelSuccess] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const { pronounceWord, playSuccess, playComplete } = useEnhancedAudio();
  const { markWordAsCompleted, getCurrentMasteryLevel, isWordCompleted } = useProgress(family);
  const haptic = useHapticFeedback();
  const {
    achievements,
    stats,
    newAchievements,
    markAchievementsAsViewed,
    incrementWordsLearned,
    incrementFamiliesCompleted,
    startSession,
    getAchievementStats
  } = useAchievements();

  const currentWord: WordInFamily = family.words[currentIndex];
  const masteryLevel = getCurrentMasteryLevel();
  const isCompleted = isWordCompleted(currentWord.word);
  const allCompleted = family.words.every(word => isWordCompleted(word.word));

  // Start session on mount
  useEffect(() => {
    startSession();
  }, [startSession]);

  // Show new achievements
  useEffect(() => {
    if (newAchievements.length > 0) {
      setShowAchievements(true);
    }
  }, [newAchievements]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && isFlipped && currentWord) {
      const timer = setTimeout(() => {
        pronounceWord(currentWord.word);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isFlipped, currentWord, pronounceWord]);

  const handleNext = async () => {
    if (isFlipped && !isCompleted) {
      markWordAsCompleted(currentWord.word);
      incrementWordsLearned();
      setShowWordSuccess(true);
      await playSuccess();
      haptic.wordComplete();
      return;
    }
    
    const nextIndex = (currentIndex + 1) % family.words.length;
    setCurrentIndex(nextIndex);
    setIsFlipped(false);
    
    if (nextIndex === 0 && allCompleted) {
      incrementFamiliesCompleted();
      setShowLevelSuccess(true);
      await playComplete();
      haptic.levelComplete();
    }
  };

  const handleWordSuccess = () => {
    setShowWordSuccess(false);
    const nextIndex = (currentIndex + 1) % family.words.length;
    setCurrentIndex(nextIndex);
    setIsFlipped(false);
  };

  const handleLevelSuccess = () => {
    setShowLevelSuccess(false);
    // 可以添加返回首页或其他逻辑
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + family.words.length) % family.words.length);
    setIsFlipped(false);
  };

  const handleFlip = async () => {
    haptic.cardFlip();
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      await pronounceWord(currentWord.word);
    }
  };


  const shuffleWords = () => {
    const randomIndex = Math.floor(Math.random() * family.words.length);
    if (randomIndex !== currentIndex) {
      setCurrentIndex(randomIndex);
      setIsFlipped(false);
    }
  };

  const completionRate = (family.words.filter(w => isWordCompleted(w.word)).length / family.words.length) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden nunito">
      <SpaceBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <motion.nav 
          className="flex items-center justify-between p-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur border border-cyan-400/30 flex items-center justify-center btn-space group"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-cyan-400 group-hover:text-white transition" />
            </motion.button>
            
            <div>
              <h1 className="text-2xl orbitron font-bold text-gradient-cyan">
                {family.name}
              </h1>
              <p className="text-sm text-slate-400 font-mono">
                {family.words.length} 个单词等待探索
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* 掌握等级星星 */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <Star 
                    size={20} 
                    className={cn(
                      "transition-all duration-300",
                      index < masteryLevel 
                        ? "text-yellow-400 fill-yellow-400 glow-success" 
                        : "text-slate-600"
                    )}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* 进度显示 */}
            <div className="text-right">
              <div className="text-sm text-slate-400">任务进度</div>
              <div className="text-cyan-400 font-mono text-lg font-bold">
                {Math.round(completionRate)}%
              </div>
            </div>
          </div>
        </motion.nav>

        {/* 进度环 */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <svg className="w-32 h-32 progress-ring">
              <circle 
                cx="64" 
                cy="64" 
                r="40" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="4" 
                fill="none"
              />
              <motion.circle 
                cx="64" 
                cy="64" 
                r="40" 
                stroke="url(#progressGradient)" 
                strokeWidth="4" 
                fill="none" 
                className="progress-ring__circle"
                style={{
                  strokeDashoffset: 251.2 - (251.2 * completionRate / 100)
                }}
                animate={{
                  strokeDashoffset: 251.2 - (251.2 * completionRate / 100)
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ff006e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold orbitron text-cyan-400">
                  {currentIndex + 1}/{family.words.length}
                </div>
                <div className="text-xs text-slate-400">单词</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 主内容区域 */}
        <main className="flex-1 flex items-center justify-center px-6 py-8 mt-16">
          <div className="w-full max-w-4xl">
            {/* 学习卡片 */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <SpaceCard
                word={currentWord.word}
                translation={currentWord.meaning}
                phonetic={currentWord.phonetic}
                examples={currentWord.examples}
                icon={currentWord.icon}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onPronounce={pronounceWord}
                isCompleted={isCompleted}
              />
                </motion.div>

            {/* 控制按钮 */}
            <motion.div 
              className="flex justify-center items-center space-x-8 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-16 h-16 rounded-full bg-slate-800/50 backdrop-blur border border-cyan-400/30 flex items-center justify-center btn-space group disabled:opacity-30 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} className="text-cyan-400 group-hover:text-white transition" />
              </motion.button>
              
              <motion.button
                onClick={handleFlip}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold orbitron pulse-ring"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RotateCcw size={28} />
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                disabled={currentIndex === family.words.length - 1 && isCompleted}
                className={cn(
                  "w-16 h-16 rounded-full bg-slate-800/50 backdrop-blur border flex items-center justify-center btn-space group disabled:opacity-30 disabled:cursor-not-allowed",
                  isFlipped && !isCompleted ? "border-green-400/50 glow-success" : "border-cyan-400/30"
                )}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} className={cn(
                  "transition",
                  isFlipped && !isCompleted ? "text-green-400" : "text-cyan-400 group-hover:text-white"
                )} />
              </motion.button>
            </motion.div>

            {/* 技能面板 */}
            <motion.div 
              className="relative bg-slate-800/50 backdrop-blur rounded-2xl border border-cyan-400/30 p-6 hologram"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h4 className="text-xl orbitron font-bold text-gradient-purple mb-6 text-center">
                探险区域掌揧度
              </h4>
              
              <div className="space-y-6">
                {/* 识别技能 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Target size={16} className="text-cyan-400" />
                      <span className="text-slate-300">识别精度</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold">
                      {Math.min(100, (currentIndex + 1) * 20)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="skill-bar bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentIndex + 1) * 20)}%` }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* 发音技能 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Volume2 size={16} className="text-purple-400" />
                      <span className="text-slate-300">发音技巧</span>
                    </div>
                    <span className="text-purple-400 font-mono font-bold">
                      {Math.min(100, (currentIndex + 1) * 15)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="skill-bar bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentIndex + 1) * 15)}%` }}
                      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* 理解深度 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Brain size={16} className="text-pink-400" />
                      <span className="text-slate-300">理解深度</span>
                    </div>
                    <span className="text-pink-400 font-mono font-bold">
                      {Math.min(100, masteryLevel * 20)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="skill-bar bg-gradient-to-r from-pink-500 to-red-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, masteryLevel * 20)}%` }}
                      transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
              
              {/* 装饰性数据流 */}
              <div className="data-stream" />
            </motion.div>
          </div>
        </main>

        {/* 悬浮动作按钮 */}
        <FloatingActionButton
          actions={[
            {
              icon: Home,
              label: '返回主页',
              onClick: onBack,
              color: 'bg-slate-600 hover:bg-slate-700'
            },
            {
              icon: Trophy,
              label: '查看成就',
              onClick: () => setShowAchievements(true)
            },
            {
              icon: BarChart3,
              label: '学习统计',
              onClick: () => setShowStats(true)
            },
            {
              icon: Shuffle,
              label: '随机切换',
              onClick: shuffleWords
            },
            {
              icon: autoPlay ? Repeat : Play,
              label: autoPlay ? '关闭自动' : '自动播放',
              onClick: () => setAutoPlay(!autoPlay),
              color: autoPlay ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }
          ]}
        />

        {/* 成功动画 */}
        <SuccessAnimation
          show={showWordSuccess}
          type="word"
          onComplete={handleWordSuccess}
          message={`${currentWord.word} 学会了！`}
        />

        <SuccessAnimation
          show={showLevelSuccess}
          type="level"
          onComplete={handleLevelSuccess}
          message={`${family.name} 完成！`}
        />

      {/* Achievement Notifications */}
      {showAchievements && (
        <AchievementNotification
          achievements={newAchievements.length > 0 ? newAchievements : achievements.filter(a => a.unlocked)}
          onDismiss={() => {
            setShowAchievements(false);
            if (newAchievements.length > 0) {
              markAchievementsAsViewed();
            }
          }}
        />
      )}

      {/* Learning Stats Modal */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowStats(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">学习统计</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>学会的单词：</span>
                <span className="font-medium">{stats.totalWordsLearned}</span>
              </div>
              <div className="flex justify-between">
                <span>完成的词族：</span>
                <span className="font-medium">{stats.totalFamiliesCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span>当前连击：</span>
                <span className="font-medium">{stats.currentStreak} 天</span>
              </div>
              <div className="flex justify-between">
                <span>最高连击：</span>
                <span className="font-medium">{stats.maxStreak} 天</span>
              </div>
              <div className="flex justify-between">
                <span>学习会话：</span>
                <span className="font-medium">{stats.totalSessions}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between mb-2">
                  <span>成就进度：</span>
                  <span className="font-medium">
                    {getAchievementStats().unlockedCount} / {getAchievementStats().totalCount}
                  </span>
                </div>
                <Progress value={getAchievementStats().completionRate} className="h-2" />
              </div>
            </div>
            <Button className="w-full mt-4" onClick={() => setShowStats(false)}>
              关闭
            </Button>
          </motion.div>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default FlipCardPage;