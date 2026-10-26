import { useState } from 'react'
import { MapPin, Send } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../config/contact'
import { ContactPeople } from './ContactPeople'
import { services } from '../config/services'
import './Contact.css'

export function Contact() {
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

  return <section className="contact" id="iletisim" aria-labelledby="contact-title" tabIndex={-1}>
    <div className="contact-layout">
      <div className="contact-intro">
        <p className="section-eyebrow"><span />İLETİŞİM</p>
        <h2 id="contact-title">Temiz bir başlangıç<br /><span>bir mesaj uzağınızda.</span></h2>
        <p className="contact-description">İhtiyacınızı anlatın, alanınıza uygun temizlik hizmetini birlikte değerlendirelim. Fiyat teklifi için WhatsApp üzerinden bize ulaşabilirsiniz.</p>
        <ContactPeople />
        <div className="contact-area"><MapPin size={20} aria-hidden="true" /><div><h3>Hizmet bölgelerimiz</h3><p>Karşıyaka · Çiğli · Bostanlı · Mavişehir<br />ve yakın çevresi, İzmir</p></div></div>
      </div>
      <form className="contact-form" action={`https://wa.me/${WHATSAPP_NUMBER}`} method="get" target="_blank" rel="noopener noreferrer" aria-labelledby="contact-form-title">
        <div className="contact-form-heading"><h3 id="contact-form-title">Fiyat teklifi isteyin</h3><p>Hizmeti ve bölgenizi seçin, talebinizi WhatsApp'ta paylaşın.</p></div>
        <input type="hidden" name="text" value={message} />
        <div className="contact-field"><label htmlFor="contact-name">Ad Soyad <span>(isteğe bağlı)</span></label><input id="contact-name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={100} placeholder="Adınız ve soyadınız" /></div>
        <div className="contact-field-row">
          <div className="contact-field"><label htmlFor="contact-service">Hizmet <span aria-hidden="true">*</span></label><select id="contact-service" required value={service} onChange={event => setService(event.target.value)}><option value="" disabled>Hizmet seçin</option>{services.map(item => <option key={item.id} value={item.title}>{item.title}</option>)}</select></div>
          <div className="contact-field"><label htmlFor="contact-region">Bölge <span aria-hidden="true">*</span></label><select id="contact-region" required value={region} onChange={event => setRegion(event.target.value)}><option value="" disabled>Bölge seçin</option>{['Karşıyaka', 'Çiğli', 'Bostanlı', 'Mavişehir', 'Diğer / Yakın çevre'].map(item => <option key={item} value={item}>{item}</option>)}</select></div>
        </div>
        <div className="contact-field"><label htmlFor="contact-details">İhtiyacınız hakkında <span>(isteğe bağlı)</span></label><textarea id="contact-details" rows={4} maxLength={1500} value={details} onChange={event => setDetails(event.target.value)} placeholder="Örneğin: 5 katlı apartmanımız için haftalık merdiven temizliği istiyoruz." /></div>
        <p className="contact-required">* İşaretli alanlar zorunludur.</p>
        <button className="quote-link contact-submit" type="submit"><span>WhatsApp'tan Teklif İste</span><Send size={18} aria-hidden="true" /></button>
        <p className="contact-form-note">Bilgileriniz bir WhatsApp mesajına eklenir. Mesajı açılan sekmede siz gönderirsiniz.</p>
      </form>
    </div>
  </section>
}
