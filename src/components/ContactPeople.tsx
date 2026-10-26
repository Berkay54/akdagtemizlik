import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { CONTACT_PEOPLE, getWhatsAppUrl } from '../config/contact'
import './ContactPeople.css'

export function ContactPeople({ compact = false }: { compact?: boolean }) {
  return <ul className={`contact-people ${compact ? 'contact-people-compact' : ''}`} aria-label="İletişim kişilerimiz">
    {CONTACT_PEOPLE.map(person => <li className="contact-person" key={person.number}>
      <h3>{person.name}</h3>
      <a className="contact-person-phone" href={`tel:+${person.number}`} aria-label={`${person.name} kişisini arayın: ${person.displayNumber}`}><Phone size={16} aria-hidden="true" /><span>{person.displayNumber}</span></a>
      <a className="contact-person-whatsapp" href={getWhatsAppUrl(person.number)} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} kişisine WhatsApp üzerinden yazın, yeni sekmede açılır`}><MessageCircle size={16} aria-hidden="true" /><span>WhatsApp'tan Yazın</span><ArrowUpRight size={14} aria-hidden="true" /></a>
    </li>)}
  </ul>
}
