import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getQuoteUrl } from '../config/contact'
import './Regions.css'

gsap.registerPlugin(ScrollTrigger)

const regions = [
  { name: 'Karşıyaka', description: 'Apartman merdivenleri, bina girişleri ve ortak alanlar için düzenli temizlik.' },
  { name: 'Çiğli', description: 'Apartman, ofis ve yaşam alanlarınızın ihtiyaçlarına uygun profesyonel hizmet.' },
  { name: 'Bostanlı', description: 'Evlerden iş yerlerine, her alan için özenli ve detaylı temizlik.' },
  { name: 'Mavişehir', description: 'Apartman ve site ortak alanlarından evlere, planlı ve titiz temizlik.' },
]

const RIPPLES = [0, 1, 2, 3]

export function Regions() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.regions-intro > *', {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.regions-intro', start: 'top 82%', once: true },
        })
        gsap.from('.region-row', {
          opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.region-list', start: 'top 85%', once: true },
        })
        gsap.timeline({ scrollTrigger: { trigger: '.regions-stage', start: 'top 78%', once: true } })
          .from('.regions-stage', { clipPath: 'inset(10% 8% 10% 8% round 28px)', duration: 1.3, ease: 'power4.inOut' })
          .from('.stage-rings circle', { scale: 0, transformOrigin: '50% 50%', duration: 1.2, ease: 'expo.out', stagger: 0.1 }, 0.4)
          .from('.stage-top, .stage-bottom', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.7)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <section className="regions" id="bolgeler" ref={root} aria-labelledby="regions-title" tabIndex={-1}>
    <div className="regions-layout">
      <div className="regions-left">
        <div className="regions-intro">
          <p className="section-eyebrow"><span aria-hidden="true" />Hizmet bölgelerimiz</p>
          <h2 id="regions-title">İzmir'de,<br /><span>size yakınız.</span></h2>
          <p className="regions-copy">Karşıyaka, Çiğli, Bostanlı ve Mavişehir başta olmak üzere yakın çevrede yaşam ve çalışma alanlarınıza özenle ulaşıyoruz.</p>
        </div>
        <ul className="region-list" aria-label="Hizmet verdiğimiz bölgeler">
          {regions.map((region, index) => {
            const open = active === index
            const panelId = `region-panel-${index}`
            return <li className={`region-row ${open ? 'is-open' : ''}`} key={region.name} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index) }}>
              <h3>
                <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setActive(index)}>
                  <span className="region-number" aria-hidden="true">0{index + 1}</span>
                  <span className="region-name">{region.name}</span>
                  <Plus className="region-toggle" size={20} aria-hidden="true" />
                </button>
              </h3>
              <div className="region-panel" id={panelId} inert={!open}>
                <div>
                  <p>{region.description}</p>
                  <a className="region-quote" href={getQuoteUrl(undefined, region.name)} target="_blank" rel="noopener noreferrer" aria-label={`${region.name} için fiyat teklifi al — WhatsApp, yeni sekmede açılır`}>Fiyat Teklifi Al<ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>

      {/* Decorative stage that mirrors the selected region; the list above carries the content. */}
      <div className="regions-stage" aria-hidden="true">
        <svg className="stage-rings" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <circle r="90" cx="300" cy="300" />
          <circle r="170" cx="300" cy="300" />
          <circle r="250" cx="300" cy="300" />
          <circle r="330" cx="300" cy="300" />
        </svg>
        <div className="stage-ripples">
          {RIPPLES.map(ripple => <span key={ripple} style={{ '--ripple-delay': `${ripple * 1.1}s` } as CSSProperties} />)}
          <i />
        </div>
        <div className="stage-top">
          <span>Hizmet bölgesi</span>
          <span className="stage-count"><strong key={active}>0{active + 1}</strong> / 0{regions.length}</span>
        </div>
        <div className="stage-bottom">
          <p className="stage-name" key={regions[active].name}>
            {[...regions[active].name].map((char, index) => <span key={index} style={{ '--char': index } as CSSProperties}>{char}</span>)}
          </p>
          <div className="stage-progress">
            {regions.map((region, index) => <span key={region.name} className={index === active ? 'is-active' : ''} />)}
          </div>
        </div>
      </div>
    </div>

    <div className="regions-nearby">
      <p>Bölgeniz listede yok mu? <span>Yakın çevredeki hizmet uygunluğunu birlikte değerlendirelim.</span></p>
      <a href={getQuoteUrl()} target="_blank" rel="noopener noreferrer" aria-label="Bölgeniz için bize ulaşın — WhatsApp, yeni sekmede açılır">Bize Ulaşın<ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  </section>
}
