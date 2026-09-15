import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const chapterNames = [
  'Cover',
  'Prologue',
  'The Work',
  'Field Notes',
  'Marginalia',
  'Appendix',
  'Contact'
]

export default function BookEngine({ children, activeIndex, setActiveIndex, totalPages }) {
  const [touchStartX, setTouchStartX] = useState(null)

  const goTo = useCallback((newIndex) => {
    if (newIndex === activeIndex) return
    if (newIndex < 0 || newIndex >= totalPages) return
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
      <main className="book-stage">
        <div className="notebook-wrapper">
          <div
            className="notebook-page"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="page-transition-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Page number */}
      <footer className="page-footer">
        <div className="page-number">
          {activeIndex + 1} / {totalPages}
        </div>
      </footer>
    </div>
  )
}
