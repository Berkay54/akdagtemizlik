import { MapPin, ArrowUpRight, Compass } from 'lucide-react'
import { getQuoteUrl } from '../config/contact'
import './Regions.css'

const regions = [
  { name: 'Karşıyaka', description: 'Apartman merdivenleri, bina girişleri ve ortak alanlar için düzenli temizlik.' },
  { name: 'Çiğli', description: 'Apartman, ofis ve yaşam alanlarınızın ihtiyaçlarına uygun profesyonel hizmet.' },
  { name: 'Bostanlı', description: 'Evlerden iş yerlerine, her alan için özenli ve detaylı temizlik.' },
  { name: 'Mavişehir', description: 'Apartman ve site ortak alanlarından evlere, planlı ve titiz temizlik.' },
]

export function Regions() {
  return <section className="regions" id="bolgeler" aria-labelledby="regions-title" tabIndex={-1}>
    <div className="regions-layout">
      <div className="regions-intro">
        <p className="section-eyebrow"><span />HİZMET BÖLGELERİMİZ</p>
        <h2 id="regions-title">İzmir'de,<br /><span>size yakınız.</span></h2>
        <p>Karşıyaka, Çiğli, Bostanlı ve Mavişehir başta olmak üzere yakın çevrede yaşam ve çalışma alanlarınıza özenle ulaşıyoruz.</p>
        <div className="regions-local-note"><Compass size={23} aria-hidden="true" /><div><strong>Yerel hizmet, aynı özen.</strong><span>İhtiyacınıza uygun temizlik için bize ulaşın.</span></div></div>
      </div>
      <ul className="regions-grid" aria-label="Hizmet verdiğimiz bölgeler">
        {regions.map((region, index) => <li className="region-card" key={region.name}>
          <div className="region-card-top"><MapPin size={24} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
          <h3>{region.name}</h3>
          <p>{region.description}</p>
          <a className="region-quote" href={getQuoteUrl(undefined, region.name)} target="_blank" rel="noopener noreferrer" aria-label={`${region.name} için fiyat teklifi al — WhatsApp, yeni sekmede açılır`}>Fiyat Teklifi Al<ArrowUpRight size={17} aria-hidden="true" /></a>
        </li>)}
      </ul>
    </div>
    <div className="regions-nearby"><MapPin size={18} aria-hidden="true" /><p>Bölgeniz listede yok mu? <span>Yakın çevredeki hizmet uygunluğunu birlikte değerlendirelim.</span></p><a href={getQuoteUrl()} target="_blank" rel="noopener noreferrer" aria-label="Bölgeniz için bize ulaşın — WhatsApp, yeni sekmede açılır">Bize Ulaşın<ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>
}
