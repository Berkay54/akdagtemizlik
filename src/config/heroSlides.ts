import { optimizedImages } from './images'
const stairsImage = optimizedImages['merdiven-temizligi']
const sharedImage = optimizedImages['ortak-alan-temizligi']
const regularImage = optimizedImages['duzenli-temizlik']

type HeroSlide = {
  id: string
  category: string
  title: string
  description: string
  placeholder: string
  image: string | null
  imageSrcSet: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  imagePosition: string
}

// Account for the source pixels needed by object-fit: cover in the tall slider.
export function getHeroImageSizes(index: number) {
  return index === 2
    ? '(max-width: 899px) 90vw, 45vw'
    : '(max-width: 639px) 700px, (max-width: 899px) 800px, (max-width: 1599px) 1000px, 1200px'
}

// Slide images and their focal points are managed here.
export const heroSlides: HeroSlide[] = [
  {
    id: 'stairs',
    category: 'Merdiven temizliği',
    title: 'Temizlik, ilk adımda hissedilir.',
    description: 'Basamaklar, korkuluklar ve kat sahanlıklarında titiz çalışma.',
    placeholder: 'Merdiven temizliği fotoğrafı',
    image: stairsImage.src, imageSrcSet: stairsImage.srcSet, imageWidth: stairsImage.width, imageHeight: stairsImage.height,
    imageAlt: 'Aydınlık apartman merdivenlerinde korkulukları silen temizlik görevlisi',
    imagePosition: '56% center',
  },
  {
    id: 'shared',
    category: 'Ortak alan temizliği',
    title: 'Her gün temiz bir karşılama.',
    description: 'Bina girişleri ve ortak kullanım alanları için profesyonel temizlik.',
    placeholder: 'Ortak alan temizliği fotoğrafı',
    image: sharedImage.src, imageSrcSet: sharedImage.srcSet, imageWidth: sharedImage.width, imageHeight: sharedImage.height,
    imageAlt: 'Apartman girişinde mermer zemini ve posta kutularını temizleyen ekip',
    imagePosition: '43% center',
  },
  {
    id: 'regular',
    category: 'Düzenli temizlik',
    title: 'Bir defalık değil, düzenli özen.',
    description: 'Apartmanınızın ihtiyaçlarına uygun, planlı temizlik hizmeti.',
    placeholder: 'Profesyonel temizlik ekibi fotoğrafı',
    image: regularImage.src, imageSrcSet: regularImage.srcSet, imageWidth: regularImage.width, imageHeight: regularImage.height,
    imageAlt: 'Apartman merdivenlerinde korkuluk ve zemin temizliği yapan iki görevli',
    imagePosition: 'center 42%',
  },
]

