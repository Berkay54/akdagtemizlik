import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bundle GSAP into the prerender build so Node does not have to resolve its non-ESM entry points.
  ssr: { noExternal: ['gsap'] },
})
