import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/upload': 'http://localhost:3000', // The server would think that the request originated from the proxy server of url http://localhost:3000
    },
  },
  plugins: [react()],
})
