import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 60; // 60 FPS for ultra-silky fluid motion
const DURATION_SEC = 16; // 16-second calm, slow, hypnotic cycle
const TOTAL_FRAMES = FPS * DURATION_SEC; // 960 frames

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, 'hero-wave.mp4');

console.log(`Generating ${TOTAL_FRAMES} frames at ${WIDTH}x${HEIGHT}, ${FPS}fps (${DURATION_SEC}s) -> ${outputPath}`);

const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'rawvideo',
  '-vcodec', 'rawvideo',
  '-s', `${WIDTH}x${HEIGHT}`,
  '-pix_fmt', 'rgb24',
  '-r', `${FPS}`,
  '-i', '-',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '20',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  outputPath
]);

ffmpeg.stderr.on('data', (data) => {
  const str = data.toString();
  if (str.includes('frame=')) {
    process.stdout.write(`\r${str.trim().slice(0, 80)}`);
  }
});

ffmpeg.on('close', (code) => {
  console.log(`\nffmpeg process exited with code ${code}`);
  if (code === 0 && fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`Success! Video created: ${(stats.size / 1024).toFixed(1)} KB`);
  }
});

const frameBuffer = Buffer.alloc(WIDTH * HEIGHT * 3);

// Smooth, slow, hypnotic wave generation
function renderFrame(frameIndex) {
  frameBuffer.fill(0); // Pure deep black background

  const t = (frameIndex / TOTAL_FRAMES) * 2 * Math.PI; // Perfectly looping [0, 2π]
  const cosT = Math.cos(t);
  const sinT = Math.sin(t);

  const yBase = HEIGHT * 0.52;
  const A1 = HEIGHT * 0.14; // Graceful standing wave amplitude
  const A2 = HEIGHT * 0.025; // Gentle traveling harmonic

  // Calculate wave crest Y for each column x
  const waveY = new Float32Array(WIDTH);
  for (let x = 0; x < WIDTH; x++) {
    const u = x / WIDTH; // 0 to 1
    // Primary standing wave mode with smooth spatial curve
    const mode1 = Math.cos(3 * Math.PI * (u - 0.5) - 0.25 * sinT) * cosT;
    // Secondary harmonic for organic silk drift
    const mode2 = Math.sin(2 * Math.PI * u - t) * 0.6 + Math.cos(4 * Math.PI * u - t * 2) * 0.15;
    const edgeDamp = Math.sin(Math.PI * u);
    
    waveY[x] = yBase - (A1 * mode1 + A2 * mode2) * (0.65 + 0.35 * edgeDamp);
  }

  // Draw volumetric luminous glow and crisp crest line with smooth anti-aliased gradations
  for (let x = 0; x < WIDTH; x++) {
    const crest = waveY[x];

    const yStart = Math.max(0, Math.floor(crest - 6));
    const yEnd = Math.min(HEIGHT - 1, Math.floor(crest + 180));

    for (let y = yStart; y <= yEnd; y++) {
      const dist = y - crest;
      let intensity = 0;

      if (dist < 0) {
        // Above crest: razor-thin bloom (falloff within 5-6px)
        const d = -dist;
        intensity = Math.exp(-d * 0.75) * 0.95;
      } else if (dist <= 1.8) {
        // Crisp bright white core rim line
        intensity = 1.0;
      } else {
        // Below crest: rich smoky volumetric fog
        const normDist = dist / 175;
        if (normDist <= 1) {
          const coreBloom = Math.exp(-dist * 0.11) * 0.82;
          const softBody = Math.pow(1 - normDist, 2.3) * 0.42;
          intensity = Math.min(1.0, coreBloom + softBody);
        }
      }

      if (intensity > 0.005) {
        const val = Math.min(255, Math.floor(intensity * 255));
        const idx = (y * WIDTH + x) * 3;
        frameBuffer[idx] = val;
        frameBuffer[idx + 1] = val;
        frameBuffer[idx + 2] = val;
      }
    }
  }

  return frameBuffer;
}

(async () => {
  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const buf = renderFrame(f);
    const canWrite = ffmpeg.stdin.write(buf);
    if (!canWrite) {
      await new Promise(resolve => ffmpeg.stdin.once('drain', resolve));
    }
  }
  ffmpeg.stdin.end();
})();
