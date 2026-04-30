import { useEffect, useState, useCallback } from 'react';

export interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  isScrolling: boolean;
}

/**
 * Hook to track scroll position with throttling for performance
 * @param throttleMs - Throttle interval in milliseconds (default: 16ms for ~60fps)
 */
export function useScrollPosition(throttleMs: number = 16): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrolling: false,
  });

  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    setScrollPosition(prev => ({
      scrollY,
      scrollX,
      isScrolling: true,
    }));

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set timeout to mark scrolling as finished
    const timeout = setTimeout(() => {
      setScrollPosition(prev => ({
        ...prev,
        isScrolling: false,
      }));
    }, 150);

    setScrollTimeout(timeout);
  }, [scrollTimeout]);

  useEffect(() => {
    let lastScrollTime = 0;

    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime >= throttleMs) {
        handleScroll();
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [throttleMs, handleScroll, scrollTimeout]);

  return scrollPosition;
}

/**
 * Hook to calculate parallax offset based on scroll position
 * @param speed - Parallax speed multiplier (0.5 = half speed, 1 = normal, 2 = double speed)
 * @param offset - Initial offset in pixels
 */
export function useParallax(speed: number = 0.5, offset: number = 0): number {
  const { scrollY } = useScrollPosition();
  return scrollY * speed + offset;
}

/**
 * Hook to detect which section is currently in view
 * @param sectionIds - Array of section element IDs to track
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    const viewportCenter = window.innerHeight / 2;

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      // If element center is close to viewport center, mark as active
      if (Math.abs(elementCenter - viewportCenter) < window.innerHeight / 3) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, [scrollY, sectionIds]);

  return activeSection;
}

/**
 * Hook to calculate scroll progress (0 to 1) for a specific element
 * @param elementRef - Reference to the element to track
 */
export function useScrollProgress(elementRef: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const elementTop = window.scrollY + rect.top;
    const elementHeight = rect.height;

    // Calculate how much of the element is visible
    const scrollStart = elementTop - window.innerHeight;
    const scrollEnd = elementTop + elementHeight;
    const currentScroll = scrollY;

    if (currentScroll < scrollStart) {
      setProgress(0);
    } else if (currentScroll > scrollEnd) {
      setProgress(1);
    } else {
      const progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart);
      setProgress(Math.max(0, Math.min(1, progress)));
    }
  }, [scrollY, elementRef]);

  return progress;
}
