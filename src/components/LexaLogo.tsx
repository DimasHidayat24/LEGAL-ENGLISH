import React from 'react';
import { useStudy } from '../context/StudyContext';

interface LexaLogoProps {
  className?: string;
  size?: number;
  variant?: 'colored' | 'monochrome' | 'gold';
  theme?: 'dark' | 'light';
}

export const LexaLogo: React.FC<LexaLogoProps> = ({
  className = 'w-8 h-8',
  size = 32,
  variant = 'colored',
  theme: explicitTheme,
}) => {
  // Gracefully obtain current active theme from context if available
  let contextTheme: 'dark' | 'light' = 'dark';
  try {
    const study = useStudy();
    if (study?.theme) {
      contextTheme = study.theme;
    }
  } catch {
    // If rendered outside of StudyContext, fallback to DOM state inspection
    if (typeof document !== 'undefined') {
      contextTheme = document.documentElement.classList.contains('light') || 
                     document.documentElement.getAttribute('data-theme') === 'light' 
                     ? 'light' : 'dark';
    }
  }

  const effectiveTheme = explicitTheme || contextTheme;

  // Optimized Theme-Aware Color Mapping for Graphite Monochrome Aesthetic:
  // Dark Mode: Crisp Pure White pillar (#F2F2F2) with silver/white accents (#DCDCDC / #FFFFFF)
  // Light Mode: Authoritative Deep Graphite pillar (#050505) with dark charcoal accents (#1C1C1C)
  let pillarColor = '#F2F2F2';
  let scaleColor = '#DCDCDC';
  let scaleAccent = '#FFFFFF';
  let scaleDark = '#A8A8A8';

  if (variant === 'monochrome') {
    pillarColor = 'currentColor';
    scaleColor = 'currentColor';
    scaleAccent = 'currentColor';
    scaleDark = 'currentColor';
  } else if (variant === 'gold') {
    if (effectiveTheme === 'light') {
      pillarColor = '#7A5816';
      scaleColor = '#B88A2E';
      scaleAccent = '#CCA245';
      scaleDark = '#5C3F0D';
    } else {
      pillarColor = '#EAD096';
      scaleColor = '#D4AF37';
      scaleAccent = '#F3E5AB';
      scaleDark = '#AA8222';
    }
  } else {
    // 'colored' / graphite monochrome default
    if (effectiveTheme === 'light') {
      pillarColor = '#050505';
      scaleColor = '#1C1C1C';
      scaleAccent = '#050505';
      scaleDark = '#707070';
    } else {
      pillarColor = '#F2F2F2';
      scaleColor = '#DCDCDC';
      scaleAccent = '#FFFFFF';
      scaleDark = '#A8A8A8';
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors duration-300`}
      aria-label="LEXA Legal English Monogram Logo"
    >
      {/* ========================================================
          LETTER 'A' & BALANCE SCALE (Layered Behind/Interlocked)
          ======================================================== */}
      <g id="letter-A-and-scale">
        {/* Letter 'A' Apex & Diagonal Strokes */}
        {/* Apex top serif */}
        <path
          d="M 68 18 L 84 18 L 84 21 L 79 21 L 96 66 L 93 66 L 75 21 L 70 21 Z"
          fill={scaleColor}
          className="transition-colors duration-300"
        />
        {/* Right leg of 'A' descending */}
        <path
          d="M 76 21 L 98 78 L 105 78 L 105 81 L 87 81 L 87 78 L 92 78 L 82 52 L 67 52 L 64 60 L 69 60 L 69 62 L 56 62 L 56 60 L 60 60 L 73 25 L 68 25 Z"
          fill={scaleColor}
          className="transition-colors duration-300"
        />
        {/* Crossbar of 'A' */}
        <path
          d="M 69 51 L 83 51 L 81 46 L 71 46 Z"
          fill={scaleAccent}
          className="transition-colors duration-300"
        />

        {/* Justice Scale Suspended from Right Arm of 'A' */}
        {/* Hanging bracket & cord */}
        <path
          d="M 94 48 L 108 61"
          stroke={scaleAccent}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
        <path
          d="M 108 61 L 99 74"
          stroke={scaleAccent}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
        <path
          d="M 108 61 L 117 74"
          stroke={scaleAccent}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
        {/* Small pivot ring */}
        <circle cx="108" cy="61" r="1.8" fill={scaleAccent} className="transition-colors duration-300" />

        {/* Balance Scale Pan / Dish */}
        <path
          d="M 97 74 Q 108 83 119 74 Z"
          fill={scaleDark}
          className="transition-colors duration-300"
        />
        <path
          d="M 96 74 C 96 74 102 78.5 108 78.5 C 114 78.5 120 74 120 74"
          stroke={scaleAccent}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
      </g>

      {/* ========================================================
          LETTER 'L' & LAW PILLAR (Law & Authority)
          ======================================================== */}
      <g id="letter-L-and-pillar">
        {/* Capital Architrave / Top Abacus of Pillar */}
        <rect x="24" y="16" width="34" height="3" rx="0.5" fill={pillarColor} className="transition-colors duration-300" />
        <rect x="27" y="19.5" width="28" height="2.5" rx="0.5" fill={pillarColor} className="transition-colors duration-300" />

        {/* Fluted Columns (3 Distinct Architectural Flutes) */}
        {/* Column 1 (Leftmost edge) */}
        <rect x="29" y="22.5" width="4.5" height="52" rx="1.5" fill={pillarColor} className="transition-colors duration-300" />
        {/* Column 2 (Center flute) */}
        <rect x="36" y="22.5" width="4.5" height="52" rx="1.5" fill={pillarColor} className="transition-colors duration-300" />
        {/* Column 3 (Right flute) */}
        <rect x="43" y="22.5" width="4.5" height="52" rx="1.5" fill={pillarColor} className="transition-colors duration-300" />

        {/* Pillar Torus / Base Moldings */}
        <rect x="27" y="74.5" width="28" height="2.5" rx="0.5" fill={pillarColor} className="transition-colors duration-300" />
        <rect x="24" y="77" width="34" height="3.5" rx="0.5" fill={pillarColor} className="transition-colors duration-300" />

        {/* Base 'L' Horizontal Foot & Serif */}
        <path
          d="M 21 80.5 L 68 80.5 C 69.5 80.5 70.5 79.5 70.5 77 L 72.5 77 L 72.5 85 L 21 85 Z"
          fill={pillarColor}
          className="transition-colors duration-300"
        />
        {/* Left base serif on 'L' */}
        <path
          d="M 21 78.5 L 25 78.5 L 25 85 L 21 85 Z"
          fill={pillarColor}
          className="transition-colors duration-300"
        />
      </g>
    </svg>
  );
};
