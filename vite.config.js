import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AI-PM-Course/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/data/curriculum') || id.includes('/src/data/lessonEnhancements')) {
            return 'curriculum'
          }
          if (id.includes('/src/views/')) return 'views'
        },
      },
    },
  },
})
