import React from 'react'

export default function MarginaliaPage() {
  return (
    <div className="page-container animate-fade-in">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter IV</span>
        <h2 className="chapter-title">Marginalia: Notes in the Margins</h2>
        <p className="chapter-subtitle">On bioinformatics, neuroscience, and the biological thread</p>
      </header>

      <div style={{ maxWidth: '720px' }}>
        <p className="lead-text">
          If you look closely at my engineering projects, you will find biological motifs running under the surface. This is not coincidental.
        </p>

        <p>
          I have long held a sustained curiosity for computational biology and neuroscience, specifically how algorithmic tools can parse the noise of complex organic datasets. Biological code evolved over eons with its own error-correction, proofreading, and consensus mechanisms.
        </p>

        {/* Handwritten Annotation Box */}
        <div className="marginalia-note" style={{ position: 'relative', margin: '2rem 0' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.45rem', color: 'var(--ink-blue)', lineHeight: 1.4 }}>
            "Note on bio-inspired code: High-Performance Liquid Chromatography (HPLC) profiles are chemical fingerprints. BioToken parses 137 RDKit molecular descriptors to catch counterfeit reagents before they touch a lab bench."
          </div>
        </div>

        <p>
          This thread connects my VJTI medical imaging research (classifying pathology across X-ray, CT, and MRI scans using convolutional transformers) to BioToken's molecular anomaly classification trained on 77,901 molecules.
        </p>

        <p>
          Whether modeling neural firing rates or building cryptographic integrity proofs for patient EHRs in RecBlock, the goal remains identical: building software that respects the nuance of human biology while upholding mathematical rigor.
        </p>

        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'var(--ink-blue-wash)', borderRadius: '6px', border: '1px dashed var(--ink-blue-muted)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-blue)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            RESEARCH HYPOTHESIS &amp; FUTURE DIRECTIONS
          </div>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-ink)', lineHeight: 1.6 }}>
            Investigating privacy-preserving Zero-Knowledge Proofs for genomic sequence matching &amp; federated deep learning on decentralized health networks.
          </div>
        </div>
      </div>
    </div>
  )
}
