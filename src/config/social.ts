import instagramIcon from '../assets/social/instagram.svg'
import youtubeIcon from '../assets/social/youtube.svg'
import whatsappIcon from '../assets/social/whatsapp.svg'
import { getQuoteUrl } from './contact'

export const socialLinks: { label: string; icon: string; href: string | null }[] = [
  { label: 'Instagram', icon: instagramIcon, href: 'https://www.instagram.com/izmir.akdag.temizlik/' },
  { label: 'YouTube', icon: youtubeIcon, href: 'https://www.youtube.com/@%C4%B0ZM%C4%B0R.AKDA%C4%9E.TEM%C4%B0ZL%C4%B0K' },
  { label: 'WhatsApp', icon: whatsappIcon, href: getQuoteUrl() },
]
