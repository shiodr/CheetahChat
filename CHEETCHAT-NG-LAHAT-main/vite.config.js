import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Automatically opens the visualizer after build
  ],
  
  server: {
    open: true, // Automatically open the app in the browser
  },
  base: './',  // Ensure assets are referenced using relative paths

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Group all node_modules into a single chunk
          }
          if (id.includes('src/components/')) {
            return 'components'; // Group your components into a separate chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the size limit for warnings
  },
});
