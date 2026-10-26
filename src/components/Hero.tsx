import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, Building2, Check, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { QuoteLink } from './QuoteLink'
import { HeroSlider } from './HeroSlider'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({ defaults: { duration: 0.65, ease: 'power3.out' } })
          .from('.hero-eyebrow', { opacity: 0, y: 8 })
          .from('.headline-line > span', { yPercent: 105, stagger: 0.06 }, 0.08)
          .from('.hero-copy, .hero-actions', { opacity: 0, y: 10, stagger: 0.07 }, 0.2)
          .from('.hero-slider', { opacity: 0, duration: 0.8 }, 0.1)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])


  return <section className="hero" ref={root} aria-labelledby="hero-title">
    <div className="hero-main">
      <div className="hero-content">
        <p className="hero-eyebrow"><span />İZMİR'DE PROFESYONEL APARTMAN TEMİZLİĞİ</p>
        <h1 id="hero-title">
          <span className="headline-line"><span>Apartmanınızın</span></span>
          <span className="headline-line"><span>her adımında,</span></span>
          <span className="headline-line accent"><span>özenli temizlik.</span></span>
        </h1>
        <p className="hero-copy">Merdivenlerden bina girişine, ortak yaşam alanlarınızda titiz temizlik. Karşıyaka, Çiğli ve çevresinde profesyonel ekibimizle düzenli hizmet sunuyoruz.</p>
        <div className="hero-actions"><QuoteLink /><a className="text-link" href="#hizmetler">Hizmetleri İncele<ArrowRight size={17} aria-hidden="true" /></a></div>
        <div className="hero-service-note"><Building2 size={21} aria-hidden="true" /><p>Apartman ve site yönetimleri için<span>Düzenli bakım. Temiz ortak alanlar.</span></p></div>
      </div>
      <HeroSlider />
    </div>
    <div className="hero-bottom">
      <ul className="trust-list" aria-label="Hizmet yaklaşımımız">{['Profesyonel Ekip', 'Düzenli Hizmet', 'Titiz Çalışma'].map(label => <li key={label}><Check size={16} aria-hidden="true" />{label}</li>)}</ul>
      <p className="location"><MapPin size={16} aria-hidden="true" /><span>Karşıyaka · Bostanlı · Mavişehir · Çiğli</span></p>
    </div>
  </section>
}

