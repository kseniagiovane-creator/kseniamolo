import { useState } from 'react'
import { Photo, Slider } from './components'

const nav = [
  { href: '#programs', label: 'Курс' },
  { href: '#trainer', label: 'Тренер' },
  { href: '#results', label: 'Результаты' },
  { href: '#lecture', label: 'Лекция' },
]

const programs = [
  {
    images: ['program-1-5s.mp4', 'program-2-5s.mp4', 'program-3-5s.mp4'],
    title: 'Тренировки для плоского живота',
    items: [
      '20 домашних мини-комплексов',
      '4 лекции: «Тазовое дно», «Мышцы живота», «Упругие ягодицы», «Дыхание»',
      'Доступ к мини-комплексам на 30 дней в Телеграм-канале',
      'Без даты старта — доступ сразу после оплаты',
    ],
    oldPrice: '50 €',
    price: '42 €',
  },
]

const story = [
  {
    image: 'trainer-1.jpg',
    facts: [
      {
        title: '15 лет',
        text: 'Жизни я отдала спортивной гимнастике и получила звание мастера спорта',
      },
      {
        title: '8 лет',
        text: 'Работаю как фитнес-тренер и пилатес-преподаватель',
      },
      {
        title: '5 лет',
        text: 'Строю тело своей мечты. За это время похудела на 10 килограммов и создала спортивный плоский живот',
      },
    ],
  },
  {
    slides: [
      { src: 'trainer-before.jpg', label: 'До' },
      { src: 'trainer-after.jpg', label: 'После' },
    ],
    facts: [
      {
        title: 'Так я выглядела',
        text: 'Когда не была знакома с умным фитнесом и не знала, как тренироваться правильно',
      },
      {
        title: 'В 2026 году',
        text: 'Я добилась идеальной фигуры без жёстких диет и изнурительных тренировок и готова поделиться программой с вами',
      },
    ],
  },
]

const approach = [
  {
    icon: 'icon-kettlebell.png',
    title: 'Инвентарь',
    items: ['Гиря', 'Коврик', 'Роллер 90 см', 'Фитнес-резинка'],
  },
  {
    icon: 'icon-lunge.png',
    title: 'Направление комплексов',
    items: ['Работа с дыханием', 'Движение позвоночника', 'Работа с тазом и тазовым дном', 'Силовые упражнения на кор и ягодицы'],
  },
]

const RESULTS_COUNT = 4

// ID ролика с YouTube: часть ссылки после «watch?v=» или «youtu.be/»
const LECTURE_VIDEO_ID = ''

const zones = [
  { label: 'Шея', x: 32, y: 14 },
  { label: 'Дряблые руки', x: 82, y: 12 },
  { label: 'Выпирающий животик', x: 2, y: 22, w: 22 },
  { label: 'Осанка', x: 80, y: 46 },
  { label: 'Тазовое дно', x: 4, y: 54, w: 22 },
  { label: 'Плоские ягодицы', x: 68, y: 72, w: 16 },
  { label: 'Вялая внутренняя поверхность бедра', x: 30, y: 90 },
]

// Кривые от подписей к фигуре, в процентах от блока (порядок как в zones)
const zoneArrows = [
  'M36 19 Q38 31 47 37',
  'M88 24 Q84 34 67 41',
  'M14 32 Q26 48 39 48',
  'M79 48 Q72 50 62 47',
  'M14 59 Q26 60 36 57',
  'M67 74 Q58 74 51 68',
  'M42 88 Q40 78 43 69',
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="logo">
          <img className="logo__img" src="/images/logo.png" alt="BOOTY MAMY" />
        </a>
        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {nav.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#programs" className="btn btn--small" onClick={() => setOpen(false)}>
            Начать тренироваться
          </a>
        </nav>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1>
            <span>Домашние</span>
            <span>комплексы для</span>
            <span>плоского живота</span>
          </h1>
          <p>
            За 10 минут в день вместе с&nbsp;Booty&nbsp;Mamy
          </p>
          <a href="#programs" className="btn">Подробнее</a>
        </div>
        <div className="hero__visual">
          <div className="hero__circle">
            <Photo src="hero.jpg" alt="Ксения, тренер Booty Mamy" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section className="section" id="programs">
      <div className="container">
        <h2 className="section__title">Что тебя ждёт на курсе</h2>
        <div className="programs">
          {programs.map((p, i) => (
            <article className="card program" key={i}>
              <div className="program__image">
                <Slider
                  label={p.title}
                  slides={p.images.map((src, n) => (
                    <Photo key={src} src={src} alt={`${p.title}, видео ${n + 1}`} />
                  ))}
                />
              </div>
              <div className="program__body">
                <h3>{p.title}</h3>
                <ul className="list">
                  {p.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="program__footer">
                  <a href="#courses" className="link">Подробнее</a>
                  <div className="price">
                    <s>{p.oldPrice}</s> <strong>{p.price}</strong>
                  </div>
                  <a href="#" className="btn btn--block">Купить</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trainer() {
  return (
    <section className="section" id="trainer">
      <div className="container">
        <h2 className="section__title">Я Ксения — твой онлайн-тренер</h2>
        <div className="story">
          {story.map((block, i) => (
            <article className={`card story__card ${i % 2 ? 'story__card--reverse' : ''}`} key={i}>
              {block.slides ? (
                <div className="story__media story__carousel">
                  <Slider
                    label="Ксения до и после"
                    slides={block.slides.map((s) => (
                      <div className="story__slide" key={s.src}>
                        <Photo src={s.src} alt={`Ксения: ${s.label.toLowerCase()}`} />
                        <span className="story__badge">{s.label}</span>
                      </div>
                    ))}
                  />
                </div>
              ) : (
                <div className="story__media story__photo">
                  <Photo src={block.image} alt="Ксения, фитнес тренер" />
                </div>
              )}
              <div className="story__facts">
                {block.facts.map((f) => (
                  <div className="fact" key={f.title}>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section className="section section--flush">
      <div className="container">
        <div className="grid approach">
          {approach.map((a) => (
            <div className="feature" key={a.title}>
              <img className="feature__icon" src={`/images/${a.icon}`} alt="" />
              <h3>{a.title}</h3>
              <ul className="feature__list">
                {a.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="section" id="results">
      <div className="container container--narrow">
        <h2 className="section__title">Результаты моих клиентов</h2>
        <div className="results__labels">
          <span>До</span>
          <span>После</span>
        </div>
        <Slider
          label="Результаты до и после"
          slides={Array.from({ length: RESULTS_COUNT }, (_, i) => (
            <div className="result" key={i}>
              <Photo src={`result-${i + 1}-before.jpg`} alt={`Результат ${i + 1}: до`} />
              <Photo src={`result-${i + 1}-after.jpg`} alt={`Результат ${i + 1}: после`} />
            </div>
          ))}
        />
      </div>
    </section>
  )
}

function Lecture() {
  return (
    <section className="section" id="lecture">
      <div className="container lecture">
        <h2 className="section__title">Бесплатная мини-лекция</h2>
        <p className="lecture__text">О курсе и о том, как создать плоский живот</p>
        <div className="lecture__player">
          {LECTURE_VIDEO_ID ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${LECTURE_VIDEO_ID}?rel=0`}
              title="Бесплатная мини-лекция о плоском животе"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="photo photo--empty">
              <span>Здесь будет видео с YouTube</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Courses() {
  return (
    <section className="section" id="courses">
      <div className="container">
        <div className="courses">
          <article className="card course">
            <h2 className="course__title">За курс ты сможешь:</h2>
            <ul className="list">
              <li>Создать плоский живот</li>
              <li>Укрепить ягодицы</li>
              <li>Улучшить осанку</li>
              <li>Поработать с такими проблемами, как:</li>
            </ul>

            <div className="zones">
              <div className="zones__circle zones__circle--blue">
                <Photo src="course-body.jpg" alt="Проблемные зоны" />
              </div>
              <svg className="zones__arrows" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {zoneArrows.map((d) => (
                  <path key={d} d={d} vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
              {zones.map((z) => (
                <span key={z.label} className="zones__label" style={{ left: `${z.x}%`, top: `${z.y}%`, maxWidth: z.w && `${z.w}%` }}>
                  {z.label}
                </span>
              ))}
            </div>

            <div className="course__buy">
              <div className="price price--big">
                <s>50 €</s> <span className="price__sep">/</span> <strong>42 €</strong>
              </div>
              <a href="#" className="btn btn--block">Записаться на курс</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="logo">BOOTY MAMY</span>
        <span>© {new Date().getFullYear()} Онлайн школа умного фитнеса</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
        <Approach />
        <Trainer />
        <Results />
        <Lecture />
        <Courses />
      </main>
      <Footer />
    </>
  )
}
