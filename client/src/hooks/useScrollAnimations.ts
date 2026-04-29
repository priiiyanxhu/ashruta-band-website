import { useEffect, useRef, useState } from 'react';
import { throttle, calculateScrollProgress, getElementScrollProgress, calculateScrollVelocity, getScrollVelocityIntensity } from '@/lib/scrollAnimationUtils';

interface ScrollAnimationState {
  scrollY: number;
  scrollProgress: number;
  scrollVelocity: number;
  velocityIntensity: number;
}

export const useScrollAnimations = () => {
  const [scrollState, setScrollState] = useState<ScrollAnimationState>({
    scrollY: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    velocityIntensity: 0.5,
  });

  const previousScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScroll = window.scrollY;
      const velocity = calculateScrollVelocity(currentScroll, previousScrollRef.current);
      const velocityIntensity = getScrollVelocityIntensity(velocity);
      const scrollProgress = calculateScrollProgress();

      setScrollState({
        scrollY: currentScroll,
        scrollProgress,
        scrollVelocity: velocity,
        velocityIntensity,
      });

      previousScrollRef.current = currentScroll;
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
};

// Hook to detect when element enters viewport
export const useInViewport = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (ref.current) {
        const inView = getElementScrollProgress(ref.current) > 0;
        setIsInView(inView);
        if (inView) {
          setHasBeenInView(true);
        }
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return { isInView, hasBeenInView };
};

// Hook to get parallax offset
export const useParallax = (ref: React.RefObject<HTMLElement>, speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const parallaxOffset = elementTop * speed;
        setOffset(parallaxOffset);
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return offset;
};

// Hook to get element scroll progress (0-1)
export const useElementScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (ref.current) {
        const progress = getElementScrollProgress(ref.current);
        setProgress(progress);
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};
