import React from 'react'

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
          <li className="contact-item">
            <span className="contact-label">EMAIL</span>
            <a 
              href="mailto:khushisingh10.08.2005@gmail.com" 
              className="contact-value"
            >
              khushisingh10.08.2005@gmail.com
            </a>
          </li>

          <li className="contact-item">
            <span className="contact-label">LINKEDIN</span>
            <a 
              href="https://linkedin.com/in/khushisingh0811" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-value"
            >
              linkedin.com/in/khushisingh0811
            </a>
          </li>

          <li className="contact-item">
            <span className="contact-label">GITHUB</span>
            <a 
              href="https://github.com/KhushiSingh1008" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-value"
            >
              github.com/KhushiSingh1008
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
