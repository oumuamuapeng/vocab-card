import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  loadTime: number;
  renderTime: number;
  interactionDelay: number;
}

export const usePerformanceMonitor = (enabled: boolean = process.env.NODE_ENV === 'development') => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    loadTime: 0,
    renderTime: 0,
    interactionDelay: 0
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const renderStartTime = useRef(0);
  const animationId = useRef<number>();

  // FPS monitoring
  const measureFPS = () => {
    const now = performance.now();
    frameCount.current++;

    if (now >= lastTime.current + 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCount.current = 0;
      lastTime.current = now;
    }

    if (enabled) {
      animationId.current = requestAnimationFrame(measureFPS);
    }
  };

  // Memory usage monitoring (if available)
  const measureMemory = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = Math.round(memory.usedJSHeapSize / (1024 * 1024));
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  };

  // Render time monitoring
  const startRenderMeasurement = () => {
    renderStartTime.current = performance.now();
  };

  const endRenderMeasurement = () => {
    const renderTime = performance.now() - renderStartTime.current;
    setMetrics(prev => ({ ...prev, renderTime }));
  };

  // Interaction delay monitoring
  const measureInteractionDelay = (callback: () => void) => {
    const startTime = performance.now();
    
    // Use scheduler.postTask if available, otherwise setTimeout
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(() => {
        const delay = performance.now() - startTime;
        setMetrics(prev => ({ ...prev, interactionDelay: delay }));
        callback();
      });
    } else {
      setTimeout(() => {
        const delay = performance.now() - startTime;
        setMetrics(prev => ({ ...prev, interactionDelay: delay }));
        callback();
      }, 0);
    }
  };

  // Load time measurement
  useEffect(() => {
    if (enabled) {
      const loadTime = performance.now();
      setMetrics(prev => ({ ...prev, loadTime }));
      
      // Start FPS monitoring
      animationId.current = requestAnimationFrame(measureFPS);
      
      // Memory monitoring interval
      const memoryInterval = setInterval(measureMemory, 5000);
      
      return () => {
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
        clearInterval(memoryInterval);
      };
    }
  }, [enabled]);

  // Performance budget warnings
  useEffect(() => {
    if (!enabled) return;

    const warnings = [];
    
    if (metrics.fps < 30) {
      warnings.push(`Low FPS detected: ${metrics.fps}`);
    }
    
    if (metrics.renderTime > 16.67) { // 60fps target
      warnings.push(`Slow render detected: ${metrics.renderTime.toFixed(2)}ms`);
    }
    
    if (metrics.interactionDelay > 100) {
      warnings.push(`High interaction delay: ${metrics.interactionDelay.toFixed(2)}ms`);
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > 100) { // 100MB threshold
      warnings.push(`High memory usage: ${metrics.memoryUsage}MB`);
    }
    
    if (warnings.length > 0) {
      console.warn('[Performance Monitor]', warnings);
    }
  }, [metrics, enabled]);

  return {
    metrics,
    startRenderMeasurement,
    endRenderMeasurement,
    measureInteractionDelay,
    enabled
  };
};

// Performance optimization helpers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

// Memoization helper for expensive calculations
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
};

export default usePerformanceMonitor;