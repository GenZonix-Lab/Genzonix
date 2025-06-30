import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('aws-amplify')) {
              return 'vendor-aws';
            }
            if (id.includes('chart.js')) {
              return 'vendor-chart';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            return 'vendor-misc'; // Everything else from node_modules
          }
        }
      }
    }
  }
})

