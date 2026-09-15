import React from 'react'

export default function ProloguePage({ onNext }) {
  return (
    <div className="page-container">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter I</span>
        <h2 className="chapter-title">Prologue: The Instinct to Notice Patterns</h2>
        <p className="chapter-subtitle">Academic trajectory, systems architecture, and core orientation</p>
      </header>

      <div style={{ maxWidth: '800px' }}>
        <p className="lead-text">
          I am a third-year B.E. Information Technology student at VESIT, Mumbai, maintaining a cumulative CGPA of <strong style={{ color: 'var(--ink-dark)', fontWeight: 600 }}>9.91 / 10</strong> through Semester 6. My engineering practice centers at the convergence of distributed systems, artificial intelligence, and biological computing.
        </p>

        <p>
          Rather than viewing algorithmic research and software architecture as disconnected fields, I approach them as dual facets of the same core endeavor: observing intricate, nonlinear physical or distributed phenomena, and designing clean, verifiable abstractions. From zero-knowledge reagent custody to on-device neural inference for diagnostic radiology, I aim to build systems that are provable, robust, and humane.
        </p>

        <p>
          My technical focus spans bioinformatics, neuroscience, and decentralized protocols. Whether analyzing chromatographic peak alignments, tuning lightweight vision transformers, or engineering gas-optimized ERC-4337 smart contracts, I value structural rigor and precision above superficial complexity.
        </p>

        <div className="marginalia-note">
          &ldquo;Outside of terminal windows and research papers, I write poetry. Code and verse come from the exact same instinct: noticing recurring patterns in silence and crafting something precise out of them.&rdquo;
        </div>

        {/* Specimen / Stat Cards */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div className="stat-card">
            <div className="stat-label">Academic Record</div>
            <div className="stat-value">VESIT, Mumbai</div>
            <div className="stat-detail">B.E. Information Technology &bull; CGPA 9.91 / 10</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Core Domains</div>
            <div className="stat-value">Bioinformatics &amp; Bio-AI</div>
            <div className="stat-detail">Cellular automata, neural vision, genomics pipelines</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Infrastructure</div>
            <div className="stat-value">Web3 &amp; Cryptography</div>
            <div className="stat-detail">Account Abstraction, ZK Proofs, Solidity &amp; Rust</div>
          </div>
        </div>

        {/* Biological specimen sketch footer accent */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.15rem', color: 'var(--accent-sage)' }}>
            fig 1.0 &mdash; observation notes &amp; background
          </span>
          {onNext && (
            <button 
              onClick={onNext}
              className="chapter-tab" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-dark)', fontSize: '0.82rem' }}
            >
              <span>Explore Selected Work</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
