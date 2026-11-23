import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { CONTACT_PEOPLE, getWhatsAppUrl } from '../config/contact'
import './ContactPeople.css'

function initials(name: string) {
  return name.split(' ').filter(Boolean).map(part => part[0]).slice(0, 2).join('').toLocaleUpperCase('tr-TR')
}

export function ContactPeople({ compact = false }: { compact?: boolean }) {
  return <ul className={`contact-people ${compact ? 'contact-people-compact' : ''}`} aria-label="İletişim kişilerimiz">
    {CONTACT_PEOPLE.map(person => <li className="contact-person" key={person.number}>
      {!compact && <span className="contact-person-avatar" aria-hidden="true">{initials(person.name)}</span>}
      <div className="contact-person-body">
        {compact ? <p className="contact-person-name">{person.name}</p> : <h3 className="contact-person-name">{person.name}</h3>}
        <a className="contact-person-phone" href={`tel:+${person.number}`} aria-label={`${person.name} kişisini arayın: ${person.displayNumber}`}><Phone size={16} aria-hidden="true" /><span>{person.displayNumber}</span></a>
        <a className="contact-person-whatsapp" href={getWhatsAppUrl(person.number)} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} kişisine WhatsApp üzerinden yazın, yeni sekmede açılır`}><MessageCircle size={16} aria-hidden="true" /><span>WhatsApp'tan Yazın</span><ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </li>)}
  </ul>
}
