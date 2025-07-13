import React, { useState } from 'react';
import { wordFamilies } from '../data/wordFamilies';
import SpaceFamilyCard from '../components/SpaceFamilyCard';
import { WordFamily } from '../types';
import FlipCardPage from './FlipCardPage';
import SpaceBackground from '../components/SpaceBackground';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { useAchievements } from '../hooks/useAchievements';
import '../styles/space-theme.css';

const Home: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<WordFamily | null>(null);
  const { getTotalProgress, getMasteryLevel } = useProgress();
  const { stats, getAchievementStats } = useAchievements();

  const handleFamilySelect = (family: WordFamily) => {
    setSelectedFamily(family);
  };

  const handleBack = () => {
    setSelectedFamily(null);
  };

  // 如果选择了词族，显示翻卡学习页面
  if (selectedFamily) {
    return <FlipCardPage family={selectedFamily} onBack={handleBack} />;
  }

  // 否则，显示词族选择界面
  return (
    <div className="min-h-screen relative overflow-hidden nunito">
      <SpaceBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <nav className="flex items-center justify-between p-6">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center pulse-ring"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-white text-xl">🚀</div>
            </motion.div>
            <div>
              <h1 className="text-3xl orbitron font-bold text-gradient-cyan">
                星际单词探险
              </h1>
              <p className="text-sm text-slate-400">Neural Language Learning System</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-right">
              <div className="text-sm text-slate-400">学习统计</div>
              <div className="text-cyan-400 font-mono">
                <span className="text-lg font-bold">{stats.totalWordsLearned}</span>
                <span className="text-xs ml-1">单词已掌握</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">成就进度</div>
              <div className="text-purple-400 font-mono">
                <span className="text-lg font-bold">{getAchievementStats().unlockedCount}</span>
                <span className="text-xs ml-1">/ {getAchievementStats().totalCount} 成就</span>
              </div>
            </div>
            <motion.div 
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-white">👨‍🚀</div>
            </motion.div>
          </motion.div>
        </nav>

        {/* 主内容区域 */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h2 className="text-5xl orbitron font-bold text-gradient-purple mb-4">
              选择探险区域
            </h2>
            <p className="text-xl text-slate-300">
              每个区域都有独特的单词等待发现
            </p>
            <motion.div 
              className="mt-4 text-sm text-slate-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &gt; 启动神经语言学习系统...
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wordFamilies.map((family, index) => {
                const progress = getTotalProgress(family);
                const masteryLevel = getMasteryLevel(family);
                
                return (
                  <motion.div
                    key={family.id}
                    initial={{ opacity: 0, y: 100, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8 + index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <SpaceFamilyCard
                      family={family}
                      progress={progress}
                      masteryLevel={masteryLevel}
                      onClick={() => handleFamilySelect(family)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Home; 