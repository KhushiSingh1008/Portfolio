import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS } from '../data/sections'
import { sound } from '../lib/sound'
import SectionContent from './SectionContent'

const FLIP_S = 0.62
const STAGGER_S = 0.11
const MAX_LEAVES = 5
const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const indexOf = (id) => SECTIONS.findIndex((s) => s.id === id)

// Pick at most MAX_LEAVES page indices between a and b (inclusive of the ends)
// so a long jump still riffles like a flip-book without rendering every page.
function riffle(indices) {
  if (indices.length <= MAX_LEAVES) return indices
  const step = (indices.length - 1) / (MAX_LEAVES - 1)
  return Array.from({ length: MAX_LEAVES }, (_, k) => indices[Math.round(k * step)])
}

function Page({ index, full, onSelect }) {
  const section = SECTIONS[index]
  const prev = SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length]
  const next = SECTIONS[(index + 1) % SECTIONS.length]
  return (
    <div className="page" style={{ '--ink': section.ink, '--c': section.color }}>
      <div className="page-scroll">
        <header className="page-head">
          <span>Chapter {NUMERALS[index]}</span>
          <span>{section.label}</span>
        </header>
        <h2 className="page-title">{section.title}</h2>
        <p className="page-blurb">{section.blurb}</p>
        {full && (
          <div className="page-body">
            <SectionContent id={section.id} />
          </div>
        )}
      </div>
      {full && (
        <footer className="page-foot">
          <button type="button" onClick={() => onSelect(prev.id)}>
            ← <kbd>{prev.key.toUpperCase()}</kbd> {prev.label}
          </button>
          <span className="page-num">p. {index + 1}</span>
          <button type="button" onClick={() => onSelect(next.id)}>
            {next.label} <kbd>{next.key.toUpperCase()}</kbd> →
          </button>
        </footer>
      )}
    </div>
  )
}

const book = {
  hidden: { opacity: 0, y: 80, rotateX: 38, rotateZ: -6, scale: 0.86 },
  open: { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] } },
  closed: { opacity: 0, y: 60, rotateX: 30, rotateZ: 4, scale: 0.9, transition: { delay: 0.45, duration: 0.45, ease: [0.4, 0, 1, 1] } },
}

const cover = {
  hidden: { rotateY: 0, opacity: 1 },
  open: { rotateY: -180, opacity: [1, 1, 0], transition: { delay: 0.55, duration: 1.0, ease: [0.45, 0, 0.2, 1], opacity: { delay: 0.55, duration: 1.0, times: [0, 0.85, 1] } } },
  closed: { rotateY: 0, opacity: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

export default function Notebook({ id, onSelect, reduced }) {
  const [shown, setShown] = useState(id)
  const [prevId, setPrevId] = useState(id)
  const [flip, setFlip] = useState(null) // { key, forward, pages, target }

  // When the requested section changes, queue a riffle of pages towards it.
  if (id !== prevId) {
    setPrevId(id)
    if (id && shown && id !== shown) {
      const from = indexOf(shown)
      const to = indexOf(id)
      const forward = to > from
      if (reduced) {
        setShown(id)
      } else if (forward) {
        // Pages from..to-1 lift off the stack, revealing `to` underneath.
        setFlip({ key: (flip?.key ?? 0) + 1, forward, pages: riffle(range(from, to - 1)), target: id })
        setShown(id)
      } else {
        // Pages from-1..to land on top, the last one being `to`.
        setFlip({ key: (flip?.key ?? 0) + 1, forward, pages: riffle(range(from - 1, to)), target: id })
      }
    }
  }

  useEffect(() => {
    if (flip) sound.rustle()
  }, [flip])

  const done = () => {
    if (flip && !flip.forward) setShown(flip.target)
    setFlip(null)
  }

  const shownIndex = indexOf(shown)

  return (
    <motion.div className="notebook-wrap" variants={book} initial="hidden" animate="open" exit="closed" style={{ transformPerspective: 1800 }}>
      <div className="notebook" style={{ '--c': SECTIONS[shownIndex]?.color }}>
        <div className="nb-cover-back" aria-hidden="true" />
        <div className="nb-edges" aria-hidden="true" />

        <Page index={shownIndex} full onSelect={onSelect} />

        {flip &&
          flip.pages.map((pageIndex, k) => {
            const last = k === flip.pages.length - 1
            const order = flip.forward ? flip.pages.length - k : k + 1
            const anim = flip.forward
              ? { initial: { rotateY: 0, opacity: 1 }, animate: { rotateY: -180, opacity: [1, 1, 0] } }
              : { initial: { rotateY: -180, opacity: 0 }, animate: { rotateY: 0, opacity: [0, 1, 1] } }
            return (
              <motion.div
                key={`${flip.key}-${k}`}
                className="leaf"
                style={{ zIndex: 10 + order }}
                initial={anim.initial}
                animate={anim.animate}
                transition={{ delay: k * STAGGER_S, duration: FLIP_S, ease: [0.45, 0.05, 0.25, 1], opacity: { delay: k * STAGGER_S, duration: FLIP_S, times: [0, 0.8, 1] } }}
                onAnimationComplete={last ? done : undefined}
                aria-hidden="true"
              >
                <div className="leaf-face front">
                  <Page index={pageIndex} full={flip.forward ? k === 0 : last} onSelect={onSelect} />
                  <div className="leaf-shade" />
                </div>
                <div className="leaf-face back" />
              </motion.div>
            )
          })}

        <motion.div className="nb-cover" variants={cover} aria-hidden="true">
          <div className="nb-cover-front">
            <div className="nb-cover-label">
              <span>Field Notes</span>
              <strong>Khushi Singh</strong>
              <small>code · cells · verse</small>
            </div>
            <div className="nb-band" />
          </div>
          <div className="nb-cover-inside" />
        </motion.div>

        <div className="nb-spiral" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} />
          ))}
        </div>

        <nav className="nb-tabs" aria-label="Notebook sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`nb-tab${s.id === (flip?.target ?? shown) ? ' active' : ''}`}
              style={{ '--c': s.color, '--ink': s.ink }}
              onClick={() => onSelect(s.id)}
              aria-label={`${s.label} (press ${s.key.toUpperCase()})`}
              title={s.label}
            >
              <kbd>{s.key.toUpperCase()}</kbd>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        <button type="button" className="nb-close" onClick={() => onSelect(null)}>
          <kbd>Esc</kbd> close notebook
        </button>
      </div>
    </motion.div>
  )
}

function range(a, b) {
  const step = a <= b ? 1 : -1
  const out = []
  for (let i = a; step > 0 ? i <= b : i >= b; i += step) out.push(i)
  return out
}
