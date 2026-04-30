<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
