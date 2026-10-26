import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { ArrowLeft, ArrowRight, Image, Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { getHeroImageSizes, heroSlides } from '../config/heroSlides'

const AUTOPLAY_DELAY = 5500

async function preloadSlide(index: number) {
  const slide = heroSlides[index]
  if (!slide.image) return
  const image = new window.Image()
  image.decoding = 'async'
  image.fetchPriority = 'low'
  image.sizes = getHeroImageSizes(index)
  image.srcset = slide.imageSrcSet
  image.src = slide.image
  await image.decode()
}

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const [renderedSlides, setRenderedSlides] = useState([0])
  const [loadError, setLoadError] = useState('')
  const requestedSlide = useRef(0)
  const navigationVersion = useRef({ version: 0 })
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const viewport = useRef<HTMLDivElement>(null)
  const gesture = useRef<{ id: number; x: number; y: number; horizontal: boolean; panel: HTMLElement } | null>(null)
  const tweens = useRef<gsap.core.Tween[]>([])
  const playing = !paused && !hovered && !focused && !dragging && visible && !reducedMotion
  const selectSlide = useCallback(async (index: number) => {
    const version = ++navigationVersion.current.version
    requestedSlide.current = index
    setLoadError('')
    try {
      await preloadSlide(index)
      if (version !== navigationVersion.current.version) return
      setRenderedSlides(current => current.includes(index) ? current : [...current, index])
      setActive(index)
    } catch {
      if (version !== navigationVersion.current.version) return
      requestedSlide.current = active
      setLoadError('Görsel yüklenemedi. Lütfen yeniden deneyin.')
    }
  }, [active])
  const move = useCallback((direction: number) => { void selectSlide((requestedSlide.current + direction + heroSlides.length) % heroSlides.length) }, [selectSlide])

  useEffect(() => {
    const navigation = navigationVersion.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motionChanged = () => setReducedMotion(media.matches)
    const visibilityChanged = () => setVisible(!document.hidden)
    media.addEventListener('change', motionChanged)
    document.addEventListener('visibilitychange', visibilityChanged)
    return () => {
      media.removeEventListener('change', motionChanged)
      document.removeEventListener('visibilitychange', visibilityChanged)
      tweens.current.forEach(tween => tween.kill())
      navigation.version++
    }
  }, [])

  useEffect(() => {
    if (!visible || reducedMotion) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    const timer = window.setTimeout(() => {
      void preloadSlide((active + 1) % heroSlides.length).catch(() => {})
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [active, visible, reducedMotion])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => move(1), AUTOPLAY_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, playing, move])

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return
    const panel = viewport.current?.querySelector<HTMLElement>('.is-active')
    if (!panel) return
    tweens.current.forEach(tween => tween.kill())
    tweens.current = []
    gsap.set(panel, { clearProps: 'transform' })
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false, panel }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current
    if (!current || current.id !== event.pointerId) return
    const dx = event.clientX - current.x
    const dy = event.clientY - current.y
    if (!current.horizontal && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) current.horizontal = true
    if (current.horizontal && !reducedMotion) {
      gsap.set(current.panel, { x: Math.max(-90, Math.min(90, dx * 0.25)) })
    }
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current
    if (!current || current.id !== event.pointerId) return
    gesture.current = null
    const distance = event.clientX - current.x
    const threshold = Math.min(70, event.currentTarget.clientWidth * 0.16)
    if (!cancelled && current.horizontal && Math.abs(distance) >= threshold) move(distance < 0 ? 1 : -1)
    if (reducedMotion) gsap.set(current.panel, { clearProps: 'transform' })
    else {
      tweens.current.push(gsap.to(current.panel, {
        x: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform',
      }))
    }
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return <div className="hero-slider" role="region" aria-roledescription="slayt gösterisi" aria-label="Temizlik hizmetlerimiz"
    onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true) }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
  >
    <div className={`slider-viewport ${dragging ? 'is-dragging' : ''}`} ref={viewport}
      onPointerDown={startDrag} onPointerMove={drag}
      onPointerUp={event => finishDrag(event)}
      onPointerCancel={event => finishDrag(event, true)}
      onLostPointerCapture={event => finishDrag(event, true)}
      onDragStart={event => event.preventDefault()}
    >
      {heroSlides.map((slide, index) => <div key={slide.id}
        className={`slide-surface slide-${slide.id} ${active === index ? 'is-active' : ''}`}
        aria-hidden={active !== index} role="group" aria-roledescription="slayt" aria-label={`${index + 1} / ${heroSlides.length}: ${slide.category}`}
      >
        {slide.image ? renderedSlides.includes(index) && <img className="slide-image" src={slide.image} srcSet={slide.imageSrcSet} sizes={getHeroImageSizes(index)} width={slide.imageWidth} height={slide.imageHeight} alt={slide.imageAlt} style={{ objectPosition: slide.imagePosition }} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} draggable={false} /> : <div className="slide-placeholder" aria-label={slide.imageAlt} role="img"><Image size={42} aria-hidden="true" /><span>{slide.placeholder}</span><small>Görsel alanı</small></div>}
        <span className="slide-tag">AKDAĞ TEMİZLİK / İZMİR</span>
        <div className="slide-caption"><span className="slide-category">{slide.category}</span><h2>{slide.title}</h2><p>{slide.description}</p></div>
      </div>)}
    </div>
    <div className="slider-controls">
      <span className="slide-count"><strong>0{active + 1}</strong><span>/ 0{heroSlides.length}</span></span>
      <div className="slide-selectors" aria-label="Slayt seçimi">{heroSlides.map((item, index) => <button key={item.id} aria-label={`${index + 1}. slayt: ${item.category}`} aria-pressed={active === index} onClick={() => { void selectSlide(index) }}><span /></button>)}</div>
      <div className="slide-arrows">
        <button onClick={() => setPaused(!paused)} aria-label={paused || reducedMotion ? 'Slaytları oynat' : 'Slaytları duraklat'} disabled={reducedMotion} title={reducedMotion ? 'Azaltılmış hareket tercihi nedeniyle otomatik geçiş kapalı' : undefined}>{paused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>
        <button onClick={() => move(-1)} aria-label="Önceki slayt"><ArrowLeft size={19} aria-hidden="true" /></button>
        <button onClick={() => move(1)} aria-label="Sonraki slayt"><ArrowRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
    {loadError && <p className="slider-error" role="status">{loadError}</p>}
    <span className="visually-hidden" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">{active + 1} / {heroSlides.length}: {heroSlides[active].category}</span>
  </div>
}

