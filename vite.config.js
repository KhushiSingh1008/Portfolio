import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js + drei is ~960 kB minified (~260 kB gzip); it lives in its own long-cached chunk.
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        // Vendor code changes rarely, so split it out of the app chunk:
        // redeploys then only invalidate the small app bundle.
        codeSplitting: {
          // Without this, any group would also pull in its dependencies (e.g. React).
          includeDependenciesRecursively: false,
          groups: [
            { name: 'react', test: /node_modules[\/](react|react-dom|scheduler)[\/]/, priority: 30 },
            { name: 'motion', test: /node_modules[\/](framer-motion|motion-dom|motion-utils)[\/]/, priority: 30 },
            // three.js and every library that extends its classes must share one
            // chunk: splitting them apart breaks `class X extends THREE.Y` at load.
            { name: 'three', test: /node_modules/, priority: 10 },
          ],
        },
      },
    },
  },
})
