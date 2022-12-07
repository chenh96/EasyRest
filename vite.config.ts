import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  root: './src/view',
  build: {
    outDir: '../../dist/compile/view'
  },
  server: {
    port: 3000
  }
})
