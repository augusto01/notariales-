import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend en el 3000
    host: true, // Permite acceso en red local
  }
})