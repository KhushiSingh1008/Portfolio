import React from 'react'

const contactItems = [
  {
    label: 'EMAIL',
    href: 'mailto:khushisingh10.08.2005@gmail.com',
    text: 'khushisingh10.08.2005@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Zm2.2-.5 6.8 5.1 6.8-5.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/khushisingh0811',
    text: 'linkedin.com/in/khushisingh0811',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 9.5V17M7 7.2v.1M11 17v-4.7a2.3 2.3 0 0 1 4.6 0V17M11 9.5v7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    )
  },
  {
    label: 'GITHUB',
    href: 'https://github.com/KhushiSingh1008',
    text: 'github.com/KhushiSingh1008',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18.5c-4.5 1.4-4.5-2.2-6-2.5M15 20v-3.8a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.8 4.8 0 0 0-1.3-3.3A4.4 4.4 0 0 0 18.6 3s-1.1-.3-3.6 1.4a12 12 0 0 0-6.2 0C7.3 2.7 6.2 3 6.2 3a4.4 4.4 0 0 0-.2 3.1A4.8 4.8 0 0 0 4.7 9.4c0 4.7 2.9 5.7 5.6 6A3 3 0 0 0 9.5 17.2V20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: 'LEETCODE',
    href: 'https://leetcode.com/u/KhushiSingh1008',
    text: 'leetcode.com/u/KhushiSingh1008',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 18.5V8.8a1.3 1.3 0 0 1 1.3-1.3H12v10.5M12 7.5h3.5A1.3 1.3 0 0 1 17 8.8v9.7M9 11.5h6M9 14.5h4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

export default function ContactPage() {
  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '600px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <header className="chapter-header" style={{ marginBottom: '2rem' }}>
          <span className="chapter-numeral">Fin</span>
          <h2 className="chapter-title" style={{ fontSize: '2.5rem' }}>Closing &amp; Contact</h2>
          <p className="chapter-subtitle">Open for research collaborations, engineering roles, and discussions</p>
        </header>

        <p className="lead-text">
          Thank you for taking the time to read through this notebook. If you are working on decentralized infrastructure, biomedical machine learning, or simply want to converse about code and verse, I would love to connect.
        </p>

        <ul className="contact-list">
          {contactItems.map((item) => (
            <li className="contact-item" key={item.label}>
              <span className="contact-label">{item.label}</span>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-value"
              >
                <span className="contact-icon">{item.icon}</span>
                {item.text}
              </a>
            </li>
          ))}

          <li className="contact-item">
            <span className="contact-label">RESUME</span>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="contact-value">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3.5h7l5 5V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Zm7 1.5V9h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 13.5h7M8.5 17h7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              </span>
              View resume
            </a>
          </li>
        </ul>

        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            fontFamily: 'var(--font-script)',
            fontSize: '1.5rem',
            color: 'var(--ink-blue-muted)'
          }}
        >
          "Building at the intersection of code, cells, and verse."
        </div>

      </div>
    </div>
  )
}
