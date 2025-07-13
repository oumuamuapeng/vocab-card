import React, { useState } from 'react';
import { wordFamilies } from '../data/wordFamilies';
import FamilyCard from '../components/FamilyCard';
import { WordFamily } from '../types';
import FlipCardPage from './FlipCardPage'; // 我们即将创建这个组件

const Home: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<WordFamily | null>(null);

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
    <div className="min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary-600 mb-2 font-cute">
          🎓 幼儿自然拼读
        </h1>
        <p className="text-lg text-gray-600 font-cute">
          选择一个词族开始学习吧！
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {wordFamilies.map((family) => (
            <FamilyCard 
              key={family.id} 
              family={family}
              onClick={() => handleFamilySelect(family)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="text-6xl animate-bounce-slow">🌟</div>
      </div>
    </div>
  );
};

export default Home; 