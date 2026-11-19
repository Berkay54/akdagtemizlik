import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/plus-jakarta-sans'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>

// Production HTML is prerendered at build time (scripts/prerender.mjs); dev starts empty.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
