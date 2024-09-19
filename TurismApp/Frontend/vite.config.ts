import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/speechToText': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/messages': {
        target: 'http://localhost:5001/',
        changeOrigin: false,
        secure: false,
        ws: true
      },
      '/user': {
        target: 'http://localhost:5001/',
        changeOrigin: false,
        secure: false,
        ws: true,
      }
    }
  }
})
