import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/fridgie-site/',  // repo name here, with leading and trailing slash
  plugins: [react()],
})
