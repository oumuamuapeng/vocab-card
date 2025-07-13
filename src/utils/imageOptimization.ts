// Image optimization utilities for better performance

export interface ImageConfig {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  lazy?: boolean;
}

export const optimizeImageUrl = (config: ImageConfig): string => {
  const { src, width, height, quality = 80, format = 'webp' } = config;
  
  // For local images, return as-is
  if (src.startsWith('/') || src.startsWith('./')) {
    return src;
  }
  
  // For external images, you could integrate with services like Cloudinary, ImageKit, etc.
  // This is a placeholder implementation
  let optimizedUrl = src;
  
  // Add query parameters for optimization services
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);
  
  const hasParams = optimizedUrl.includes('?');
  optimizedUrl += hasParams ? '&' : '?';
  optimizedUrl += params.toString();
  
  return optimizedUrl;
};

export const generateSrcSet = (src: string, sizes: number[]): string => {
  return sizes
    .map(size => `${optimizeImageUrl({ src, width: size })} ${size}w`)
    .join(', ');
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

// Lazy image component hook
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef && isInView === false) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, isInView]);

  useEffect(() => {
    if (isInView && src) {
      const imageLoader = new Image();
      imageLoader.src = src;
      imageLoader.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [src, isInView]);

  return { imageSrc, setImageRef, isLoaded, isInView };
};

import { useState, useEffect } from 'react';