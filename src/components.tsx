import { useEffect, useRef, useState, type ReactNode } from 'react'

const VIDEO = /\.(mp4|webm|mov)$/i

/** Фото или видео из public/images. Пока файла нет — показывает мягкую заглушку с именем файла. */
export function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (!failed && VIDEO.test(src)) {
    return <Video src={src} label={alt} className={className} onError={() => setFailed(true)} />
  }

  if (failed) {
    return (
      <div className={`photo photo--empty ${className}`} role="img" aria-label={alt}>
        <span>Фото скоро появится</span>
      </div>
    )
  }
  return (
    <img
      className={`photo ${className}`}
      src={`/images/${src}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/** Видео-обложка: без звука, по кругу. Играет, только пока его видно (в карусели — только активный слайд). */
function Video({ src, label, className, onError }: { src: string; label: string; className: string; onError: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { root: video.closest('.slider__viewport'), threshold: 0.6 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={`photo ${className}`}
      src={`/images/${src}`}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      onError={onError}
    />
  )
}

export function Slider({ slides, label }: { slides: ReactNode[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [touch, setTouch] = useState<{ x: number; y: number } | null>(null)
  const [drag, setDrag] = useState(0)
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  // Свайп пальцем на телефоне: слайд едет за пальцем, больше 40px — листаем
  const onTouchMove = (x: number, y: number) => {
    if (!touch) return
    const dx = x - touch.x
    if (Math.abs(dx) > Math.abs(y - touch.y)) setDrag(dx)
  }

  const onTouchEnd = () => {
    if (Math.abs(drag) > 40) go(index + (drag < 0 ? 1 : -1))
    setTouch(null)
    setDrag(0)
  }

  return (
    <div className="slider" aria-roledescription="carousel" aria-label={label}>
      <div
        className="slider__viewport"
        onTouchStart={(e) => setTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchMove={(e) => onTouchMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className={`slider__track ${drag ? 'is-dragging' : ''}`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${drag}px))` }}
        >
          {slides.map((slide, i) => (
            <div className="slider__slide" key={i} aria-hidden={i !== index}>
              {slide}
            </div>
          ))}
        </div>
        <button className="slider__arrow slider__arrow--prev" onClick={() => go(index - 1)} aria-label="Назад">
          <Chevron />
        </button>
        <button className="slider__arrow slider__arrow--next" onClick={() => go(index + 1)} aria-label="Вперёд">
          <Chevron />
        </button>
      </div>
      <div className="slider__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider__dot ${i === index ? 'is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const icons = {
  dumbbell: 'M3.5 9.5h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1zM20.5 9.5h-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1zM7.5 6.5h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zM15.5 6.5h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zM9.5 12h5',
  play: 'M4.5 4.5h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15V6a1.5 1.5 0 0 1 1.5-1.5zM10 8l5 2.5-5 2.5zM12 16.5v3M8.5 19.5h7',
  calendar: 'M5.5 5.5h13a1.5 1.5 0 0 1 1.5 1.5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1.5-1.5zM4 10h16M8.5 3.5v4M15.5 3.5v4M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01',
  stopwatch: 'M12 20.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM12 10.5v3.5M9.5 3h5',
  person: 'M12 4.5h.01M5.5 9l6.5 2 6.5-2M12 11v4M12 15l-3 5M12 15l3 5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  triangle: 'M8 5.5v13l11-6.5z',
}

export type IconName = keyof typeof icons

/** Линейные иконки в едином стиле: тонкая линия, цвет — от текста */
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  )
}
