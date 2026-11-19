import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { FormEvent } from 'react'
import { WHATSAPP_NUMBER, getWhatsAppUrl } from '../config/contact'
import { ContactPeople } from './ContactPeople'
import { services } from '../config/services'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const REGIONS = ['Karşıyaka', 'Çiğli', 'Bostanlı', 'Mavişehir', 'Diğer / Yakın çevre']

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [region, setRegion] = useState('')
  const [details, setDetails] = useState('')
  const message = [
    'Merhaba, temizlik hizmeti hakkında fiyat teklifi almak istiyorum.',
    name.trim() && `Ad Soyad: ${name.trim()}`,
    `Hizmet: ${service}`,
    `Bölge: ${region}`,
    details.trim() && `Detaylar: ${details.trim()}`,
  ].filter(Boolean).join('\n')
  const preview = [
    'Merhaba, temizlik hizmeti hakkında fiyat teklifi almak istiyorum.',
    name.trim() && `Ad Soyad: ${name.trim()}`,
    `Hizmet: ${service || '—'}`,
    `Bölge: ${region || '—'}`,
    details.trim() && `Detaylar: ${details.trim()}`,
  ].filter(Boolean).join('\n')

  function submit(event: FormEvent<HTMLFormElement>) {
    // Radio groups only drive state; send just the composed message.
    event.preventDefault()
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), '_blank', 'noopener,noreferrer')
  }

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.contact-intro .section-eyebrow, .contact-description, .contact-person, .contact-area', {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.contact-intro', start: 'top 80%', once: true },
        })
        gsap.from('.contact-intro .headline-line > span', {
          yPercent: 108, duration: 1, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: '.contact-intro h2', start: 'top 85%', once: true },
        })
        gsap.timeline({ scrollTrigger: { trigger: '.contact-form', start: 'top 82%', once: true } })
          .from('.contact-form', { clipPath: 'inset(8% 6% 8% 6% round 28px)', opacity: 0, duration: 1.2, ease: 'power4.inOut' })
          .from('.contact-form > *', { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', stagger: 0.06 }, 0.5)
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <section className="contact" id="iletisim" ref={root} aria-labelledby="contact-title" tabIndex={-1}>
    <div className="contact-glow" aria-hidden="true" />
    <div className="contact-layout">
      <div className="contact-intro">
        <p className="section-eyebrow"><span aria-hidden="true" />İletişim</p>
        <h2 id="contact-title">
          <span className="headline-line"><span>Temiz bir başlangıç</span></span>
          <span className="headline-line accent"><span>bir mesaj uzağınızda.</span></span>
        </h2>
        <p className="contact-description">İhtiyacınızı anlatın, alanınıza uygun temizlik hizmetini birlikte değerlendirelim. Fiyat teklifi için WhatsApp üzerinden bize ulaşabilirsiniz.</p>
        <ContactPeople />
        <div className="contact-area"><MapPin size={18} aria-hidden="true" /><div><h3>Hizmet bölgelerimiz</h3><p>Karşıyaka · Çiğli · Bostanlı · Mavişehir ve yakın çevresi, İzmir</p></div></div>
      </div>

      <form className="contact-form" action={`https://wa.me/${WHATSAPP_NUMBER}`} method="get" target="_blank" rel="noopener noreferrer" onSubmit={submit} aria-labelledby="contact-form-title">
        <div className="contact-form-heading"><h3 id="contact-form-title">Fiyat teklifi isteyin</h3><p>Hizmeti ve bölgenizi seçin, talebinizi WhatsApp'ta paylaşın.</p></div>
        <input type="hidden" name="text" value={message} />

        <fieldset className="contact-choices">
          <legend>Hizmet <span aria-hidden="true">*</span></legend>
          <div className="contact-chips">
            {services.map((item, index) => <label className="contact-chip" key={item.id}>
              <input type="radio" name="service-choice" value={item.title} required={index === 0} checked={service === item.title} onChange={() => setService(item.title)} />
              <span><Check size={14} aria-hidden="true" />{item.title}</span>
            </label>)}
          </div>
        </fieldset>

        <fieldset className="contact-choices">
          <legend>Bölge <span aria-hidden="true">*</span></legend>
          <div className="contact-chips">
            {REGIONS.map((item, index) => <label className="contact-chip" key={item}>
              <input type="radio" name="region-choice" value={item} required={index === 0} checked={region === item} onChange={() => setRegion(item)} />
              <span><Check size={14} aria-hidden="true" />{item}</span>
            </label>)}
          </div>
        </fieldset>

        <div className="contact-field">
          <label htmlFor="contact-name">Ad Soyad <span>(isteğe bağlı)</span></label>
          <input id="contact-name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={100} placeholder="Adınız ve soyadınız" />
          <i aria-hidden="true" />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-details">İhtiyacınız hakkında <span>(isteğe bağlı)</span></label>
          <textarea id="contact-details" rows={3} maxLength={1500} value={details} onChange={event => setDetails(event.target.value)} placeholder="Örneğin: 5 katlı apartmanımız için haftalık merdiven temizliği istiyoruz." />
          <i aria-hidden="true" />
        </div>

        <div className="contact-preview" aria-hidden="true">
          <span className="contact-preview-label">Mesaj önizlemesi</span>
          <p className="contact-bubble">{preview}</p>
        </div>

        <p className="contact-required">* İşaretli alanlar zorunludur.</p>
        <button className="quote-link contact-submit" type="submit"><span>WhatsApp'tan Teklif İste</span><ArrowUpRight size={18} aria-hidden="true" /></button>
        <p className="contact-form-note">Bilgileriniz bir WhatsApp mesajına eklenir. Mesajı açılan sekmede siz gönderirsiniz.</p>
      </form>
    </div>
  </section>
}
