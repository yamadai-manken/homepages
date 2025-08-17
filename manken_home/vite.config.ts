import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true, // 0.0.0.0でアクセス可能に
    allowedHosts: [
      '809c6c45ad20.ngrok-free.app', // ngrok URL
    ],
  },
})

