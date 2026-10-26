import instagramIcon from '../assets/social/instagram.svg'
import youtubeIcon from '../assets/social/youtube.svg'
import whatsappIcon from '../assets/social/whatsapp.svg'
import { getQuoteUrl } from './contact'

// Add the Instagram profile and YouTube channel URLs when available.
export const socialLinks: { label: string; icon: string; href: string | null }[] = [
  { label: 'Instagram', icon: instagramIcon, href: null },
  { label: 'YouTube', icon: youtubeIcon, href: null },
  { label: 'WhatsApp', icon: whatsappIcon, href: getQuoteUrl() },
]
