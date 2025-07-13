import { Suspense, ComponentType } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingText?: string;
}

const LazyWrapper = ({ 
  children, 
  fallback,
  loadingText = "加载中..."
}: LazyWrapperProps) => {
  const defaultFallback = (
    <div className="flex items-center justify-center min-h-[200px]">
      <LoadingSpinner text={loadingText} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  loadingText?: string
) => {
  return (props: P) => (
    <LazyWrapper loadingText={loadingText}>
      <Component {...props} />
    </LazyWrapper>
  );
};

export default LazyWrapper;