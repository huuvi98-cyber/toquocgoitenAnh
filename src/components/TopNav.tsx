import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, Sparkles } from 'lucide-react';

interface TopNavProps {
  readingProgress: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  readingMode: 'immersive' | 'clean';
  onToggleReadingMode: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  readingProgress,
  isAudioPlaying,
  onToggleAudio,
  readingMode,
  onToggleReadingMode,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Reading Progress Hairline Bar - Bỏ viền trên nền xám */}
      {readingProgress > 0 && (
        <div className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 z-50 bg-transparent pointer-events-none">
          <div
            className="h-full bg-amber-600 transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
          />
        </div>
      )}
    </>
  );
};
