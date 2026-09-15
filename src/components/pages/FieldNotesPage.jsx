import React from 'react'

export default function FieldNotesPage() {
  const experiences = [
    {
      role: 'Software Developer & Research Intern',
      organization: 'VJTI (Veermata Jijabai Technological Institute)',
      period: 'May 2025 — Jul 2025',
      domain: 'Medical Computer Vision & Deep Learning',
      points: [
        'Developed deep learning pipelines for automated pathology classification across multi-modal scans (MRI, CT, X-ray) using TensorFlow, HuggingFace, ResNet, and Vision Transformers (ViTs).',
        'Evaluated models on rigorous clinical diagnostic benchmarks with full Precision-Recall and AUC-ROC curves for balanced predictive validity.',
        'Engineered end-to-end preprocessing pipelines featuring stochastic data augmentation, intensity normalization, and class-imbalance correction.'
      ]
    },
    {
      role: 'Junior Public Relations Officer',
      organization: 'ISTE-VESIT',
      period: 'Aug 2024 — June 2026',
      domain: 'Institutional Outreach & Technical Symposia',
      points: [
        'Managed communications and stakeholder coordination for 10+ major technical symposiums and academic competitions per year.',
        'Spearheaded strategic outreach initiatives driving a 30% increase in cross-collegiate participant registration.'
      ]
    },
    {
      role: 'Graphics Head',
      organization: 'VESLIT (VESIT Literary & Technical Society)',
      period: '2024 — Present',
      domain: 'Visual Identity & Editorial Design',
      points: [
        'Directed visual identity and creative media systems for flagship literary publications, technical magazines, and university symposiums.'
      ]
    }
  ]

  return (
    <div className="page-container">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter III</span>
        <h2 className="chapter-title">Field Notes: Experience &amp; Research</h2>
        <p className="chapter-subtitle">Research internships, clinical machine learning, and institutional leadership</p>
      </header>

      <div style={{ maxWidth: '800px', position: 'relative', paddingLeft: '1.25rem' }}>
        {/* Subtle vertical journal stem / timeline */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '8px',
          bottom: '12px',
          width: '1px',
          background: 'linear-gradient(to bottom, var(--accent-gold), var(--border-paper) 80%, transparent)',
        }} />

        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            style={{ 
              position: 'relative',
              marginBottom: '2.5rem', 
              paddingBottom: idx === experiences.length - 1 ? '0' : '2rem', 
              borderBottom: idx === experiences.length - 1 ? 'none' : '1px solid rgba(212, 196, 168, 0.4)' 
            }}
          >
            {/* Timeline node */}
            <div style={{
              position: 'absolute',
              left: '-1.55rem',
              top: '6px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: 'var(--bg-paper)',
              border: '2px solid var(--accent-gold)',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--ink-dark)' }}>
                {exp.role}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-gold)', letterSpacing: '0.04em' }}>
                [{exp.period}]
              </span>
            </div>

            <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--ink-medium)', marginTop: '0.2rem' }}>
              {exp.organization} <span style={{ color: 'var(--accent-sage)', fontWeight: 400 }}>&bull; {exp.domain}</span>
            </div>

            <ul className="metric-list" style={{ marginTop: '0.75rem' }}>
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
