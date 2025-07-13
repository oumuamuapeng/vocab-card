import { useState, useMemo, useCallback } from 'react';

interface VirtualizationConfig {
  itemHeight: number;
  containerHeight: number;
  items: any[];
  overscan?: number;
}

export const useVirtualization = ({
  itemHeight,
  containerHeight,
  items,
  overscan = 5
}: VirtualizationConfig) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItemsCount = endIndex - startIndex + 1;
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;

    return {
      items: items.slice(startIndex, endIndex + 1),
      startIndex,
      endIndex,
      visibleItemsCount,
      totalHeight,
      offsetY
    };
  }, [scrollTop, itemHeight, containerHeight, items, overscan]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    handleScroll,
    totalHeight: visibleItems.totalHeight,
    offsetY: visibleItems.offsetY
  };
};

export default useVirtualization;