import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNavyWaveHeroBackgroundProps {
  theme: 'dark' | 'light';
}

/**
 * AnimatedNavyWaveHeroBackground
 * 
 * High-resolution monochrome wave hero background system:
 * - Real-time High-DPI Canvas 2D engine rendering an ultra-slow, fluid wave undulation at 60 FPS
 * - Matches the reference aesthetic: deep pitch-black (#000000) with a luminous bright white wave
 *   crest arching gracefully across the center, a razor-sharp incandescent glowing rim, and
 *   soft smoky volumetric mist flowing underneath
 * - Cycle speed calibrated to an ultra-calm ~25-second harmonic period for hypnotic, slow movement
 * - Deep 3D depth with dual-ridge parallax and traveling crest glint
 * - Paired with the 4K WebP foundation for instant load and rich atmospheric grain
 * - Battery-friendly: auto-pauses via IntersectionObserver when scrolled out of view
 * - Respects prefers-reduced-motion
 */
export const AnimatedNavyWaveHeroBackground: React.FC<AnimatedNavyWaveHeroBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const startTime = performance.now();

    // Resize handler keeping crisp High-DPI resolution
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 200);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      if (isReducedMotion) {
        drawFrame(performance.now());
      }
    });
    resizeObserver.observe(container);

    // Pause rendering when off-screen to save 100% CPU/GPU resources
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isReducedMotion) {
          lastFrameTime = performance.now();
          animationFrameId = requestAnimationFrame(renderLoop);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let lastFrameTime = performance.now();

    // Spline curve evaluator using Catmull-Rom interpolation for pristine smoothness
    const drawSpline = (points: { x: number; y: number }[]) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(i + 2, points.length - 1)];

        // Catmull-Rom to Cubic Bezier control points conversion
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    const drawFrame = (now: number) => {
      if (!ctx || width === 0 || height === 0) return;

      // Ultra-slow time scaling: ~25.5 second complete harmonic breathing cycle
      const elapsed = (now - startTime);
      const t = isReducedMotion ? 0 : elapsed * 0.000246;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const NUM_POINTS = 96;
      const primaryPoints: { x: number; y: number }[] = [];
      const ghostPoints: { x: number; y: number }[] = [];

      // Wave calculation across horizontal span
      for (let i = 0; i <= NUM_POINTS; i++) {
        const u = i / NUM_POINTS; // 0 to 1
        const x = (u - 0.04) * (width * 1.08); // Slight bleed past left & right edges

        // 1. Arch envelope matching the reference image:
        // Elegant Gaussian crest centered at u ~0.47, with graceful dip on right
        const gaussianArch = Math.exp(-Math.pow((u - 0.46) / 0.29, 2)) * 0.20;
        const naturalSlope = Math.sin(Math.PI * 1.8 * (u - 0.08)) * 0.038;
        const baseNormY = 0.53 - gaussianArch + naturalSlope;

        // 2. Slow breathing & liquid harmonic drift:
        const edgeDamp = Math.sin(Math.PI * Math.max(0, Math.min(1, u)));
        const slowBreath = Math.sin(t) * 0.022 * edgeDamp;
        const travelingWave1 = Math.sin(u * 2.8 - t * 1.1) * 0.016 * edgeDamp;
        const travelingWave2 = Math.cos(u * 4.4 + t * 0.7) * 0.008 * edgeDamp;

        const primaryY = (baseNormY + slowBreath + travelingWave1 + travelingWave2) * height;
        primaryPoints.push({ x, y: primaryY });

        // 3. Secondary subtle ghost ridge for parallax depth:
        const ghostTraveling = Math.cos(u * 3.2 - t * 0.85 + 1.2) * 0.018 * edgeDamp;
        const ghostY = (baseNormY + 0.065 + ghostTraveling) * height;
        ghostPoints.push({ x, y: ghostY });
      }

      // -------------------------------------------------------------
      // PASS A: Secondary Ethereal Ghost Ridge (Parallax Background)
      // -------------------------------------------------------------
      ctx.save();
      drawSpline(ghostPoints);
      ctx.lineTo(width + 40, height + 40);
      ctx.lineTo(-40, height + 40);
      ctx.closePath();

      const ghostGrad = ctx.createLinearGradient(0, height * 0.35, 0, height);
      ghostGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
      ghostGrad.addColorStop(0.18, 'rgba(255, 255, 255, 0.07)');
      ghostGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.02)');
      ghostGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = ghostGrad;
      ctx.fill();

      // Faint ghost crest line
      drawSpline(ghostPoints);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS B: Primary Wave Volumetric Smoky Mist (Layer 1 - Deep ambient)
      // -------------------------------------------------------------
      ctx.save();
      drawSpline(primaryPoints);
      ctx.lineTo(width + 40, height + 40);
      ctx.lineTo(-40, height + 40);
      ctx.closePath();

      const mistGrad = ctx.createLinearGradient(0, height * 0.28, 0, height);
      mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
      mistGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.18)');
      mistGrad.addColorStop(0.38, 'rgba(255, 255, 255, 0.08)');
      mistGrad.addColorStop(0.72, 'rgba(255, 255, 255, 0.025)');
      mistGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = mistGrad;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS C: Primary Wave Core Luminescence (Layer 2 - Concentrated fog)
      // -------------------------------------------------------------
      ctx.save();
      drawSpline(primaryPoints);
      ctx.lineTo(width + 40, height + 40);
      ctx.lineTo(-40, height + 40);
      ctx.closePath();

      const coreGrad = ctx.createLinearGradient(0, height * 0.30, 0, height * 0.72);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.50)');
      coreGrad.addColorStop(0.20, 'rgba(255, 255, 255, 0.32)');
      coreGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.08)');
      coreGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS D: Razor-Sharp Luminous Crest Rim (Layer 3 - Glowing Edge)
      // -------------------------------------------------------------
      ctx.save();
      // 1. Soft atmospheric edge bloom
      drawSpline(primaryPoints);
      ctx.shadowColor = 'rgba(255, 255, 255, 0.90)';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.40)';
      ctx.lineWidth = 4.0;
      ctx.stroke();

      // 2. Focused rim highlight
      drawSpline(primaryPoints);
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // 3. Incandescent razor-sharp white wire
      drawSpline(primaryPoints);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // PASS E: Slow Traveling Specular Glint along the Crest Rim
      // -------------------------------------------------------------
      if (!isReducedMotion) {
        ctx.save();
        const glintProgress = ((t * 0.35) % 1.6) - 0.3; // Cycles across 0 to 1 with off-screen pause
        if (glintProgress >= 0 && glintProgress <= 1) {
          const ptIndex = Math.floor(glintProgress * NUM_POINTS);
          const p = primaryPoints[ptIndex] || primaryPoints[Math.floor(NUM_POINTS / 2)];
          
          const glintGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 70);
          glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
          glintGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.20)');
          glintGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
          
          ctx.fillStyle = glintGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 70, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();
    };

    const renderLoop = (now: number) => {
      if (!isVisible) return;
      drawFrame(now);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    if (isReducedMotion) {
      drawFrame(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [isReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F7F7F7]' : 'bg-black'
      }`}
      aria-hidden="true"
    >
      {/* 1. High-Resolution Texture Foundation with Subtle Breathing Scale */}
      <div className={`absolute inset-[-3%] w-[106%] h-[106%] transform-gpu animate-hero-wave-drift will-change-transform pointer-events-none ${
        theme === 'light' ? 'opacity-35' : 'opacity-45'
      }`}>
        <picture>
          <source 
            type="image/webp" 
            srcSet="/hero_wave_clean_4k.webp 3840w, /hero_wave_clean_2x.jpg 2752w" 
            sizes="100vw" 
          />
          <img
            src="/hero_wave_clean_4k.webp"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center ${
              theme === 'light' 
                ? 'invert contrast-[1.10] brightness-[0.98] mix-blend-multiply' 
                : 'contrast-[1.04] brightness-[0.92]'
            }`}
          />
        </picture>
      </div>

      {/* 2. Active 60 FPS Real-Time High-DPI Animated Wave Canvas (Slow Hypnotic Motion) */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
          theme === 'light' ? 'mix-blend-multiply opacity-85' : 'mix-blend-screen opacity-100'
        }`}
        style={{ filter: theme === 'light' ? 'invert(1) contrast(1.10)' : 'contrast(1.06)' }}
      />

      {/* 3. Soft Atmospheric Center Light Bloom */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(ellipse 65% 35% at 50% 50%, rgba(0, 0, 0, 0.025) 0%, transparent 80%)'
            : 'radial-gradient(ellipse 65% 35% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)'
        }}
      />

      {/* 4. Radial Vignette behind headline and controls for WCAG AAA legibility */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(circle at 22% 48%, rgba(247, 247, 247, 0.92) 0%, rgba(247, 247, 247, 0.55) 52%, transparent 85%)'
            : 'radial-gradient(circle at 22% 48%, rgba(5, 5, 5, 0.85) 0%, rgba(5, 5, 5, 0.48) 52%, transparent 85%)'
        }}
      />

      {/* 5. Top subtle vignette for seamless detached pill navbar floating */}
      <div 
        className={`absolute inset-x-0 top-0 h-24 sm:h-32 pointer-events-none transition-colors duration-300 ${
          theme === 'light' ? 'bg-gradient-to-b from-[#F7F7F7]/85 to-transparent' : 'bg-gradient-to-b from-[#050505]/75 to-transparent'
        }`}
      />

      {/* 6. Bottom seamless blend into main page canvas */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-28 sm:h-40 pointer-events-none transition-colors duration-300 ${
          theme === 'light' ? 'bg-gradient-to-t from-[#F7F7F7] via-[#F7F7F7]/90 to-transparent' : 'bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent'
        }`}
      />
    </div>
  );
};
