import { useLayoutEffect, useRef } from 'react'
import { CalendarDays, ScanLine, UsersRound } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { optimizedImages } from '../config/images'
import { QuoteLink } from './QuoteLink'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  { icon: CalendarDays, title: 'Düzenli hizmet', description: 'Alanınızın ihtiyaçlarına uygun, planlı bir temizlik yaklaşımı.' },
  { icon: ScanLine, title: 'Detaylara özen', description: 'Sık kullanılan yüzeylerden gözden kaçan köşelere titiz çalışma.' },
  { icon: UsersRound, title: 'Profesyonel ekip', description: 'Yaşam ve çalışma alanlarınıza saygıyla yaklaşan bir ekip.' },
]

const LEAD = 'Bizim için temizlik, yaşadığınız ve çalıştığınız alanlara gösterilen özendir.'
const MARQUEE_WORDS = ['Düzenli hizmet', 'Detaylara özen', 'Profesyonel ekip', 'Titiz çalışma']

const teamImage = optimizedImages['duzenli-temizlik']

export function About() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        // Image: opens from a smaller rounded window, then drifts with scroll.
        gsap.from('.about-visual', {
          clipPath: 'inset(14% 12% 14% 12% round 24px)', duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about-visual', start: 'top 82%', once: true },
        })
        gsap.fromTo('.about-visual > img', { yPercent: -7 }, {
          yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: '.about-visual', start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from('.about-visual figcaption', {
          y: 40, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-visual', start: 'top 60%', once: true },
        })

        // Heading lines rise, then the lead fills in word by word as you read.
        gsap.from('.about-content .headline-line > span', {
          yPercent: 108, duration: 1, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: '.about-content h2', start: 'top 85%', once: true },
        })
        gsap.from('.about-content .section-eyebrow', {
          opacity: 0, x: -16, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-content', start: 'top 85%', once: true },
        })
        // Fill words from the readable muted tone to full ink (stays above 4.5:1 contrast throughout).
        gsap.fromTo('.about-lead .word', { color: '#4a6272' }, {
          color: '#0e2a3b', ease: 'none', stagger: 0.12,
          scrollTrigger: { trigger: '.about-lead', start: 'top 82%', end: 'bottom 48%', scrub: 0.6 },
        })
        gsap.from('.about-description, .about-principles li, .about-actions', {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: '.about-description', start: 'top 85%', once: true },
        })

        // Marquee: steady, independent of scroll.
        gsap.to('.about-marquee-track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
      }, root)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  return <section className="about" id="hakkimizda" ref={root} aria-labelledby="about-title" tabIndex={-1}>
    <div className="about-marquee" aria-hidden="true">
      <div className="about-marquee-track">
        {[0, 1].map(copy => <span className="about-marquee-group" key={copy}>
          {MARQUEE_WORDS.map(word => <span key={word}>{word}<i /></span>)}
        </span>)}
      </div>
    </div>
    <div className="about-layout">
      <figure className="about-visual">
        <img src={teamImage.src} srcSet={teamImage.srcSet} sizes="(max-width: 899px) 90vw, (max-width: 1800px) 44vw, 720px" alt="Apartman merdivenlerinde korkuluk ve zemin temizliği yapan ekip" loading="lazy" decoding="async" width={teamImage.width} height={teamImage.height} />
        <figcaption><span>Akdağ Temizlik</span><p>Ortak alanlarda,<br />ortak özen.</p></figcaption>
      </figure>
      <div className="about-content">
        <p className="section-eyebrow"><span aria-hidden="true" />Hakkımızda</p>
        <h2 id="about-title">
          <span className="headline-line"><span>Temiz bir alan.</span></span>
          <span className="headline-line accent"><span>İçiniz rahat bir gün.</span></span>
        </h2>
        <p className="about-lead">{LEAD.split(' ').map((word, index) => <span className="word" key={index}>{word} </span>)}</p>
        <p className="about-description">Akdağ Temizlik olarak İzmir'de, başta Karşıyaka ve Çiğli olmak üzere Bostanlı, Mavişehir ve çevresinde profesyonel temizlik hizmeti sunuyoruz. Apartman merdivenleri ve ortak alanlardan ofislere, inşaat sonrası alanlardan ev ve villalara kadar her mekâna aynı titizlikle yaklaşıyoruz.</p>
        <p className="about-description">Amacımız; düzenli, özenli ve ihtiyaçlarınıza uygun bir hizmetle yaşamınıza kolaylık katmak. Bina girişinden son basamağa, çalışma masanızdan evinizin köşelerine kadar temizliği bir bütün olarak ele alıyoruz.</p>
        <ul className="about-principles" aria-label="Hizmet yaklaşımımız">
          {principles.map(({ icon: Icon, title, description }) => <li key={title}><span className="about-principle-icon"><Icon size={20} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ul>
        <div className="about-actions"><QuoteLink /><span>İhtiyacınızı birlikte değerlendirelim.</span></div>
      </div>
    </div>
  </section>
}
