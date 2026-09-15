import React from 'react'

export default function AppendixPage() {
  const certifications = [
    { title: 'AWS Academy Graduate: Cloud Foundations', issuer: 'Amazon Web Services', date: 'Oct 2025' },
    { title: 'Oracle Academy: Database Programming with SQL (90 hrs, 82%)', issuer: 'Oracle Academy', date: '2025–26' },
    { title: 'Oracle Academy: Database Design (90 hrs, 96%)', issuer: 'Oracle Academy', date: '2025–26' },
    { title: 'MathWorks Onramp: MATLAB, Machine Learning & Deep Learning', issuer: 'MathWorks', date: 'Feb 2026' }
  ]

  const achievements = [
    { title: 'Winner (1st Place), Hack4Innovation', details: 'VESIT × Rotary Club of Mumbai (NaviSense Edge-AI platform)', date: 'March 2026', badge: '1ST PLACE' },
    { title: '3rd Prize, Manthan: Deep Thinking', details: 'Aarohan 2026, VESIT Dept. Technology Day', date: 'March 2026', badge: '3RD PRIZE' },
    { title: '2nd Runner-Up, Genesis Hackathon', details: 'AI/ML & Blockchain Track (500+ registrations nationwide)', date: '2025', badge: 'RUNNER-UP' },
    { title: '2nd Position, Youth Conclave', details: 'Sydenham College of Commerce and Economics, Mumbai', date: '2025', badge: '2ND POS' }
  ]

  return (
    <div className="page-container">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter V</span>
        <h2 className="chapter-title">Appendix: Certifications &amp; Honors</h2>
        <p className="chapter-subtitle">Verified accreditations, competitive hackathon awards, and credential records</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        
        {/* Honors & Hackathon Wins */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-paper)',
            paddingBottom: '0.6rem',
            marginBottom: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', fontWeight: 600 }}>
              Honors &amp; Recognitions
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>SEC. A</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {achievements.map((item, idx) => (
              <div 
                key={idx} 
                style={{
                  background: 'rgba(240, 230, 211, 0.4)',
                  border: '1px solid rgba(212, 196, 168, 0.6)',
                  borderRadius: '3px',
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--ink-dark)' }}>
                    {item.title}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '2px',
                    background: 'rgba(184, 154, 90, 0.15)',
                    color: 'var(--accent-gold)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    flexShrink: 0
                  }}>
                    {item.badge}
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-medium)', marginTop: '0.35rem' }}>
                  {item.details}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-sage)', marginTop: '0.3rem' }}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-paper)',
            paddingBottom: '0.6rem',
            marginBottom: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', fontWeight: 600 }}>
              Technical Certifications
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>SEC. B</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {certifications.map((item, idx) => (
              <div 
                key={idx} 
                style={{
                  background: 'rgba(240, 230, 211, 0.4)',
                  border: '1px solid rgba(212, 196, 168, 0.6)',
                  borderRadius: '3px',
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--ink-dark)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-medium)', marginTop: '0.35rem' }}>
                  Issuer: {item.issuer}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-sage)', marginTop: '0.3rem' }}>
                  Issued: {item.date}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
