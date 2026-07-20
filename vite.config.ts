import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `npm run dev` uses the normal ES-module dev server (needed for HMR).
// `npm run build` instead produces a single classic (non-module) IIFE
// bundle + a plain CSS file, plus a hand-written dist/index.html that
// references them with ordinary <script>/<link> tags (no type="module").
// This is what makes the built dist/index.html openable directly via
// file:// — a `<script type="module">` entry (Vite's normal app-build
// output) is blocked under the file:// protocol in Chromium regardless of
// relative paths, but a classic script is not. See CLAUDE.md §1/§11.
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      // Library-mode iife builds don't get Vite's usual automatic
      // process.env.NODE_ENV replacement — without this, React/Framer
      // Motion's dev+prod dual code paths both stay in the bundle (since
      // Rollup can't dead-code-eliminate an unresolved `process.env`
      // check), roughly doubling size, and `process` doesn't exist as a
      // global in the browser, so the runtime check would throw.
      define: {
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        lib: {
          entry: 'src/main.tsx',
          name: 'ResumeApp',
          formats: ['iife'],
          fileName: () => 'resume-app.js'
        },
        rollupOptions: {
          output: {
            assetFileNames: 'resume-app.[ext]'
          }
        }
      }
    };
  }

  return {
    plugins: [react()]
  };
});
