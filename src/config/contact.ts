export const CONTACT_PEOPLE = [
  { name: 'Ufukcan AKDAĞ', number: '905308410563', displayNumber: '+90 530 841 05 63' },
  { name: 'İsmet AKDAĞ', number: '905353742015', displayNumber: '+90 535 374 20 15' },
] as const

// Main quote buttons and the contact form use the first contact.
export const WHATSAPP_NUMBER = CONTACT_PEOPLE[0].number
const QUOTE_MESSAGE = 'Merhaba, apartmanımız için temizlik hizmeti hakkında fiyat teklifi almak istiyorum.'

export function getWhatsAppUrl(number: string = WHATSAPP_NUMBER, message = QUOTE_MESSAGE) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_QUOTE_URL = getWhatsAppUrl()

export function getQuoteUrl(service?: string, region?: string) {
  if (region) {
    const message = `Merhaba, ${region} bölgesinde temizlik hizmeti hakkında fiyat teklifi almak istiyorum.`
    return getWhatsAppUrl(WHATSAPP_NUMBER, message)
  }
  if (!service) return WHATSAPP_QUOTE_URL
  const message = `Merhaba, ${service.toLocaleLowerCase('tr-TR')} hizmetiniz hakkında fiyat teklifi almak istiyorum.`
  return getWhatsAppUrl(WHATSAPP_NUMBER, message)
}
