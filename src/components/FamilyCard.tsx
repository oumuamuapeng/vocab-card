import { motion } from 'framer-motion';
import { WordFamily } from '../types';
import { useProgress } from '../hooks/useProgress';
import { useEnhancedAudio } from '../hooks/useEnhancedAudio';
import { useHapticFeedback } from '../lib/hapticFeedback';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star, Play, BookOpen, Trophy } from 'lucide-react';

interface FamilyCardProps {
  family: WordFamily;
  onClick: () => void;
  index?: number;
}

const FamilyCard = ({ family, onClick, index = 0 }: FamilyCardProps) => {
  const { getCurrentFamilyProgress, getMasteryLevel } = useProgress(family);
  const progress = getCurrentFamilyProgress();
  const masteryLevel = getMasteryLevel(family);
  const { pronounceWord } = useEnhancedAudio();
  const haptic = useHapticFeedback();

  const completionRate = progress ? (progress.completedWords.length / family.words.length) * 100 : 0;
  const isComplete = completionRate === 100;

  const handleCardClick = () => {
    haptic.tap();
    onClick();
  };

  const handlePlaySound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.selection();
    if (family.words.length > 0) {
      await pronounceWord(family.words[0].word);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
    >
      <Card 
        className={cn(
          "relative overflow-hidden cursor-pointer border-2",
          "bg-white dark:bg-gray-900",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-300",
          "border-gray-200 hover:border-primary/50",
          isComplete && "border-green-500 bg-green-50 dark:bg-green-950"
        )}
        onClick={handleCardClick}
      >
        {/* Header with Icon and Status */}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Family Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-primary/20 to-primary/10",
                "group-hover:from-primary/30 group-hover:to-primary/20",
                "transition-all duration-300"
              )}>
                <i className={`${family.icon} text-2xl text-primary`}></i>
              </div>
              
              {/* Family Name */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-cute">
                  {family.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {family.words.length} 个单词
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-col items-end space-y-1">
              {/* Completion Badge */}
              <Badge 
                variant={isComplete ? "default" : "secondary"}
                className={cn(
                  "text-xs font-medium",
                  isComplete && "bg-green-500 hover:bg-green-600 text-white"
                )}
              >
                {progress ? `${progress.completedWords.length}/${family.words.length}` : `0/${family.words.length}`}
              </Badge>
              
              {/* Mastery Stars */}
              {masteryLevel > 0 && (
                <div className="flex items-center space-x-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star 
                      key={starIndex}
                      size={12} 
                      className={cn(
                        "transition-all duration-200",
                        starIndex < masteryLevel 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-gray-300 fill-none"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress Section */}
          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">学习进度</span>
                <span className={cn(
                  "font-medium",
                  isComplete ? "text-green-600" : "text-primary"
                )}>
                  {Math.round(completionRate)}%
                </span>
              </div>
              <Progress 
                value={completionRate} 
                className={cn(
                  "h-2 bg-gray-100 dark:bg-gray-800",
                  isComplete && "bg-green-100 dark:bg-green-900"
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              {/* Start Learning Button */}
              <Button
                size="sm"
                className={cn(
                  "flex-1 mr-2 font-medium",
                  isComplete 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                <BookOpen size={14} className="mr-1" />
                {isComplete ? "复习" : "开始"}
              </Button>

              {/* Play Sound Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={handlePlaySound}
                className={cn(
                  "w-9 h-9 p-0",
                  "border-gray-200 hover:border-primary/50",
                  "hover:bg-primary/10"
                )}
              >
                <Play size={14} />
              </Button>
            </div>

            {/* Achievement Badge for Completed */}
            {isComplete && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center mt-3 p-2 bg-green-100 dark:bg-green-900 rounded-lg"
              >
                <Trophy size={16} className="text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  已完成！
                </span>
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Hover Effects */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-tr from-primary/5 via-transparent to-primary/5",
          "transition-opacity duration-300 pointer-events-none"
        )} />
        
        {/* Completion Glow Effect */}
        {isComplete && (
          <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-green-400 to-green-600 pointer-events-none" />
        )}
      </Card>
    </motion.div>
  );
};

export default FamilyCard;