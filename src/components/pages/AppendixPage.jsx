import React from 'react'

export default function AppendixPage() {
  const certifications = [
    { title: 'AWS Academy Graduate: Cloud Foundations', issuer: 'Amazon Web Services', date: 'Oct 2025' },
    { title: 'Oracle Academy: Database Programming with SQL (90 hrs, 82%)', issuer: 'Oracle Academy', date: '2025-26' },
    { title: 'Oracle Academy: Database Design (90 hrs, 96%)', issuer: 'Oracle Academy', date: '2025-26' },
    { title: 'MathWorks Onramp Series: MATLAB, Machine Learning & Deep Learning', issuer: 'MathWorks', date: 'Feb 2026' }
  ]

  const achievements = [
    { title: 'Winner (1st Place), Hack4Innovation', details: 'VESIT × Rotary Club of Mumbai (Built NaviSense TFLite platform)', date: 'March 2026' },
    { title: '3rd Prize, Manthan: Deep Thinking', details: 'Aarohan 2026, VESIT Dept. Technology Day', date: 'March 2026' },
    { title: '2nd Runner-Up, Genesis Hackathon', details: 'AI/ML & Blockchain Track (500+ registrations nationwide)', date: '2025' },
    { title: '2nd Position, Youth Conclave', details: 'Sydenham College of Commerce and Economics, Mumbai', date: '2025' }
  ]

  return (
    <div className="page-container animate-fade-in">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter V</span>
        <h2 className="chapter-title">Appendix: Certifications &amp; Honors</h2>
        <p className="chapter-subtitle">Verified technical accreditations, hackathon titles, and awards</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Honors & Hackathon Wins */}
        <section>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-blue)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-sand)', paddingBottom: '0.4rem' }}>
            Honors &amp; Recognition
          </h3>
          <ul style={{ listStyle: 'none' }}>
            {achievements.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-ink)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {item.details} • <span style={{ fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-blue)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-sand)', paddingBottom: '0.4rem' }}>
            Certifications &amp; Training
          </h3>
          <ul style={{ listStyle: 'none' }}>
            {certifications.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-ink)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {item.issuer} • <span style={{ fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
