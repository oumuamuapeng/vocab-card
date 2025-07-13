export interface Example {
  en: string;      // 英文例句
  zh: string;      // 中文翻译
}

export interface WordInFamily {
  prefix: string;
  word: string;
  icon: string;
  image: string;    // 实物图片URL
  phonetic: string; // 音标
  meaning: string;  // 中文含义
  partOfSpeech: string; // 词性
  examples: Example[];  // 多个例句
  relatedWords: string[];  // 相关单词
  strokeOrder: string[]; // SVG路径数组，用于笔画动画
}

export interface WordFamily {
  id: string;
  name: string;
  rime: string;
  icon: string; // 每个词族也可以有一个代表性图标
  words: WordInFamily[];
}

export interface StudyProgress {
  familyId: string;
  completedWords: string[];
  masteryLevel: number; // 0-5 stars
  lastStudied: string; // ISO date string
}

export interface UserProgress {
  familyProgress: Record<string, StudyProgress>;
  totalWordsLearned: number;
  lastActive: string; // ISO date string
} 