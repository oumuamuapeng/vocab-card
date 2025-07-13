import React from 'react';
import { WordFamily } from '../types';
import { useProgress } from '../hooks/useProgress';

interface FamilyCardProps {
  family: WordFamily;
  onClick: () => void;
}

const FamilyCard: React.FC<FamilyCardProps> = ({ family, onClick }) => {
  const { getCurrentFamilyProgress, getMasteryLevel } = useProgress(family);
  const progress = getCurrentFamilyProgress();
  const masteryLevel = getMasteryLevel();

  const colors = [
    'bg-orange-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-pink-400',
    'bg-red-400',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      onClick={onClick}
      className={`${color} rounded-3xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 card-shadow relative overflow-hidden`}
    >
      {/* 进度条 */}
      {progress && (
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20">
          <div 
            className="h-full bg-white/60"
            style={{ 
              width: `${(progress.completedWords.length / family.words.length) * 100}%`,
              transition: 'width 0.3s ease-in-out'
            }}
          />
        </div>
      )}

      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse-slow">
          <i className={`${family.icon} text-white`}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-cute">
          {family.name}
        </h3>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-white/80 text-sm">
            {progress ? `${progress.completedWords.length} / ${family.words.length}` : `${family.words.length} 个单词`}
          </p>
          {masteryLevel > 0 && (
            <div className="flex space-x-1">
              {Array.from({ length: masteryLevel }).map((_, index) => (
                <span key={index} className="text-yellow-300 text-sm">⭐</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyCard; 