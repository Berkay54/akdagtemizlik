import { optimizedImages } from './images'
import { Building2, BriefcaseBusiness, HardHat, House } from 'lucide-react'
const stairsImage = optimizedImages['merdiven-temizligi']
const constructionImage = optimizedImages['insaat-sonrasi-temizlik']
const villaImage = optimizedImages['ev-villa-temizligi']
const officeImage = optimizedImages['ofis-temizligi']

export const services = [
  {
    id: 'apartman-merdiven',
    title: 'Apartman Merdiven Temizliği',
    description: 'Merdivenler, korkuluklar, kat sahanlıkları ve bina girişlerinde düzenli temizlik. Ortak yaşam alanlarınız için her adımda özen.',
    image: stairsImage.src, imageSrcSet: stairsImage.srcSet, imageWidth: stairsImage.width, imageHeight: stairsImage.height,
    imageAlt: 'Apartman merdiven korkuluklarını özenle temizleyen görevli',
    icon: Building2,
  },
  {
    id: 'ofis-is-yeri',
    title: 'Ofis ve İş Yeri Temizliği',
    description: 'Çalışma alanları, toplantı odaları ve ortak kullanım alanlarında titiz temizlik. Ekibiniz ve misafirleriniz için temiz bir çalışma ortamı.',
    image: officeImage.src, imageSrcSet: officeImage.srcSet, imageWidth: officeImage.width, imageHeight: officeImage.height,
    imageAlt: 'Modern ofiste cam bölmeleri ve zemini temizleyen profesyonel ekip',
    icon: BriefcaseBusiness,
  },
  {
    id: 'insaat-sonrasi',
    title: 'İnşaat Sonrası Temizlik',
    description: 'Tadilat ve inşaat sonrası biriken toz, kir ve kalıntılara yönelik detaylı temizlik. Yeni alanınızı kullanıma hazırlayan özenli çalışma.',
    image: constructionImage.src, imageSrcSet: constructionImage.srcSet, imageWidth: constructionImage.width, imageHeight: constructionImage.height,
    imageAlt: 'İnşaat sonrası zemindeki toz ve kalıntıları süpüren, camları temizleyen ekip',
    icon: HardHat,
  },
  {
    id: 'ev-villa',
    title: 'Ev ve Villa Temizliği',
    description: 'Mutfaktan banyoya, odalardan yaşam alanlarına detaylı temizlik. Evinizin ihtiyaçlarına uygun, titiz ve planlı bir hizmet.',
    image: villaImage.src, imageSrcSet: villaImage.srcSet, imageWidth: villaImage.width, imageHeight: villaImage.height,
    imageAlt: 'Aydınlık villanın mutfak tezgâhını özenle temizleyen görevli',
    icon: House,
  },
]

