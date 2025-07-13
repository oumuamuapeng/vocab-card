import { lazy } from 'react';
import LazyWrapper from './components/LazyWrapper';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import usePerformanceMonitor from './hooks/usePerformanceMonitor';
import './styles/space-theme.css';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));

function App() {
  const { metrics } = usePerformanceMonitor(process.env.NODE_ENV === 'development');

  return (
    <div className="min-h-screen bg-dark">
      <LazyWrapper loadingText="正在初始化神经网络...">
        <Home />
      </LazyWrapper>
      <PWAUpdatePrompt />
      
      {/* Performance metrics display in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-slate-900/90 backdrop-blur text-cyan-400 text-xs p-3 rounded-lg font-mono z-50 border border-cyan-400/30">
          <div className="text-xs text-slate-400 mb-1">SYSTEM METRICS</div>
          <div>FPS: <span className="text-cyan-400">{metrics.fps}</span></div>
          <div>渲染: <span className="text-purple-400">{metrics.renderTime.toFixed(1)}ms</span></div>
          {metrics.memoryUsage && <div>内存: <span className="text-pink-400">{metrics.memoryUsage}MB</span></div>}
        </div>
      )}
    </div>
  )
}

export default App 