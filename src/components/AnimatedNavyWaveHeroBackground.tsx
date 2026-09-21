import React from 'react';

interface AnimatedNavyWaveHeroBackgroundProps {
  theme: 'dark' | 'light';
}

/**
 * AnimatedNavyWaveHeroBackground
 * 
 * High-resolution monochrome wave hero background:
 * - 4K WebP (/hero_wave_clean_4k.webp) and Retina 2x (/hero_wave_clean_2x.jpg) resolution
 * - Pitch-black canvas foundation with luminous curved wave crest and volumetric mist
 * - Hardware-accelerated CSS ambient breathing animation for a subtle, living luxury aesthetic
 * - Fully responsive with srcset, eager loading, and high fetch priority
 * - Theme-aware styling for dark and light modes with seamless page blend
 * - Radial vignette overlay for optimal typography contrast and WCAG AAA readability
 */
export const AnimatedNavyWaveHeroBackground: React.FC<AnimatedNavyWaveHeroBackgroundProps> = ({ theme }) => {
  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      {/* 1. Animated Container with Subtle 60fps Ambient Breathing */}
      <div className="absolute inset-[-4%] w-[108%] h-[108%] transform-gpu animate-hero-wave-drift will-change-transform">
        <picture>
          <source 
            type="image/webp" 
            srcSet="/hero_wave_clean_4k.webp 3840w, /hero_wave_clean_2x.jpg 2752w" 
            sizes="100vw" 
          />
          <source 
            type="image/jpeg" 
            srcSet="/hero_wave_clean_2x.jpg 2752w, /hero_wave_clean.jpg 1376w" 
            sizes="100vw" 
          />
          <img
            src="/hero_wave_clean_4k.webp"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              theme === 'light' 
                ? 'invert contrast-[1.12] brightness-[0.96] opacity-75 mix-blend-multiply' 
                : 'opacity-100 brightness-[1.03] contrast-[1.05]'
            }`}
          />
        </picture>
      </div>

      {/* 2. Soft Atmospheric Center Light Bloom (enhances depth of the wave crest) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse 65% 35% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)'
            : 'radial-gradient(ellipse 65% 35% at 50% 50%, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.015) 50%, transparent 80%)'
        }}
      />

      {/* 3. Radial Vignette behind headline and controls to ensure WCAG AAA readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at 22% 48%, rgba(5, 5, 5, 0.82) 0%, rgba(5, 5, 5, 0.45) 52%, transparent 85%)'
            : 'radial-gradient(circle at 22% 48%, rgba(245, 245, 245, 0.85) 0%, rgba(245, 245, 245, 0.45) 52%, transparent 85%)'
        }}
      />

      {/* 4. Top subtle vignette for seamless detached pill navbar floating */}
      <div 
        className={`absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b pointer-events-none transition-colors duration-300 ${
          theme === 'dark'
            ? 'from-[#050505]/70 to-transparent'
            : 'from-[#F7F7F7]/70 to-transparent'
        }`}
      />

      {/* 5. Bottom seamless blend into main page canvas */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t pointer-events-none transition-colors duration-300 ${
          theme === 'dark'
            ? 'from-[#050505] via-[#050505]/85 to-transparent'
            : 'from-[#F7F7F7] via-[#F7F7F7]/85 to-transparent'
        }`}
      />
    </div>
  );
};
