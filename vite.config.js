import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  define: {
    // Automatically use localhost in development, production URL in production
    'import.meta.env.VITE_API_URL': JSON.stringify(
      mode === 'production' 
        ? 'https://ecommerce-a5x-backend.onrender.com'
        : 'http://localhost:3001'
    )
  }
}))
