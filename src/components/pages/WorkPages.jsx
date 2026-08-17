import React from 'react'

export default function WorkPages() {
  const projects = [
    {
      id: 'recblock',
      title: 'RecBlock — Web 2.5 Decentralised EHR System',
      tags: ['Solidity', 'Polygon PoS', 'IPFS', 'React', 'Node.js', 'AES-256-GCM', 'ERC-4337'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'A Web 2.5 bridge giving patients full cryptographic record ownership with Web2-grade usability.',
      metrics: [
        'Eliminates wallet and gas-fee friction via ERC-4337 Account Abstraction (Privy + Pimlico Paymaster) — INR 0.27 ($0.003) per transaction',
        '1.5s average retrieval: AES-256-GCM encrypted records stored on IPFS, decrypted locally, bypassing on-chain consensus for reads while anchoring keccak256 integrity proofs on Polygon PoS for tamper-proof audit trails'
      ]
    },
    {
      id: 'biotoken',
      title: 'BioToken — Reagent Provenance & Verification',
      tags: ['Python', 'XGBoost', 'Solidity', 'Polygon PoS', 'ZK-SNARKs', 'FastAPI', 'RDKit'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'End-to-end reagent authentication pipeline from manufacturer HPLC scan to on-chain ZK proof, addressing supply chain fraud without exposing proprietary chemical data — $0.0087 per vial on Polygon PoS.',
      metrics: [
        'XGBoost anomaly classifier trained on 77,901 molecules (137 RDKit features) to detect tampered reagents via HPLC retention-time deviation — AUC 0.9798, F1 0.9351, validated on 1,000 real multi-lab entries and 15 published degradation measurements',
        '2 Solidity smart contracts managing 5 lifecycle states with role-based access control; FastAPI backend handles webhook-based custody logging and cross-company consensus validation'
      ]
    },
    {
      id: 'navisense',
      title: 'NaviSense — Inclusive Visual Assistance Platform',
      tags: ['Flutter', 'YOLOv8n TFLite', 'Python', 'Firebase', 'On-Device AI'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'Quantized YOLOv8n TFLite model deployed entirely on-device, zero network dependency — real-time inference at 1 frame/3s, built for 70M+ visually impaired users in low-connectivity regions.',
      award: '🏆 Won 1st Place, Hack4Innovation (VESIT × Rotary Club of Mumbai, March 2026)',
      metrics: [
        'Zero network dependency with full on-device quantized model quantization for low latency and privacy',
        'Optimized computer vision pipeline for real-time scene description and obstacle warning audio feedback'
      ]
    }
  ]

  return (
    <div className="page-container animate-fade-in">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter II</span>
        <h2 className="chapter-title">The Work — Engineering &amp; Systems</h2>
        <p className="chapter-subtitle">Architectural case studies bridging cryptography, machine learning, and healthcare</p>
      </header>

      <div>
        {projects.map((proj) => (
          <article key={proj.id} className="project-card">
            <div className="project-title">
              <span>{proj.title}</span>
              <div className="project-links">
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link-icon"
                  aria-label={`GitHub repository for ${proj.title}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>Code</span>
                </a>
              </div>
            </div>

            <p style={{ marginTop: '0.6rem', color: 'var(--text-ink)', fontSize: '1rem', fontStyle: 'italic' }}>
              "{proj.narrative}"
            </p>

            {proj.award && (
              <div style={{ marginTop: '0.6rem', padding: '0.4rem 0.75rem', background: 'var(--ink-blue-wash)', borderRadius: '4px', border: '1px solid var(--border-sand)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-blue)' }}>
                {proj.award}
              </div>
            )}

            <ul className="metric-list">
              {proj.metrics.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>

            <div style={{ marginTop: '1.25rem' }}>
              {proj.tags.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
