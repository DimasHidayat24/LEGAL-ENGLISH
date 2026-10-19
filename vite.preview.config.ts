/**
 * Single-file offline preview build (does not affect the normal `vite build`).
 *   npm run build:preview
 * Produces one self-contained HTML (JS + CSS inlined, no video/public assets)
 * that opens from file:// thanks to hash routing.
 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  publicDir: false,
  build: {
    outDir: process.env.PREVIEW_OUT_DIR || 'dist-preview',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 5000,
  },
});
