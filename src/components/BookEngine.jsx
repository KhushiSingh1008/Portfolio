import React, { useState, useEffect, useCallback } from 'react'

export default function BookEngine({ children, activeIndex, setActiveIndex, totalPages }) {
  const [turnDirection, setTurnDirection] = useState(null) // 'next' or 'prev'
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const chapterNames = [
    'Cover',
    'Prologue',
    'The Work',
    'Field Notes',
    'Marginalia',
    'Appendix',
    'Contact'
  ]

  const turnPage = useCallback((newIndex, direction) => {
    if (newIndex === activeIndex || isTransitioning) return
    if (newIndex < 0 || newIndex >= totalPages) return

    setTurnDirection(direction || (newIndex > activeIndex ? 'next' : 'prev'))
    setIsTransitioning(true)

    setTimeout(() => {
      setActiveIndex(newIndex)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 280)

    setTimeout(() => {
      setIsTransitioning(false)
      setTurnDirection(null)
    }, 650)
  }, [activeIndex, isTransitioning, totalPages, setActiveIndex])

  const goNext = useCallback(() => {
    if (activeIndex < totalPages - 1) {
      turnPage(activeIndex + 1, 'next')
    }
  }, [activeIndex, totalPages, turnPage])

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      turnPage(activeIndex - 1, 'prev')
    }
  }, [activeIndex, turnPage])

  // Keyboard Navigation (Arrow Keys)
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

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goNext()
      } else {
        goPrev()
      }
    }
    setTouchStartX(null)
  }

  // Calculate dynamic stacked page thicknesses for left and right leaf bulk
  const leftStackThickness = Math.max(3, Math.round((activeIndex / (totalPages - 1)) * 14))
  const rightStackThickness = Math.max(3, Math.round(((totalPages - 1 - activeIndex) / (totalPages - 1)) * 14))

  return (
    <div className="app-container">
      {/* Top Header / Bookmark Ribbon */}
      <header className="site-header">
        <button 
          className="brand-mark" 
          onClick={() => turnPage(0, 'prev')} 
          style={{ background: 'none', border: 'none', textAlign: 'left' }}
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
                  onClick={() => turnPage(idx)}
                >
                  <span className="chap-num">
                    {idx === 0 ? '' : idx === 6 ? 'Fin.' : `${idx}.`}
                  </span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Persistent Fixed Side Arrow Navigation Affordances */}
      {activeIndex > 0 && (
        <button 
          className="nav-arrow-fixed nav-arrow-left" 
          onClick={goPrev}
          aria-label="Previous Chapter"
          title="Previous Chapter (←)"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {activeIndex < totalPages - 1 && (
        <button 
          className="nav-arrow-fixed nav-arrow-right" 
          onClick={goNext}
          aria-label="Next Chapter"
          title="Next Chapter (→)"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* 3D Book Viewport Stage */}
      <main className="book-stage">
        {/* Outer Hardcover Frame containing the 3D Book Object */}
        <div className="book-hardcover-wrapper">
          {/* Stacked Pages Bulk (Left Side) */}
          <div 
            className="book-stack-left" 
            style={{ width: `${leftStackThickness}px` }} 
            aria-hidden="true" 
          />

          {/* Stacked Pages Bulk (Right Side) */}
          <div 
            className="book-stack-right" 
            style={{ width: `${rightStackThickness}px` }} 
            aria-hidden="true" 
          />

          {/* Main Book Surface Container */}
          <div 
            className="book-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Realistic Center Gutter Shadow Overlay */}
            <div className="book-spine-gutter" aria-hidden="true" />
            
            {/* Page Spread Curvature Lighting */}
            <div className="book-spread-lighting" aria-hidden="true" />

            <div 
              className={`page-turn-wrapper ${
                turnDirection === 'next' ? 'page-turn-flip-next' : turnDirection === 'prev' ? 'page-turn-flip-prev' : ''
              }`}
            >
              {/* Render active chapter component */}
              {children}
            </div>

            {/* Page Corner Flip Affordances */}
            {activeIndex < totalPages - 1 && (
              <div 
                className="corner-curl" 
                onClick={goNext} 
                title="Next Page (Click or press →)" 
                aria-label="Turn to next page"
              />
            )}

            {activeIndex > 0 && (
              <div 
                className="corner-curl corner-curl-prev" 
                onClick={goPrev} 
                title="Previous Page (Click or press ←)" 
                aria-label="Turn to previous page"
              />
            )}
          </div>
        </div>
      </main>

      {/* Page Footer (Page Counter only) */}
      <footer className="page-footer" style={{ padding: '1rem 4rem', justifyContent: 'center', border: 'none' }}>
        <div className="page-number">
          Page {activeIndex + 1} of {totalPages}
        </div>
      </footer>
    </div>
  )
}
