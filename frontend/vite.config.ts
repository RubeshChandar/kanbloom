import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig(({ mode }) => {

  const envDir = path.resolve(__dirname, '..'); // One level up
  const env = loadEnv(mode, envDir, '');

  const port = parseInt(env.VITE_PORT) || 3000;


  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    server: {
      port
    }
  }
})



