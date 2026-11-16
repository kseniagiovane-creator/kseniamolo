import { useState } from 'react'
import { Icon, Photo, Slider } from './components'

const nav = [
  { href: '#programs', label: 'Курс' },
  { href: '#trainer', label: 'Тренер' },
  { href: '#results', label: 'Результаты' },
  { href: '#lecture', label: 'Лекция' },
]

const programs = [
  {
    images: ['program-1-720.mp4', 'program-2-720.mp4', 'program-3-720.mp4'],
    title: 'Тренировки для плоского живота',
    items: [
      '20 домашних мини-комплексов',
      '4 лекции: «Тазовое дно», «Мышцы живота», «Упругие ягодицы», «Дыхание»',
      'Доступ к мини-комплексам на 30 дней в Телеграм-канале',
      'Без даты старта — доступ сразу после оплаты',
    ],
    oldPrice: '1200 Kč',
    price: '990 Kč',
  },
]

// Карточки «Что тебя ждёт на курсе»: значок (или фото), крупное слово, подпись, текст
const highlights: { number: string; title: string; text: string; icon: string; photo?: boolean }[] = [
  {
    number: '20',
    title: 'мини-комплексов',
    text: 'Всего по 10–20 минут в день не выходя из дома или в качестве разминки в зале',
    icon: 'icons/home.png',
  },
  {
    number: '4',
    title: 'обучающие лекции',
    text: '«Тазовое дно», «Мышцы живота», «Упругие ягодицы», «Дыхание»',
    icon: 'icons/lecture-play.png',
  },
  {
    number: '30',
    title: 'дней доступа',
    text: 'Мини-комплексы в Телеграм-канале. Старт в любой день — доступ сразу после оплаты',
    icon: 'icons/calendar.png',
  },
  {
    number: '5',
    title: 'предметов инвентаря',
    text: 'Гиря 4–6 кг, коврик, роллер 90 сантиметров, фитнес-резинка, пилатес-мяч',
    icon: 'icons/kettlebell-2.png',
  },
  {
    number: '6',
    title: 'направлений комплексов',
    text: 'Работа с дыханием, движением позвоночника и тазовым дном\nТренировки на кор, спину и ягодицы',
    icon: 'icons/lunge.png',
  },
  {
    number: '2',
    title: 'уровня сложности',
    text: 'Простые варианты упражнений для начинающих, усложнённые вариации для подготовленных',
    icon: 'icons/layers.svg',
  },
]

const facts = [
  {
    number: '15',
    text: 'Жизни я отдала спортивной гимнастике и получила звание мастера спорта',
  },
  {
    number: '8',
    text: 'Работаю как фитнес-тренер и пилатес-преподаватель',
  },
  {
    number: '5',
    text: 'Строю тело своей мечты. За это время похудела на 10 килограммов и создала спортивный плоский живот',
  },
]

const transformation = {
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
      title: 'Что изменилось к 2026 году',
      text: 'Я тренируюсь всего два часа в неделю, научилась сочетать силовые тренировки и пилатес и добилась идеального тела без изнурительных тренировок и диет',
    },
    {
      text: 'Так сформировался мой подход Smart Fitness, которым я теперь делюсь с вами',
    },
  ] as { title?: string; text: string }[],
}

const benefits = ['Создать более плоский живот', 'Укрепить ягодицы', 'Улучшить осанку', 'Поработать с мышцами тазового дна']

// Оплата курса через Stripe. Переход в Телеграм после оплаты настраивается в самой ссылке Stripe
const BUY_URL = 'https://buy.stripe.com/5kQaEW5Xs96Kc0p2lUdnW33'

const RESULTS_COUNT = 6

// ID ролика с YouTube: часть ссылки после «watch?v=» или «youtu.be/»
const LECTURE_VIDEO_ID = 'cgBJgfPR7Lg'

// Подписи «что изменилось» на фото «После». Координаты в долях плитки 1:2:
// x — от 0 до 100 по ширине, y — от 0 до 200 по высоте. text — подпись,
// path — стрелка (head: false — без наконечника), shift — на сколько px сдвинуть табличку дальше от края
type Note = { text?: string; x?: number; y?: number; shift?: number; path?: string; head?: boolean }

const resultNotes: Record<number, Note[]> = {
  1: [
    { text: 'Улучшилась осанка', x: 2, y: 34, path: 'M22 48 Q24 60 31 66' },
    { text: 'Более плоский живот', x: 64, y: 60, path: 'M80 76 Q76 84 62 86' },
    { text: 'Более подтянутые ягодицы', x: 2, y: 112, path: 'M20 112 Q25 106 30 105' },
  ],
  2: [
    { text: 'Голова сместилась назад', x: 66, y: 18, path: 'M80 37 Q78 44 63 41' },
    { text: 'Расправились плечи', x: 2, y: 50, path: 'M20 64 Q24 54 34 48' },
    { text: 'Улучшилась осанка', x: 2, y: 92, path: 'M18 98 Q22 84 31 76' },
    { text: 'Подтянулся живот', x: 66, y: 64, path: 'M80 78 Q76 88 63 91' },
  ],
  3: [
    { text: 'Голова встала в ось', x: 68, y: 18, path: 'M80 34 Q76 42 66 44' },
    { text: 'Выровнялась осанка', x: 2, y: 30, path: 'M14 42 Q16 62 30 68' },
    { text: 'Более плоский живот', x: 68, y: 72, path: 'M74 82 Q68 86 62 86' },
    { text: 'Подкачались ягодицы', x: 2, y: 118, path: 'M20 118 Q26 112 33 110' },
  ],
  4: [
    { text: 'Голова встала в ось', x: 66, y: 18, path: 'M80 34 Q78 42 61 42' },
    { text: 'Расправились плечи', x: 2, y: 40, path: 'M16 56 Q19 66 37 62' },
    { text: 'Улучшилась осанка', x: 2, y: 66, path: 'M16 82 Q19 92 37 88' },
    { text: 'Подтянулся живот', x: 66, y: 74, path: 'M76 90 Q74 96 62 92' },
    { text: 'Подкачались ягодицы и оформилась линия тела', x: 2, y: 116, path: 'M16 114 Q18 104 30 103' },
  ],
  5: [
    { text: 'Голова встала в ось', x: 66, y: 26, path: 'M80 40 Q78 47 63 47' },
    { text: 'Расправились плечи', x: 2, y: 44, path: 'M18 58 Q24 64 39 60' },
    { text: 'Улучшилась осанка', x: 2, y: 72, path: 'M18 86 Q26 92 41 90' },
    { text: 'Подтянулся живот', x: 66, y: 62, path: 'M80 76 Q78 86 66 90' },
  ],
  6: [
    { text: 'Расправились плечи', x: 2, y: 22, path: 'M14 38 Q16 46 27 49' },
    { text: 'Улучшилась осанка', x: 66, y: 14, path: 'M76 30 Q72 37 58 40' },
    { text: 'Подкачалась спина', x: 66, y: 60, shift: 30, path: 'M84 68 Q72 66 60 68' },
  ],
}

function ResultNotes({ id, notes }: { id: number; notes: Note[] }) {
  return (
    <>
      <svg className="result__arrows" viewBox="0 0 100 200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id={`head-${id}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0.5 0.5 L5 3 L0.5 5.5" />
          </marker>
        </defs>
        {notes
          .filter((n) => n.path)
          .map((n) => (
            <path
              key={n.path}
              d={n.path}
              markerEnd={n.head === false ? undefined : `url(#head-${id})`}
            />
          ))}
      </svg>
      {notes
        .filter((n) => n.text)
        .map((n) => (
          <span
            key={n.text}
            // Таблички чуть выходят за край фото — подальше от человека
            className={`result__note result__note--${(n.x ?? 0) > 50 ? 'right' : 'left'}`}
            style={{ top: `${(n.y ?? 0) / 2}%`, translate: n.shift ? `${(n.x ?? 0) > 50 ? n.shift : -n.shift}px 0` : undefined }}
          >
            {n.text}
          </span>
        ))}
    </>
  )
}

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
          <a href="#programs" className="btn btn--light btn--small" onClick={() => setOpen(false)}>
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
      <div className="hero__inner">
        <div className="hero__text">
          <h1>
            <span className="hero__kicker">Домашние комплексы для</span>
            <span className="hero__big">
              плоского
              <br />
              живота
            </span>
          </h1>
          <p className="hero__lead">Всего 10 минут в день вместе с&nbsp;Booty&nbsp;Mamy</p>
          <a href="#programs" className="btn hero__cta">Подробнее</a>
        </div>
        <div className="hero__photo">
          <Photo src="hero.jpg" alt="Ксения, тренер Booty Mamy" />
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="section section--white">
      <div className="container">
        <h2 className="title">
          <b>Что тебя ждёт</b> на курсе
        </h2>
        <div className="highlights">
          {highlights.map((h) => (
            <article className="highlight" key={h.title}>
              <img className={h.photo ? 'highlight__icon highlight__icon--photo' : 'highlight__icon'} src={`/images/${h.icon}`} alt="" />
              <p className={/\d/.test(h.number) ? 'highlight__number' : 'highlight__number highlight__number--word'}>{h.number}</p>
              <h3>{h.title}</h3>
              <p className="highlight__text">{h.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section className="section section--cream section--tight" id="programs">
      <div className="container">
        {programs.map((p, i) => (
          <article className="program" key={i}>
            <div className="program__media">
              <Slider
                label={p.title}
                slides={p.images.map((src, n) => (
                  <Photo key={src} src={src} alt={`${p.title}, видео ${n + 1}`} />
                ))}
              />
            </div>
            <div className="program__body">
              <h2 className="title">
                <b>За курс ты сможешь</b>
              </h2>
              <ul className="ticks">
                {benefits.map((item) => (
                  <li key={item}>
                    <Icon name="check" className="ticks__icon" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="program__footer">
                <div className="price">
                  <s>{p.oldPrice}</s> <strong>{p.price}</strong>
                </div>
                <a href={BUY_URL} className="btn">Купить</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Trainer() {
  return (
    <section className="section section--dark section--trainer" id="trainer">
      <div className="container">
        <div className="trainer">
          <div className="trainer__photo">
            <Photo src="trainer-2.jpg" alt="Ксения, фитнес-тренер" />
          </div>
          <div className="trainer__body">
            <h2 className="title">
              <b>Я Ксения —</b>
              <br />
              твой онлайн-тренер
            </h2>
            <div className="numbers">
              {facts.map((f) => (
                <div className="number" key={f.number}>
                  <p className="number__value">
                    {f.number}
                    <span>лет</span>
                  </p>
                  <p className="number__text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transformation">
          <div className="transformation__facts">
            {transformation.facts.map((f) => (
              <div className="fact" key={f.text}>
                {f.title && <h3>{f.title}</h3>}
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="transformation__media">
            <Slider
              label="Ксения до и после"
              slides={transformation.slides.map((s) => (
                <div className="badge-slide" key={s.src}>
                  <Photo src={s.src} alt={`Ксения: ${s.label.toLowerCase()}`} />
                  <span className="badge">{s.label}</span>
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="section section--cream" id="results">
      <div className="container">
        <h2 className="title title--center">
          <b>Результаты</b> моих клиентов
        </h2>
        <div className="results">
          <Slider
            label="Результаты до и после"
            slides={Array.from({ length: RESULTS_COUNT }, (_, i) => (
              <div className="result" key={i}>
                <div className="result__photo">
                  <div className="result__frame">
                    <Photo src={`client-${i + 1}-before.jpg`} alt={`Результат клиентки ${i + 1}: до`} />
                    <span className="badge">До</span>
                  </div>
                </div>
                <div className="result__photo">
                  <div className="result__frame">
                    <Photo src={`client-${i + 1}-after.jpg`} alt={`Результат клиентки ${i + 1}: после`} />
                    <span className="badge badge--dark">После</span>
                  </div>
                  {resultNotes[i + 1] && <ResultNotes id={i + 1} notes={resultNotes[i + 1]} />}
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  )
}

function Lecture() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="section section--pink section--tight" id="lecture">
      <div className="container lecture">
        <div className="lecture__text">
          <h2 className="title">
            <b>Бесплатная</b>
            <br />
            <b className="nowrap">мини-лекция</b>
          </h2>
          <p>
            О курсе и о том,
            <br />
            как создать плоский живот
          </p>
        </div>
        <div className="lecture__player">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${LECTURE_VIDEO_ID}?rel=0&autoplay=1`}
              title="Бесплатная мини-лекция о плоском животе"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              className="lecture__cover"
              onClick={() => setPlaying(true)}
              disabled={!LECTURE_VIDEO_ID}
              aria-label="Смотреть лекцию"
            >
              <Photo src="lecture-cover-5.jpg" alt="" />
              <span className="lecture__play">
                <Icon name="triangle" />
              </span>
              {!LECTURE_VIDEO_ID && <span className="lecture__soon">Видео скоро появится</span>}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function Buy() {
  const p = programs[0]

  return (
    <section className="section section--cream" id="buy">
      <div className="container">
        <div className="buy">
          <div className="buy__text">
            <h2 className="title">
              <b>Начни создавать плоский живот</b>
            </h2>
            <p>{p.title}. Без даты старта — доступ сразу после оплаты.</p>
          </div>
          <div className="buy__price">
            <s>{p.oldPrice}</s>
            <strong>{p.price}</strong>
            <a href={BUY_URL} className="btn btn--light btn--block">Записаться на курс</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const legalLinks = [
  { label: 'Политика конфиденциальности', href: 'https://pravoid.com/d/pnj3thth' },
  { label: 'Пользовательское соглашение', href: 'https://pravoid.com/d/8azc3jye' },
  { label: 'Политика cookies', href: 'https://pravoid.com/d/b8ttpj52' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img className="logo__img" src="/images/logo-light.png" alt="BOOTY MAMY" />
        <nav className="footer__links" aria-label="Документы">
          {legalLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
        <a className="footer__inst" href="https://instagram.com/kseniamolo" target="_blank" rel="noopener noreferrer">
          Instagram @kseniamolo
        </a>
        <span className="footer__copy">© {new Date().getFullYear()} Онлайн школа умного фитнеса</span>
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
        <Highlights />
        <Programs />
        <Trainer />
        <Results />
        <Lecture />
        <Buy />
      </main>
      <Footer />
    </>
  )
}
