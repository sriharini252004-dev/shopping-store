import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // /api calls ellam Express backend-ku forward aagum
    proxy: { '/api': 'http://localhost:5001' },
  },
})