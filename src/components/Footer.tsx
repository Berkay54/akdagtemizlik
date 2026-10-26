import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { ContactPeople } from './ContactPeople'
import { socialLinks } from '../config/social'
import './Footer.css'

const year = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', timeZone: 'Europe/Istanbul' }).format(new Date())

const navigation = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Bölgeler', href: '#bolgeler' },
  { label: 'İletişim', href: '#iletisim' },
]

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="wordmark" href="#main" aria-label="Akdağ Temizlik ana sayfa">AKDAĞ<span>TEMİZLİK</span></a>
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
        <nav className="footer-column" aria-label="Alt menü"><h2>Keşfedin</h2><ul>{navigation.map(item => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav>
        <div className="footer-column"><h2>Hizmet Bölgelerimiz</h2><ul className="footer-regions">{['Karşıyaka', 'Çiğli', 'Bostanlı', 'Mavişehir'].map(region => <li key={region}>{region}</li>)}</ul><a className="footer-area-link" href="#bolgeler">Bölgeleri inceleyin<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <div className="footer-column footer-contact"><h2>Birlikte Başlayalım</h2><p>İhtiyacınıza uygun temizlik için bize ulaşın.</p><ContactPeople compact /></div>
      </div>
      <div className="footer-bottom"><p>© {year} Akdağ Temizlik. Tüm hakları saklıdır.</p><a href="#main" className="footer-top">Başa Dön<ArrowUp size={17} aria-hidden="true" /></a></div>
    </div>
  </footer>
}

