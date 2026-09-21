import React, { useState, useEffect } from 'react';
import { Volume2, Volume1, Waves } from 'lucide-react';
import { speakLegalTerm, stopSpeech, subscribeToSpeech, getCurrentSpeakingTerm, SpeechAccent } from '../utils/speech';

interface AudioPronounceButtonProps {
  term: string;
  accent?: SpeechAccent;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  tooltipText?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const AudioPronounceButton: React.FC<AudioPronounceButtonProps> = ({
  term,
  accent = 'en-US' as SpeechAccent,
  size = 'md',
  className = '',
  showLabel = false,
  tooltipText = 'Listen to pronunciation',
  onClick
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    const current = getCurrentSpeakingTerm();
    setIsPlaying(current === term);

    // Subscribe to global speech state
    const unsubscribe = subscribeToSpeech((speakingTerm) => {
      setIsPlaying(speakingTerm === term);
    });

    return () => {
      unsubscribe();
    };
  }, [term]);

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);

    if (isPlaying) {
      stopSpeech();
    } else {
      const selectedAccent: SpeechAccent = accent || 'en-US';
      speakLegalTerm(term, { accent: selectedAccent });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (isPlaying) {
        stopSpeech();
      } else {
        const selectedAccent: SpeechAccent = accent || 'en-US';
        speakLegalTerm(term, { accent: selectedAccent });
      }
    }
  };

  // Dimensions & sizes maintaining >= 44x44px touch area for mobile usability
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const buttonDimensions = size === 'sm' 
    ? 'min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] p-2' 
    : size === 'lg'
    ? 'min-w-[44px] min-h-[44px] p-2.5'
    : 'min-w-[44px] min-h-[44px] p-2';

  return (
    <button
      type="button"
      onClick={handlePronounce}
      onKeyDown={handleKeyDown}
      aria-label={`Listen to pronunciation of ${term}`}
      title={tooltipText}
      tabIndex={0}
      className={`relative inline-flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 ${buttonDimensions} ${
        isPlaying
          ? 'bg-[#242424] text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105'
          : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:text-[#F2F2F2] hover:border-white/[0.2] hover:bg-[#1C1C1C] hover:shadow-xs'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Subtle audio wave pulse */}
            <span className="absolute -inset-1 rounded-full bg-white/10 animate-ping" />
            <Volume2 className={`${iconSize} text-white animate-pulse`} />
          </div>
        ) : (
          <Volume2 className={`${iconSize} transition-transform duration-150 group-hover:scale-110`} />
        )}
      </div>

      {showLabel && (
        <span className={`ml-1.5 text-xs font-sans font-medium ${isPlaying ? 'text-white' : 'text-inherit'}`}>
          {isPlaying ? 'Playing...' : 'Pronounce'}
        </span>
      )}
    </button>
  );
};
