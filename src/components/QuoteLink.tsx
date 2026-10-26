import { ArrowUpRight } from 'lucide-react'
import { getQuoteUrl } from '../config/contact'

export function QuoteLink({ className = '', service }: { className?: string; service?: string }) {
  return <a className={`quote-link ${className}`} href={getQuoteUrl(service)} target="_blank" rel="noopener noreferrer" aria-label={`${service ? `${service} için ` : ''}Fiyat Teklifi Al — WhatsApp, yeni sekmede açılır`}><span>Fiyat Teklifi Al</span><ArrowUpRight size={17} aria-hidden="true" /></a>
}
