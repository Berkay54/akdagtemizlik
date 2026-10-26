import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { QuoteLink } from './QuoteLink'

const links = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Bölgeler', href: '#bolgeler' },
  { label: 'İletişim', href: '#iletisim' },
]
export function Header() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const reset = () => setOpen(false)
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    desktop.addEventListener('change', reset)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', outside)
      desktop.removeEventListener('change', reset)
    }
  }, [open])
  return <header className="site-header" ref={header}>
    <a className="wordmark" href="#main" aria-label="Akdağ Temizlik ana sayfa">AKDAĞ<span>TEMİZLİK</span></a>
    <nav className={`navigation ${open ? 'is-open' : ''}`} id="navigation" aria-label="Ana menü">
      {links.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <span className="mobile-menu-note">Özen, her adımda.</span>
    </nav>
    <div className="header-actions"><QuoteLink className="header-quote" /><button className="menu-toggle" ref={toggle} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
  </header>
}
