import { services } from '../config/services'
import { QuoteLink } from './QuoteLink'
import './Services.css'

export function Services() {
  return <section className="services" id="hizmetler" aria-labelledby="services-title" tabIndex={-1}>
    <div className="services-heading">
      <div><p className="section-eyebrow"><span />HİZMETLERİMİZ</p><h2 id="services-title">Her alana uygun,<br /><span>aynı titiz yaklaşım.</span></h2></div>
      <p className="services-intro">Apartmanınızdan iş yerinize, yaşam ve çalışma alanlarınız için ihtiyaçlarınıza uygun profesyonel temizlik.</p>
    </div>
    <div className="services-grid">
      {services.map((service, index) => {
        const Icon = service.icon
        return <article className="service-card" key={service.id} aria-labelledby={`service-${service.id}`}>
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
