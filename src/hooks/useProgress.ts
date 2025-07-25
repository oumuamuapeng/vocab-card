import { useState } from 'react';
import { StudyProgress, UserProgress, WordFamily } from '../types';

const STORAGE_KEY = 'vocab-card-progress';

const getInitialProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    familyProgress: {},
    totalWordsLearned: 0,
    lastActive: new Date().toISOString()
  };
};

export const useProgress = (currentFamily?: WordFamily) => {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  // 保存进度到本地存储
  const saveProgress = (newProgress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  // 标记单词为已完成
  const markWordAsCompleted = (word: string) => {
    if (!currentFamily) return;

    const familyId = currentFamily.id;
    const familyProgress = progress.familyProgress[familyId] || {
      familyId,
      completedWords: [],
      masteryLevel: 0,
      lastStudied: new Date().toISOString()
    };

    if (!familyProgress.completedWords.includes(word)) {
      const newFamilyProgress = {
        ...familyProgress,
        completedWords: [...familyProgress.completedWords, word],
        lastStudied: new Date().toISOString()
      };

      // 计算掌握度
      const masteryLevel = Math.min(
        5,
        Math.floor((newFamilyProgress.completedWords.length / currentFamily.words.length) * 5)
      );

      newFamilyProgress.masteryLevel = masteryLevel;

      const newProgress = {
        ...progress,
        familyProgress: {
          ...progress.familyProgress,
          [familyId]: newFamilyProgress
        },
        totalWordsLearned: progress.totalWordsLearned + 1,
        lastActive: new Date().toISOString()
      };

      saveProgress(newProgress);
    }
  };

  // 获取当前词族的进度
  const getCurrentFamilyProgress = (): StudyProgress | null => {
    if (!currentFamily) return null;
    return progress.familyProgress[currentFamily.id] || null;
  };


  // 检查单词是否已完成
  const isWordCompleted = (word: string): boolean => {
    const familyProgress = getCurrentFamilyProgress();
    return familyProgress?.completedWords.includes(word) || false;
  };

  // 获取任意词族的总进度
  const getTotalProgress = (family: WordFamily): number => {
    const familyProgress = progress.familyProgress[family.id];
    if (!familyProgress) return 0;
    return (familyProgress.completedWords.length / family.words.length) * 100;
  };

  // 获取当前学习中的词族的掌握等级
  const getCurrentMasteryLevel = (): number => {
    const familyProgress = getCurrentFamilyProgress();
    return familyProgress?.masteryLevel || 0;
  };

  // 获取任意词族的掌握等级
  const getMasteryLevel = (family: WordFamily): number => {
    const familyProgress = progress.familyProgress[family.id];
    return familyProgress?.masteryLevel || 0;
  };

  return {
    progress,
    markWordAsCompleted,
    getCurrentFamilyProgress,
    getCurrentMasteryLevel,
    getMasteryLevel,
    isWordCompleted,
    getTotalProgress,
  };
}; 