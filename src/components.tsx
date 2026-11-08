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
        <span>images/{src}</span>
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
      preload="metadata"
      onError={onError}
    />
  )
}

export function Slider({ slides, label }: { slides: ReactNode[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [touchX, setTouchX] = useState<number | null>(null)
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  // Свайп пальцем на телефоне: больше 40px — листаем
  const onTouchEnd = (x: number) => {
    if (touchX === null) return
    const dx = x - touchX
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
    setTouchX(null)
  }

  return (
    <div className="slider" aria-roledescription="carousel" aria-label={label}>
      <div
        className="slider__viewport"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      >
        <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
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

export function Check() {
  return (
    <svg className="check" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
