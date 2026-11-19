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
  const [current, setCurrent] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Highlight the menu item of the section in the middle of the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = links.map(({ href }) => document.querySelector(href)).filter((section): section is Element => section !== null)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setCurrent(`#${entry.target.id}`)
        else if (`#${entry.target.id}` === links[0].href && entry.boundingClientRect.top > 0) setCurrent('')
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
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
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} ref={header}>
    <a className="wordmark" href="#main" aria-label="Akdağ Temizlik ana sayfa"><strong>Akdağ</strong><span>TEMİZLİK</span></a>
    <nav className={`navigation ${open ? 'is-open' : ''}`} id="navigation" aria-label="Ana menü">
      {links.map(({ label, href }) => <a key={href} href={href} className={current === href ? 'is-current' : undefined} aria-current={current === href ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <span className="mobile-menu-note">Özen, her adımda.</span>
    </nav>
    <div className="header-actions"><QuoteLink className="header-quote" /><button className="menu-toggle" ref={toggle} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
  </header>
}
