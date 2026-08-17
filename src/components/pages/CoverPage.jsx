import React from 'react'

export default function CoverPage({ onOpenBook }) {
  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '620px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        
        {/* Abstract Helix & Book Line Motif */}
        <div style={{ marginBottom: '2rem' }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="34" stroke="#E4DCD0" strokeWidth="1.5" />
            <path d="M26 46C30 38 42 34 46 26" stroke="#1D3557" strokeWidth="2" strokeLinecap="round" />
            <path d="M46 46C42 38 30 34 26 26" stroke="#5C7A99" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="36" x2="44" y2="36" stroke="#1D3557" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="36" cy="36" r="3" fill="#1D3557" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <h1 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '3.25rem', 
            fontWeight: 600, 
            color: 'var(--ink-blue)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            lineHeight: 1.15
          }}
        >
          Khushi Singh
        </h1>

        <p 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.25rem', 
            color: 'var(--text-ink)', 
            marginBottom: '2rem',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Building at the intersection of code, cells, and verse.
        </p>

        {/* Caveat Script Personal Signature Mark */}
        <div 
          style={{ 
            fontFamily: 'var(--font-script)', 
            fontSize: '1.6rem', 
            color: 'var(--ink-blue-muted)', 
            marginBottom: '3rem'
          }}
        >
          ~ A Research &amp; Engineering Notebook ~
        </div>

        {/* Open Book Prompt */}
        <div>
          <button 
            className="cta-button" 
            onClick={onOpenBook}
            aria-label="Open the book to Chapter I"
          >
            <span>Open the Book</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Press <kbd className="code-inline">→</kbd> key or click corner to turn pages
        </div>

      </div>
    </div>
  )
}
