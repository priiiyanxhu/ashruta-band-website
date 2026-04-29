import { useEffect, useState } from 'react';
import { calculateScrollProgress, getProgressBarColor } from '@/lib/scrollAnimationUtils';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = calculateScrollProgress();
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const barColor = getProgressBarColor(progress);

  return (
    <div
      className="scroll-progress-bar"
      style={{
        width: `${progress}%`,
        backgroundColor: barColor,
      }}
    />
  );
}
