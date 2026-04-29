/**
 * Scroll Animation Utilities
 * Provides helper functions for premium scroll-based animations
 */

// Easing functions for smooth animations
export const easing = {
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  linear: (t: number): number => t,
};

// Calculate parallax offset based on scroll position
export const calculateParallaxOffset = (scrollY: number, speed: number = 0.5): number => {
  return scrollY * speed;
};

// Calculate scroll progress percentage
export const calculateScrollProgress = (): number => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  return (scrolled / documentHeight) * 100;
};

// Detect if element is in viewport
export const isElementInViewport = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0
  );
};

// Get element's position relative to viewport
export const getElementViewportPosition = (element: HTMLElement | null): number => {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  return rect.top / window.innerHeight;
};

// Throttle function to limit scroll event calls
export const throttle = (func: (...args: any[]) => void, limit: number): ((...args: any[]) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Calculate scroll velocity
export const calculateScrollVelocity = (currentScroll: number, previousScroll: number): number => {
  return Math.abs(currentScroll - previousScroll);
};

// Get scroll velocity intensity (0-1)
export const getScrollVelocityIntensity = (velocity: number): number => {
  // velocity in pixels per millisecond
  if (velocity < 2) return 0.5; // slow scroll
  if (velocity < 5) return 0.7; // normal scroll
  return 1; // fast scroll
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Map value from one range to another
export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Get scroll progress for a specific element
export const getElementScrollProgress = (element: HTMLElement | null): number => {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top;
  const elementHeight = rect.height;
  const windowHeight = window.innerHeight;
  
  // Progress from -1 (above viewport) to 1 (below viewport)
  const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
  return clamp(progress, 0, 1);
};

// Animate number counter
export const animateCounter = (
  startValue: number,
  endValue: number,
  duration: number,
  onUpdate: (value: number) => void
): void => {
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing.easeOutCubic(progress);
    const currentValue = startValue + (endValue - startValue) * easedProgress;
    
    onUpdate(Math.round(currentValue));
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

// Get color based on scroll progress (for progress bar)
export const getProgressBarColor = (progress: number): string => {
  if (progress < 33) return '#FF0000'; // Red
  if (progress < 66) return '#FF6B35'; // Orange
  return '#FFB700'; // Gold
};

// Format number with K suffix (e.g., 1200 -> 1.2K)
export const formatNumberWithK = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
