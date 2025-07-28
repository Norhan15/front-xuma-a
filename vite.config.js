import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el servidor de análisis (ChurnAnalysisVisualizations)
      '/api': {
        target: 'https://blue-turns-won-inch.trycloudflare.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // No eliminar /api
      },
      // Proxy para el servidor de sugerencias de texto
      '/suggestions': {
        target: 'https://1ee0c4ce8655.ngrok-free.app/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/suggestions/, '/api') // Reemplazar /suggestions con /api
      }
    }
  }
})