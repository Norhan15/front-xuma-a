import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el servidor de análisis (ChurnAnalysisVisualizations)
      '/api': {
        target: 'http://98.86.127.137:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // No eliminar /api
      },
      // Proxy para el servidor de sugerencias de texto
      '/suggestions': {
        target: 'http://34.194.226.49:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/suggestions/, '/api') // Reemplazar /suggestions con /api
      }
    }
  }
})