import React, { useState } from 'react'

export default function VersesPage() {
  const [isReadingMode, setIsReadingMode] = useState(false)

  const toggleReadingMode = () => {
    setIsReadingMode(prev => {
      const next = !prev
      if (next) {
        document.body.classList.add('reading-mode')
      } else {
        document.body.classList.remove('reading-mode')
      }
      return next
    })
  }

  // 4 genuinely blank poem slots for Khushi to insert her poems
  const poemSlots = [
    { id: 1, slotNum: 'I' },
    { id: 2, slotNum: 'II' },
    { id: 3, slotNum: 'III' },
    { id: 4, slotNum: 'IV' }
  ]

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: isReadingMode ? '#F6F1EA' : 'var(--bg-paper)' }}>
      <header className="chapter-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="chapter-numeral" style={{ color: 'var(--accent-rose)' }}>Chapter V</span>
        <h2 className="chapter-title" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>
          Verses — Selected Poetry
        </h2>
        <p className="chapter-subtitle" style={{ fontStyle: 'italic' }}>
          Thoughts, rhythm, and observations written outside of code
        </p>

        {/* Reading Mode Toggle */}
        <div style={{ marginTop: '1.25rem' }}>
          <button 
            onClick={toggleReadingMode}
            style={{
              background: isReadingMode ? 'var(--accent-rose)' : 'transparent',
              color: isReadingMode ? '#FAF6F0' : 'var(--accent-rose)',
              border: '1px solid var(--accent-rose)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            aria-label="Toggle simplified reading mode for poetry"
          >
            {isReadingMode ? '✓ Reading Mode Active' : '📖 Enter Reading Mode'}
          </button>
        </div>
      </header>

      <div className="verses-container">
        {poemSlots.map((slot) => (
          <article key={slot.id} className="poem-block">
            <div className="poem-title">
              [POEM TITLE {slot.slotNum}]
            </div>
            
            <div className="poem-placeholder-box">
              <div className="poem-placeholder-text">
                [POEM TEXT {slot.slotNum}]
              </div>
              <div className="poem-placeholder-note">
                (Replace with your poem text in VersesPage.jsx)
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
