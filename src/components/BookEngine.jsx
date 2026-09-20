import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NotebookCat from './NotebookCat'

const chapterNames = [
  'Cover',
  'Prologue',
  'The Work',
  'Field Notes',
  'Marginalia',
  'Appendix',
  'Contact'
]

const pageTurn = {
  initial: (direction) => ({ opacity: 0, rotateY: direction * 10, x: direction * 12 }),
  open: { opacity: 1, rotateY: 0, x: 0 },
  turn: (direction) => ({
    opacity: 0.18,
    rotateY: direction * -178,
    x: direction * -20,
    boxShadow: direction > 0 ? '-30px 4px 38px rgba(0,0,0,.45)' : '30px 4px 38px rgba(0,0,0,.45)'
  })
}

export default function BookEngine({ children, activeIndex, setActiveIndex, totalPages }) {
  const [touchStartX, setTouchStartX] = useState(null)
  const [turnDirection, setTurnDirection] = useState(1)

  const goTo = useCallback((newIndex) => {
    if (newIndex === activeIndex) return
    if (newIndex < 0 || newIndex >= totalPages) return
    setTurnDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex(newIndex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeIndex, totalPages, setActiveIndex])

  const goNext = useCallback(() => {
    if (activeIndex < totalPages - 1) goTo(activeIndex + 1)
  }, [activeIndex, totalPages, goTo])

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  // Touch swipe
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    setTouchStartX(null)
  }

  return (
    <div className="app-container">
      {/* Minimal header */}
      <header className="site-header">
        <button
          className="brand-mark"
          onClick={() => goTo(0)}
          style={{ textAlign: 'left' }}
        >
          <span className="brand-initial">K</span>
          <span>Khushi Singh</span>
        </button>

        <nav aria-label="Book Chapters">
          <ul className="header-chapters">
            {chapterNames.map((name, idx) => (
              <li key={idx}>
                <button
                  className={`chapter-tab ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => goTo(idx)}
                >
                  <span className="chap-num">
                    {idx === 0 ? '' : idx === 6 ? 'fin.' : `${idx}.`}
                  </span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Side arrow navigation */}
      {activeIndex > 0 && (
        <button
          className="nav-arrow-fixed nav-arrow-left"
          onClick={goPrev}
          aria-label="Previous Chapter"
          title="Previous (←)"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {activeIndex < totalPages - 1 && (
        <button
          className="nav-arrow-fixed nav-arrow-right"
          onClick={goNext}
          aria-label="Next Chapter"
          title="Next (→)"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Notebook */}
      <div className="ambient-diagrams" aria-hidden="true">
        <svg className="neural-map" viewBox="0 0 280 360">
          <path d="M35 40 135 90 230 35M35 40l5 130 95-80 90 110M40 170l96 70 89-40M136 90v150M136 240l92 78M40 170 22 295 136 240 225 315" />
          <g><circle cx="35" cy="40" r="7"/><circle cx="135" cy="90" r="8"/><circle cx="230" cy="35" r="6"/><circle cx="40" cy="170" r="7"/><circle cx="136" cy="240" r="9"/><circle cx="225" cy="315" r="7"/><circle cx="22" cy="295" r="6"/></g>
        </svg>
      </div>
      <main className="book-stage">
        <div className="notebook-wrapper">
          <div
            className="notebook-page"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={turnDirection}>
              <motion.div
                key={activeIndex}
                className="page-transition-wrapper"
                custom={turnDirection}
                variants={pageTurn}
                initial="initial"
                animate="open"
                exit="turn"
                transition={{ duration: 0.82, ease: [0.4, 0, 0.15, 1] }}
                style={{ transformOrigin: turnDirection > 0 ? 'left center' : 'right center' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <NotebookCat />

      {/* Page number */}
      <footer className="page-footer">
        <div className="page-number">
          {activeIndex + 1} / {totalPages}
        </div>
      </footer>
    </div>
  )
}
