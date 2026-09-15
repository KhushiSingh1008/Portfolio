import React from 'react'

export default function MarginaliaPage() {
  return (
    <div className="page-container">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter IV</span>
        <h2 className="chapter-title">Marginalia: Notes in the Margins</h2>
        <p className="chapter-subtitle">On computational biology, neuroscience, and the poetic continuum</p>
      </header>

      <div style={{ maxWidth: '760px' }}>
        <p className="lead-text">
          If you examine the architecture of my engineering systems, you will find biological motifs running beneath the surface. This is not incidental aesthetic; it is structural.
        </p>

        <p>
          Biological code evolved over eons with its own elegant fault-tolerance, polymerase proofreading, and cellular consensus algorithms. In both biochemistry and distributed software, nature and computing confront the same fundamental challenge: transmitting high-fidelity information across noisy, adversarial environments.
        </p>

        {/* Handwritten Annotation Callout */}
        <div className="marginalia-note" style={{ margin: '2rem 0' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--ink-dark)', lineHeight: 1.45 }}>
            &ldquo;HPLC profiles are chemical fingerprints. In BioToken, we parse 137 RDKit cheminformatics descriptors to catch degraded or counterfeit reagents before they touch a lab bench.&rdquo;
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-gold)', marginTop: '0.5rem', letterSpacing: '0.08em' }}>
            &mdash; LAB NOTEBOOK ENTRY 04.B
          </div>
        </div>

        <p>
          This thread binds my medical computer vision research at VJTI&mdash;classifying subtle pathologies across MRI, CT, and radiographs with convolutional transformers&mdash;to BioToken&rsquo;s molecular anomaly classification trained on 77,901 chemical entities.
        </p>

        {/* Verse Interlude */}
        <div style={{
          margin: '2.5rem 0',
          padding: '1.5rem 2rem',
          background: 'rgba(125, 132, 113, 0.08)',
          borderRadius: '4px',
          borderLeft: '2px solid var(--accent-sage)',
        }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink-dark)', lineHeight: 1.8 }}>
            &ldquo;To write a parser is to prune a hedge;<br />
            to trace a codon is to map a bridge.<br />
            Between the silent nucleotide and the executing thread,<br />
            lies all the living things that ever spoke or bled.&rdquo;
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-sage)', marginTop: '0.75rem', letterSpacing: '0.05em' }}>
            &mdash; FRAGMENT FROM NOTEBOOK IV
          </div>
        </div>

        <p>
          Whether modeling synaptic firing dynamics or constructing verifiable integrity proofs for patient health records in RecBlock, the core purpose is unchanged: engineering software that respects biological subtlety while maintaining mathematical clarity.
        </p>

        {/* Research Hypothesis Container */}
        <div className="research-box">
          <div className="research-box-label">
            RESEARCH DIRECTION &amp; HYPOTHESIS
          </div>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink-dark)', lineHeight: 1.7 }}>
            Investigating privacy-preserving Zero-Knowledge proofs for genomic sequence alignment and decentralized federated learning across private clinical cohorts.
          </p>
        </div>
      </div>
    </div>
  )
}
