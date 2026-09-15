import React from 'react'

export default function CoverPage({ onOpenBook }) {
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '620px', textAlign: 'center' }}>
      
      {/* Top Journal Plate Header */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <span style={{ width: '28px', height: '1px', background: 'var(--accent-gold)', opacity: 0.5 }}></span>
        <span>Field Journal &bull; Codex 01</span>
        <span style={{ width: '28px', height: '1px', background: 'var(--accent-gold)', opacity: 0.5 }}></span>
      </div>

      {/* Handcrafted Biological & Engineering Seal */}
      <div style={{ marginBottom: '2.25rem', position: 'relative' }}>
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.6s var(--ease-smooth)' }}>
          {/* Outer coordinate ring */}
          <circle cx="44" cy="44" r="41" stroke="#d4c4a8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="44" cy="44" r="35" stroke="#b89a5a" strokeWidth="1.25" opacity="0.75" />
          
          {/* Biological double-curve motif */}
          <path d="M30 58C36 46 52 42 58 30" stroke="#1a1612" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M58 58C52 46 36 42 30 30" stroke="#7d8471" strokeWidth="1.75" strokeLinecap="round" />
          
          {/* Base pair connection nodes */}
          <line x1="33" y1="44" x2="55" y2="44" stroke="#b89a5a" strokeWidth="1.25" />
          <circle cx="33" cy="44" r="2" fill="#b89a5a" />
          <circle cx="55" cy="44" r="2" fill="#b89a5a" />
          <circle cx="44" cy="44" r="3.5" fill="#1a1612" />

          {/* Cardinal markers */}
          <line x1="44" y1="5" x2="44" y2="10" stroke="#b89a5a" strokeWidth="1" />
          <line x1="44" y1="78" x2="44" y2="83" stroke="#b89a5a" strokeWidth="1" />
          <line x1="5" y1="44" x2="10" y2="44" stroke="#b89a5a" strokeWidth="1" />
          <line x1="78" y1="44" x2="83" y2="44" stroke="#b89a5a" strokeWidth="1" />
        </svg>
      </div>

      {/* Author Name */}
      <h1 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2.75rem, 5vw, 3.5rem)', 
          fontWeight: 600, 
          color: 'var(--ink-dark)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginBottom: '0.85rem'
        }}
      >
        Khushi Singh
      </h1>

      {/* Guiding Subtitle */}
      <p 
        style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: '1.05rem', 
          color: 'var(--ink-medium)', 
          maxWidth: '520px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.6,
          fontWeight: 400
        }}
      >
        Synthesizing biological systems, software engineering, and poetic precision.
      </p>

      {/* Script Quote */}
      <div 
        style={{ 
          fontFamily: 'var(--font-script)', 
          fontSize: '1.45rem', 
          color: 'var(--accent-sage)', 
          marginBottom: '2.5rem'
        }}
      >
        ~ &ldquo;Where the cell computes and the code breathes&rdquo; ~
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <button 
          className="cta-button" 
          onClick={onOpenBook}
          aria-label="Open the journal"
        >
          <span>Open the Journal</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <a
          href="/resume.html"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
          style={{ 
            background: 'transparent', 
            color: 'var(--ink-dark)', 
            borderColor: 'var(--border-paper)', 
            boxShadow: 'none' 
          }}
          aria-label="Read Resume"
        >
          <span>Curriculum Vitae</span>
        </a>
      </div>

      {/* Bottom Hint */}
      <div style={{ 
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem', 
        color: 'var(--ink-light)',
        letterSpacing: '0.04em'
      }}>
        Use <kbd className="code-inline">&larr;</kbd> and <kbd className="code-inline">&rarr;</kbd> keys or click chapter tabs to navigate
      </div>

    </div>
  )
}
