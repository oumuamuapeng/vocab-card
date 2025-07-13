// 音频工具函数

export const createAudioElement = (audioUrl: string): HTMLAudioElement => {
  const audio = new Audio(audioUrl);
  audio.preload = 'auto';
  return audio;
};

export const playAudio = async (audioUrl: string): Promise<void> => {
  try {
    const audio = createAudioElement(audioUrl);
    await audio.play();
  } catch (error) {
    console.error('音频播放失败:', error);
    throw error;
  }
};

export const stopAudio = (audio: HTMLAudioElement): void => {
  audio.pause();
  audio.currentTime = 0;
};

// 模拟音频播放（用于开发阶段）
export const playMockAudio = (word: string): void => {
  console.log(`播放音频: ${word}`);
  // 这里可以集成TTS服务
};

// 检查浏览器是否支持音频
export const isAudioSupported = (): boolean => {
  return typeof Audio !== 'undefined';
}; 