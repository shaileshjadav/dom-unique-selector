import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './src/main.jsx',
      },
      output: {
        dir:"chrome-extension/dist",
        entryFileNames: `index.js`,
        chunkFileNames: `index-chunk.js`,
        assetFileNames: `[name].[ext]`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
        },
      },
    },
  },
})

