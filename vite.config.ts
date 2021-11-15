import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './src/view',
  base: './',
  server: {
    host: true,
  },
  build: {
    outDir: '../../out/compile/web',
  },
})
