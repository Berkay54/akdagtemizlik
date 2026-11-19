import { ArrowRight } from 'lucide-react'
import { QuoteLink } from './QuoteLink'
import { HeroSlider } from './HeroSlider'

const TRUST_ITEMS = ['Profesyonel Ekip', 'Düzenli Hizmet', 'Titiz Çalışma']

export function Hero() {
  // The intro animation is pure CSS (App.css) so it starts with the first paint of the prerendered HTML.
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-main">
      <div className="hero-content">
        <h1 id="hero-title">
          <span className="hero-eyebrow"><span aria-hidden="true" />İzmir'de apartman ve merdiven temizliği</span>
          <span className="headline-line"><span>Apartmanınızın</span></span>
          <span className="headline-line"><span>her adımında,</span></span>
          <span className="headline-line accent"><span>özenli temizlik.</span></span>
        </h1>
        <p className="hero-copy">Merdivenlerden bina girişine, ortak yaşam alanlarınızda titiz temizlik. Karşıyaka, Çiğli ve çevresinde profesyonel ekibimizle düzenli hizmet sunuyoruz.</p>
        <div className="hero-actions"><QuoteLink /><a className="text-link" href="#hizmetler">Hizmetleri İncele<ArrowRight size={18} aria-hidden="true" /></a></div>
        <ul className="hero-trust" aria-label="Hizmet yaklaşımımız">
          {TRUST_ITEMS.map((label, index) => <li key={label}><span aria-hidden="true">0{index + 1}</span>{label}</li>)}
        </ul>
      </div>
      <HeroSlider />
    </div>
  </section>
}
