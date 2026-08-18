import React from 'react'

export default function ProloguePage() {
  return (
    <div className="page-container animate-fade-in">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter I</span>
        <h2 className="chapter-title">Prologue: The Instinct to Notice Patterns</h2>
        <p className="chapter-subtitle">About my background, orientation, and curiosity</p>
      </header>

      <div style={{ maxWidth: '780px' }}>
        <p className="lead-text">
          I am a third-year B.E. Information Technology student at VESIT, Mumbai, maintaining a cumulative CGPA of <strong style={{ color: 'var(--ink-blue)', fontWeight: 600 }}>9.91/10</strong> through Semester 6. My work centers on the intersection of blockchain, artificial intelligence, and healthcare technology.
        </p>

        <p>
          Rather than viewing research and system architecture as separate domains, I approach them as dual lenses for the same core objective: taking messy, complex biological or distributed systems and engineering clean, verifiable abstractions. My recent work bridges decentralized infrastructure with biomedical applications, from zero-knowledge reagent tracking to on-device neural inference for medical imaging.
        </p>

        <p>
          I hold a standing orientation toward bioinformatics and neuroscience, fascinated by how computational modeling can elucidate physical biology. Whether analyzing HPLC retention times, optimizing convolutional vision transformers, or designing gasless smart contract workflows, I look for elegance in structure and correctness in proof.
        </p>

        <div className="marginalia-note">
          "Outside of terminal windows and research papers, I write poetry. Code and verse come from the exact same instinct: noticing patterns and crafting something precise out of them."
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--bg-paper)', border: '1px solid var(--border-sand)', borderRadius: '6px', padding: '1rem 1.25rem', flex: '1 1 200px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-blue-muted)', marginBottom: '0.2rem' }}>ACADEMIC RECORD</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink-blue)' }}>VESIT, Mumbai</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>B.E. Information Technology • CGPA 9.91/10</div>
          </div>

          <div style={{ background: 'var(--bg-paper)', border: '1px solid var(--border-sand)', borderRadius: '6px', padding: '1rem 1.25rem', flex: '1 1 200px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-blue-muted)', marginBottom: '0.2rem' }}>PRIMARY FOCUS</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink-blue)' }}>Blockchain &amp; Bio-AI</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ZK Proofs, Account Abstraction, Medical Deep Learning</div>
          </div>
        </div>
      </div>
    </div>
  )
}
