import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StrokeAnimationProps {
  strokes: string[];
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
}

const StrokeAnimation: React.FC<StrokeAnimationProps> = ({
  strokes,
  size = 120,
  strokeWidth = 4,
  color = '#2563eb',
  duration = 1
}) => {
  const [currentStroke, setCurrentStroke] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && currentStroke < strokes.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStroke(prev => prev + 1);
      }, duration * 1000);
      return () => clearTimeout(timer);
    } else if (currentStroke === strokes.length - 1) {
      setIsPlaying(false);
    }
  }, [currentStroke, isPlaying, strokes.length, duration]);

  const handlePlay = () => {
    setCurrentStroke(-1);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 100"
        className="border-2 border-gray-200 rounded-lg bg-white"
      >
        {strokes.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: index <= currentStroke ? 1 : 0,
              opacity: index <= currentStroke ? 1 : 0.2
            }}
            transition={{
              duration: index === currentStroke ? duration : 0,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      <button
        onClick={handlePlay}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isPlaying ? '演示中...' : '演示笔画'}
      </button>
    </div>
  );
};

export default StrokeAnimation; 