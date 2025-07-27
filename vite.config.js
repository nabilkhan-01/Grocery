// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Grocery/',  // 👈 this is essential for GitHub Pages
  plugins: [react()],
})
