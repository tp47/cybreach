import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  build: {
    lib: {
      entry: path.resolve(__dirname, '_default.page.server.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
})
