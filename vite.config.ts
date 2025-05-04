import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base:"/",
  plugins: [react()],
    lib: {
      entry: 'src/main.tsx',
      formats: ['esm'],
    },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
