import React, { useState, useEffect } from 'react';
import { WordFamily, WordInFamily } from '../types';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import StrokeAnimation from '../components/StrokeAnimation';

interface FlipCardPageProps {
  family: WordFamily;
  onBack: () => void;
}

const FlipCardPage: React.FC<FlipCardPageProps> = ({ family, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const { isReady, speak } = useSpeechSynthesis();
  const { markWordAsCompleted, getMasteryLevel, isWordCompleted } = useProgress(family);

  const currentWord: WordInFamily = family.words[currentIndex];

  useEffect(() => {
    if (isReady && currentWord && !isFlipped) {
      speak(currentWord.word);
    }
  }, [currentIndex, isReady, speak, currentWord, isFlipped]);

  const handleNext = () => {
    if (isFlipped) {
      markWordAsCompleted(currentWord.word);
    }
    setIsFlipped(false);
    setShowExample(false);
    setCurrentExampleIndex(0);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % family.words.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setShowExample(false);
    setCurrentExampleIndex(0);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + family.words.length) % family.words.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      speak(currentWord.word);
    }
  };

  const handleExampleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showExample) {
      setCurrentExampleIndex((prev) => (prev + 1) % currentWord.examples.length);
    } else {
      setShowExample(true);
    }
    speak(currentWord.examples[currentExampleIndex].en);
  };

  const masteryLevel = getMasteryLevel();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-blue-50">
      <div className="absolute top-4 left-4">
        <button onClick={onBack} className="cute-button bg-secondary-500 hover:bg-secondary-600">
          ← 返回
        </button>
      </div>

      {/* 进度显示 */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="text-yellow-500 text-2xl">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={index < masteryLevel ? 'text-yellow-500' : 'text-gray-300'}>
              ⭐
            </span>
          ))}
        </div>
        <div className="text-gray-600 font-cute">
          {family.words.filter(w => isWordCompleted(w.word)).length} / {family.words.length}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
        {/* 图标和图片显示区域 */}
        <div className="flex items-center justify-center space-x-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`icon-${currentIndex}`}
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <i className={`${currentWord.icon} text-8xl ${isWordCompleted(currentWord.word) ? 'text-green-500' : 'text-yellow-500'}`}></i>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, x: 50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="w-32 h-32 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={currentWord.image}
                alt={currentWord.word}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 翻卡核心区域 */}
        <motion.div 
          className="w-full bg-white rounded-2xl shadow-xl p-8 cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isFlipped ? 'back' : 'front'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
            >
              {isFlipped ? (
                <>
                  <div className="text-8xl font-bold text-blue-500 mb-4">
                    {currentWord.word}
                  </div>
                  <div className="flex items-center space-x-2 text-2xl text-gray-600">
                    <span className="font-mono">{currentWord.phonetic}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {currentWord.partOfSpeech}
                    </span>
                  </div>
                  <div className="text-3xl text-gray-800 mt-2">
                    {currentWord.meaning}
                  </div>
                  <div className="mt-4 space-y-4 w-full">
                    <button
                      onClick={handleExampleClick}
                      className="w-full p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {showExample ? (
                        <div className="space-y-2">
                          <p className="text-blue-800">{currentWord.examples[currentExampleIndex].en}</p>
                          <p className="text-gray-600">{currentWord.examples[currentExampleIndex].zh}</p>
                          <p className="text-sm text-gray-400">
                            点击查看下一个例句 ({currentExampleIndex + 1}/{currentWord.examples.length})
                          </p>
                        </div>
                      ) : (
                        <span className="text-blue-600">点击查看例句</span>
                      )}
                    </button>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentWord.relatedWords.map((word, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <StrokeAnimation
                        strokes={currentWord.strokeOrder}
                        size={200}
                        duration={1.5}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex text-8xl font-bold">
                  <span className="text-gray-800 pr-2">{currentWord.prefix}</span>
                  <span className="text-red-500">{family.rime}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center w-full px-4">
          <button 
            onClick={handlePrevious} 
            className="cute-button text-4xl"
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <div className="text-xl text-gray-600 font-cute">
            {currentIndex + 1} / {family.words.length}
          </div>
          <button 
            onClick={handleNext} 
            className="cute-button text-4xl"
            disabled={currentIndex === family.words.length - 1 && isFlipped}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCardPage; 