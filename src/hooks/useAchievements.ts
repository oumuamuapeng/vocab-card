import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: LearningStats) => boolean;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LearningStats {
  totalWordsLearned: number;
  totalFamiliesCompleted: number;
  currentStreak: number;
  maxStreak: number;
  totalStudyTime: number; // in minutes
  perfectDays: number;
  totalSessions: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_word',
    title: '初来乍到',
    description: '学会第一个单词',
    icon: '🌟',
    condition: (stats) => stats.totalWordsLearned >= 1,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'word_collector',
    title: '单词收集家',
    description: '学会10个单词',
    icon: '📚',
    condition: (stats) => stats.totalWordsLearned >= 10,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'family_master',
    title: '词族大师',
    description: '完成第一个词族',
    icon: '👑',
    condition: (stats) => stats.totalFamiliesCompleted >= 1,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'streak_starter',
    title: '连击新手',
    description: '连续学习3天',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 3,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'word_master',
    title: '单词大师',
    description: '学会25个单词',
    icon: '🎓',
    condition: (stats) => stats.totalWordsLearned >= 25,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'perfect_week',
    title: '完美一周',
    description: '连续学习7天',
    icon: '💎',
    condition: (stats) => stats.currentStreak >= 7,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'vocabulary_legend',
    title: '词汇传奇',
    description: '学会所有单词',
    icon: '🏆',
    condition: (stats) => stats.totalWordsLearned >= 100, // 假设总共100个单词
    unlocked: false,
    rarity: 'legendary'
  }
];

const STORAGE_KEY = 'vocab-card-achievements';
const STATS_KEY = 'vocab-card-stats';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<LearningStats>({
    totalWordsLearned: 0,
    totalFamiliesCompleted: 0,
    currentStreak: 0,
    maxStreak: 0,
    totalStudyTime: 0,
    perfectDays: 0,
    totalSessions: 0
  });
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // 加载成就和统计数据
  useEffect(() => {
    const savedAchievements = localStorage.getItem(STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_KEY);

    if (savedAchievements) {
      try {
        const parsed = JSON.parse(savedAchievements);
        // 合并保存的数据和原始模板，确保 condition 函数不丢失
        const mergedAchievements = ACHIEVEMENTS.map(achievement => {
          const saved = parsed.find((p: any) => p.id === achievement.id);
          return saved ? { ...achievement, ...saved, condition: achievement.condition } : achievement;
        });
        setAchievements(mergedAchievements);
      } catch (error) {
        console.error('Failed to parse achievements:', error);
        setAchievements(ACHIEVEMENTS);
      }
    } else {
      setAchievements(ACHIEVEMENTS);
    }

    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setStats(parsed);
      } catch (error) {
        console.error('Failed to parse stats:', error);
      }
    }
  }, []);

  // 保存数据
  const saveAchievements = (newAchievements: Achievement[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAchievements));
    setAchievements(newAchievements);
  };

  const saveStats = (newStats: LearningStats) => {
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    setStats(newStats);
  };

  // 更新统计数据
  const updateStats = (updates: Partial<LearningStats>) => {
    const newStats = { ...stats, ...updates };
    saveStats(newStats);
    checkAchievements(newStats);
  };

  // 检查成就解锁
  const checkAchievements = (currentStats: LearningStats) => {
    const unlockedAchievements: Achievement[] = [];
    
    const updatedAchievements = achievements.map(achievement => {
      if (!achievement.unlocked && achievement.condition(currentStats)) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        };
        unlockedAchievements.push(unlockedAchievement);
        return unlockedAchievement;
      }
      return achievement;
    });

    if (unlockedAchievements.length > 0) {
      saveAchievements(updatedAchievements);
      setNewAchievements(unlockedAchievements);
    }
  };

  // 标记新成就为已查看
  const markAchievementsAsViewed = () => {
    setNewAchievements([]);
  };

  // 增加学习单词数
  const incrementWordsLearned = () => {
    updateStats({
      totalWordsLearned: stats.totalWordsLearned + 1
    });
  };

  // 增加完成词族数
  const incrementFamiliesCompleted = () => {
    updateStats({
      totalFamiliesCompleted: stats.totalFamiliesCompleted + 1
    });
  };

  // 更新学习连击
  const updateStreak = (newStreak: number) => {
    updateStats({
      currentStreak: newStreak,
      maxStreak: Math.max(stats.maxStreak, newStreak)
    });
  };

  // 增加学习时间
  const addStudyTime = (minutes: number) => {
    updateStats({
      totalStudyTime: stats.totalStudyTime + minutes
    });
  };

  // 开始新的学习会话
  const startSession = () => {
    updateStats({
      totalSessions: stats.totalSessions + 1
    });
  };

  // 获取成就统计
  const getAchievementStats = () => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const completionRate = (unlockedCount / totalCount) * 100;

    const rarityStats = achievements.reduce((acc, achievement) => {
      if (achievement.unlocked) {
        acc[achievement.rarity] = (acc[achievement.rarity] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      unlockedCount,
      totalCount,
      completionRate,
      rarityStats
    };
  };

  return {
    achievements,
    stats,
    newAchievements,
    markAchievementsAsViewed,
    incrementWordsLearned,
    incrementFamiliesCompleted,
    updateStreak,
    addStudyTime,
    startSession,
    getAchievementStats
  };
};