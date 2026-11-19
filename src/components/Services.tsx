import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { services } from '../config/services'
import { QuoteLink } from './QuoteLink'
import './Services.css'

export function Services() {
  const root = useRef<HTMLElement>(null)

  // Reveal on scroll. Content stays visible unless JS arms the effect, and
  // reduced-motion users never get it.
  useEffect(() => {
    const section = root.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    section.classList.add('is-armed')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 })
    section.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => {
      observer.disconnect()
      section.classList.remove('is-armed')
    }
  }, [])

  return <section className="services" id="hizmetler" ref={root} aria-labelledby="services-title" tabIndex={-1}>
    <div className="services-heading">
      <div className="reveal">
        <p className="section-eyebrow"><span aria-hidden="true" />Hizmetlerimiz</p>
        <h2 id="services-title">Her alana uygun,<br /><span>aynı titiz yaklaşım.</span></h2>
      </div>
      <p className="services-intro reveal" style={{ '--reveal-delay': '120ms' } as CSSProperties}>Apartmanınızdan iş yerinize, yaşam ve çalışma alanlarınız için ihtiyaçlarınıza uygun profesyonel temizlik.</p>
    </div>
    <div className="services-grid">
      {services.map((service, index) => {
        const Icon = service.icon
        return <article className="service-card reveal" key={service.id} aria-labelledby={`service-${service.id}`} style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}>
          <div className={`service-media service-media-${service.id}`}>
            {service.image ? <img src={service.image} srcSet={service.imageSrcSet} sizes="(max-width: 639px) 90vw, (max-width: 1100px) 44vw, (max-width: 1800px) 21vw, 380px" alt={service.imageAlt} loading="lazy" decoding="async" width={service.imageWidth} height={service.imageHeight} /> : <div className="service-image-placeholder" role="img" aria-label={`${service.imageAlt} görseli için ayrılmış alan`}><Icon size={42} aria-hidden="true" /><span>Görsel yakında</span></div>}
            <span className="service-index" aria-hidden="true">0{index + 1}</span>
          </div>
          <div className="service-body">
            <h3 id={`service-${service.id}`}>{service.title}</h3>
            <p>{service.description}</p>
            <QuoteLink className="service-quote" service={service.title} />
          </div>
        </article>
      })}
    </div>
  </section>
}
