import React, { useRef } from 'react';
import { useParallax } from '@/hooks/useScrollPosition';

interface ParallaxSectionProps {
  id?: string;
  backgroundImage: string;
  backgroundPosition?: 'center' | 'top' | 'bottom';
  parallaxSpeed?: number;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  diagonalCut?: 'top' | 'bottom' | 'both' | 'none';
  diagonalAngle?: number;
}

/**
 * ParallaxSection component that creates a parallax background effect
 * with optional diagonal section dividers
 */
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  id,
  backgroundImage,
  backgroundPosition = 'center',
  parallaxSpeed = 0.5,
  children,
  className = '',
  minHeight = 'min-h-screen',
  overlay = true,
  overlayOpacity = 0.4,
  diagonalCut = 'none',
  diagonalAngle = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax(parallaxSpeed);

  // Build clip-path for diagonal cuts
  const getClipPath = () => {
    if (diagonalCut === 'none') return 'none';

    const angle = diagonalAngle;
    const percent = Math.tan((angle * Math.PI) / 180) * 100;

    switch (diagonalCut) {
      case 'top':
        return `polygon(0 ${percent}%, 100% 0, 100% 100%, 0 100%)`;
      case 'bottom':
        return `polygon(0 0, 100% ${percent}%, 100% 100%, 0 100%)`;
      case 'both':
        return `polygon(0 ${percent}%, 100% 0, 100% ${100 - percent}%, 0 100%)`;
      default:
        return 'none';
    }
  };

  // Adjust padding to compensate for diagonal cut
  const getPaddingAdjustment = () => {
    if (diagonalCut === 'none') return '';
    const angle = diagonalAngle;
    const offset = Math.tan((angle * Math.PI) / 180) * window.innerHeight;
    return `pt-[${Math.abs(offset)}px]`;
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-hidden ${minHeight} ${className}`}
      style={{
        clipPath: getClipPath(),
      }}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition,
          backgroundAttachment: 'fixed',
          transform: `translateY(${parallaxOffset * parallaxSpeed}px)`,
          willChange: 'transform',
        }}
      />

      {/* Dark Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 w-full h-full bg-black"
          style={{
            opacity: overlayOpacity,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
