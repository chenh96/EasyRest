import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './src/view',
  base: './',
  server: {
    host: '127.0.0.1',
    port: 8848
  },
  build: {
    outDir: '../../out/compile/web'
  }
})
