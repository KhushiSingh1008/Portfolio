import React from 'react'

export default function FieldNotesPage() {
  const experiences = [
    {
      role: 'Software Developer & Research Intern',
      organization: 'VJTI (Veermata Jijabai Technological Institute)',
      period: 'May 2025 – Jul 2025',
      domain: 'Medical Computer Vision & Deep Learning',
      points: [
        'Developed deep learning models for automated disease classification from multi-modal medical scans (MRI, CT, X-ray) using TensorFlow, HuggingFace, CNNs (ResNet), and Vision Transformers (ViTs).',
        'Evaluated models on rigorous clinical benchmark metrics including Precision, Recall, and AUC-ROC curves for diagnostic accuracy.',
        'Engineered end-to-end medical image preprocessing pipelines featuring data augmentation, intensity normalization, and class-imbalance correction techniques.'
      ]
    },
    {
      role: 'Junior Public Relations Officer',
      organization: 'ISTE-VESIT',
      period: 'Aug 2024 – Present',
      domain: 'Stakeholder Communications & Outreach',
      points: [
        'Managed communications and external stakeholder coordination for 10+ major technical events per academic year.',
        'Spearheaded strategic outreach initiatives that drove a 30% increase in student registration and inter-college participation.'
      ]
    },
    {
      role: 'Graphics Head',
      organization: 'VESLIT (VESIT Literary & Technical Society)',
      period: '2024 – Present',
      domain: 'Visual Identity & Design Systems',
      points: [
        'Directed visual identity and creative media design for flagship literary and technical publications, symposia, and events.'
      ]
    }
  ]

  return (
    <div className="page-container animate-fade-in">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter III</span>
        <h2 className="chapter-title">Field Notes — Experience &amp; Research</h2>
        <p className="chapter-subtitle">Formal internships, research engagements, and leadership roles</p>
      </header>

      <div style={{ maxWidth: '780px' }}>
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            style={{ 
              marginBottom: '2rem', 
              paddingBottom: '1.75rem', 
              borderBottom: idx === experiences.length - 1 ? 'none' : '1px solid var(--border-sand)' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink-blue)' }}>
                {exp.role}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {exp.period}
              </span>
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-ink)', marginTop: '0.2rem' }}>
              {exp.organization} <span style={{ color: 'var(--ink-blue-muted)', fontWeight: 400 }}>• {exp.domain}</span>
            </div>

            <ul className="metric-list">
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
