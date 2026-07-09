import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: './',
  root: 'source',
  cacheDir: resolve(__dirname, '.vite-cache'),
  build: {
    outDir: resolve(__dirname, 'docs'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'source/index.html'),
      },
      output: {
        format: 'es',
      },
    },
  },
});
