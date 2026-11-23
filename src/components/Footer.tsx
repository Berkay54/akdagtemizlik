import { useLayoutEffect, useRef } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ContactPeople } from './ContactPeople'
import { socialLinks } from '../config/social'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const year = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date())

const navigation = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Bölgeler', href: '#bolgeler' },
  { label: 'İletişim', href: '#iletisim' },
]

export function Footer() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.footer-grid > *', {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.footer-grid', start: 'top 88%', once: true },
        })
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <footer className="site-footer" ref={root}>
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="wordmark" href="#main" aria-label="Akdağ Temizlik ana sayfa"><strong>Akdağ</strong><span>TEMİZLİK</span></a>
          <p>Yaşam ve çalışma alanlarınız için düzenli, titiz ve profesyonel temizlik.</p>
          <span className="footer-tagline">İzmir'de her adımda özen.</span>
          <ul className="footer-socials" aria-label="Sosyal medya">
            {socialLinks.map(({ label, icon, href }) => <li key={label}>
              {href
                ? <a className="footer-social-icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}, yeni sekmede açılır`} title={label}><img src={icon} width={20} height={20} alt="" /></a>
                : <span className="footer-social-icon is-pending" role="img" aria-label={label} title={label}><img src={icon} width={20} height={20} alt="" /></span>}
            </li>)}
          </ul>
        </div>
        <nav className="footer-column" aria-label="Alt menü"><p className="footer-heading">Keşfedin</p><ul>{navigation.map(item => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav>
        <div className="footer-column"><p className="footer-heading">Hizmet Bölgelerimiz</p><ul className="footer-regions">{['Karşıyaka', 'Çiğli', 'Bostanlı', 'Mavişehir'].map(region => <li key={region}>{region}</li>)}</ul><a className="footer-area-link" href="#bolgeler">Bölgeleri inceleyin<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <div className="footer-column footer-contact"><p className="footer-heading">Birlikte Başlayalım</p><p>İhtiyacınıza uygun temizlik için bize ulaşın.</p><ContactPeople compact /></div>
      </div>
      <div className="footer-bottom">
        <p>© {year} Akdağ Temizlik. Tüm hakları saklıdır.</p>
        <a href="#main" className="footer-top">Başa Dön<span><ArrowUp size={16} aria-hidden="true" /></span></a>
      </div>
    </div>
  </footer>
}
