import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

const SpaceBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // 生成粒子
    const generateParticles = () => {
      const colors = ['#00f5ff', '#a855f7', '#ff006e', '#fbbf24'];
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * Math.PI * 2
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* 主背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* 神经网络网格 */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      {/* 大型装饰性发光球体 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-20, 20, -20],
          y: [-10, 10, -10]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [20, -20, 20],
          y: [10, -10, 10]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -2
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 动态粒子系统 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 6px ${particle.color}`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            x: [
              particle.x,
              particle.x + Math.cos(particle.direction) * 100,
              particle.x + Math.cos(particle.direction) * 200,
              particle.x + Math.cos(particle.direction) * 100,
              particle.x
            ],
            y: [
              particle.y,
              particle.y + Math.sin(particle.direction) * 100,
              particle.y + Math.sin(particle.direction) * 200,
              particle.y + Math.sin(particle.direction) * 100,
              particle.y
            ],
            opacity: [0, 1, 0.8, 1, 0],
            scale: [0, 1, 1.2, 1, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* 扫描线效果 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"
        animate={{
          y: [0, window.innerHeight || 800]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 全息投影效果 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 245, 255, 0.03) 50%, transparent 100%)',
            transform: 'skewX(-20deg)'
          }}
        />
      </div>

      {/* 星座连线效果 */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff006e" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* 动态连线 */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = (i * 100) % window.innerWidth;
          const y1 = (i * 150) % window.innerHeight;
          const x2 = ((i + 1) * 120) % window.innerWidth;
          const y2 = ((i + 1) * 180) % window.innerHeight;
          
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#constellation-gradient)"
              strokeWidth="1"
              strokeDasharray="5,10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>

      {/* HUD界面元素 */}
      <div className="absolute top-4 left-4 space-y-2">
        {/* 系统状态指示器 */}
        <motion.div
          className="flex items-center space-x-2 text-xs text-cyan-400 font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </motion.div>
        
        <motion.div
          className="flex items-center space-x-2 text-xs text-purple-400 font-mono"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <span>NEURAL LINK ACTIVE</span>
        </motion.div>
      </div>

      {/* 右下角装饰性数据流 */}
      <div className="absolute bottom-4 right-4 space-y-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-0.5 bg-gradient-to-l from-cyan-400 to-transparent"
            style={{ width: `${20 + Math.random() * 60}px` }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpaceBackground;