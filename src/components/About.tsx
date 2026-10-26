import { CalendarDays, ScanLine, UsersRound } from 'lucide-react'
import { optimizedImages } from '../config/images'
import { QuoteLink } from './QuoteLink'
import './About.css'

const principles = [
  { icon: CalendarDays, title: 'Düzenli hizmet', description: 'Alanınızın ihtiyaçlarına uygun, planlı bir temizlik yaklaşımı.' },
  { icon: ScanLine, title: 'Detaylara özen', description: 'Sık kullanılan yüzeylerden gözden kaçan köşelere titiz çalışma.' },
  { icon: UsersRound, title: 'Profesyonel ekip', description: 'Yaşam ve çalışma alanlarınıza saygıyla yaklaşan bir ekip.' },
]

const teamImage = optimizedImages['duzenli-temizlik']

export function About() {
  return <section className="about" id="hakkimizda" aria-labelledby="about-title" tabIndex={-1}>
    <div className="about-layout">
      <figure className="about-visual">
        <img src={teamImage.src} srcSet={teamImage.srcSet} sizes="(max-width: 899px) 90vw, (max-width: 1800px) 44vw, 720px" alt="Apartman merdivenlerinde korkuluk ve zemin temizliği yapan ekip" loading="lazy" decoding="async" width={teamImage.width} height={teamImage.height} />
        <figcaption><span>AKDAĞ TEMİZLİK</span><p>Ortak alanlarda,<br />ortak özen.</p></figcaption>
      </figure>
      <div className="about-content">
        <p className="section-eyebrow"><span />HAKKIMIZDA</p>
        <h2 id="about-title">Temiz bir alan.<br /><span>İçiniz rahat bir gün.</span></h2>
        <p className="about-lead">Bizim için temizlik, yaşadığınız ve çalıştığınız alanlara gösterilen özendir.</p>
        <p className="about-description">Akdağ Temizlik olarak İzmir'de, başta Karşıyaka ve Çiğli olmak üzere Bostanlı, Mavişehir ve çevresinde profesyonel temizlik hizmeti sunuyoruz. Apartman merdivenleri ve ortak alanlardan ofislere, inşaat sonrası alanlardan ev ve villalara kadar her mekâna aynı titizlikle yaklaşıyoruz.</p>
        <p className="about-description">Amacımız; düzenli, özenli ve ihtiyaçlarınıza uygun bir hizmetle yaşamınıza kolaylık katmak. Bina girişinden son basamağa, çalışma masanızdan evinizin köşelerine kadar temizliği bir bütün olarak ele alıyoruz.</p>
        <ul className="about-principles" aria-label="Hizmet yaklaşımımız">
          {principles.map(({ icon: Icon, title, description }) => <li key={title}><Icon size={22} aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ul>
        <div className="about-actions"><QuoteLink /><span>İhtiyacınızı birlikte değerlendirelim.</span></div>
      </div>
    </div>
  </section>
}
