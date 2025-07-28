import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el servidor de análisis (ChurnAnalysisVisualizations)
      '/api': {
        target: 'https://genetic-motivated-screensavers-descriptions.trycloudflare.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // No eliminar /api
      },
      // Proxy para el servidor de sugerencias de texto
      '/suggestions': {
        target: 'https://513e95d92e84.ngrok-free.app/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/suggestions/, '/api') // Reemplazar /suggestions con /api
      }
    }
  }
})