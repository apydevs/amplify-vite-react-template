import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'
//import ssr from 'vite-plugin-ssr/plugin';


import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [
      react(),
      visualizer({ open: true }), // Automatically opens the visualizer in your browser after build
    //ssr()
  ],
  base: '/',  // Ensure this is correct for your deployment
  ssr: {
    // Any SSR-specific configurations
  },
  define: {
    'process.env': process.env,
  },
  build: {
    sourcemap: false,  // Disable source maps in production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
