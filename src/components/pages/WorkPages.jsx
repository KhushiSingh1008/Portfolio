import React from 'react'

export default function WorkPages() {
  const projects = [
    {
      id: 'recblock',
      code: 'SYS-01 // DISTRIBUTED HEALTHCARE',
      title: 'RecBlock: Web 2.5 Decentralised EHR System',
      tags: ['Solidity', 'Polygon PoS', 'IPFS', 'React', 'Node.js', 'AES-256-GCM', 'ERC-4337'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'A Web 2.5 architecture granting patients sovereign cryptographic ownership over health records while preserving consumer-grade usability.',
      metrics: [
        'Eliminates wallet seed phrases and gas friction via ERC-4337 Account Abstraction (Privy + Pimlico Paymaster) executing at INR 0.27 ($0.003) per transaction.',
        '1.5s average record retrieval: AES-256-GCM encrypted payloads stored on IPFS, decrypted strictly client-side, bypassing on-chain consensus latency while anchoring keccak256 cryptographic proofs on Polygon PoS.'
      ]
    },
    {
      id: 'biotoken',
      code: 'BIO-02 // CHEMINFORMATICS & CRYPTO',
      title: 'BioToken: Reagent Provenance & ZK Verification',
      tags: ['Python', 'XGBoost', 'Solidity', 'Polygon PoS', 'ZK-SNARKs', 'FastAPI', 'RDKit'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'End-to-end reagent custody verification from manufacturer HPLC scans to on-chain ZK proofs, mitigating biochemical counterfeit without disclosing proprietary molecular formulations.',
      metrics: [
        'XGBoost anomaly classifier trained on 77,901 molecules (137 RDKit cheminformatics descriptors) detecting tampered reagents via chromatographic retention-time deviation (AUC 0.9798, F1 0.9351).',
        'Dual Solidity smart contracts orchestrating 5 lifecycle custody states with role-based access control, coupled with FastAPI asynchronous consensus verification at $0.0087 per vial.'
      ]
    },
    {
      id: 'navisense',
      code: 'VIS-03 // EDGE INFERENCE & EMBEDDED',
      title: 'NaviSense: Inclusive Visual Assistance Platform',
      tags: ['Flutter', 'YOLOv8n TFLite', 'Python', 'Firebase', 'Edge AI'],
      github: 'https://github.com/KhushiSingh1008',
      narrative: 'Quantized neural vision pipeline operating entirely offline on mobile silicon, delivering low-latency spatial guidance for visually impaired individuals in remote environments.',
      award: '🏆 1st Place — Hack4Innovation (VESIT × Rotary Club of Mumbai, March 2026)',
      metrics: [
        'Zero network dependency: deployed quantized YOLOv8n TFLite model on-device with 1 frame per 3-second continuous inferencing to maximize battery efficiency.',
        'Audio-spatial feedback loop alerting users to dynamic obstacle vectors and elevation changes in real-time.'
      ]
    }
  ]

  return (
    <div className="page-container">
      <header className="chapter-header">
        <span className="chapter-numeral">Chapter II</span>
        <h2 className="chapter-title">The Work: Engineering &amp; Systems</h2>
        <p className="chapter-subtitle">Case studies bridging distributed consensus, molecular analysis, and edge vision</p>
      </header>

      <div>
        {projects.map((proj) => (
          <article key={proj.id} className="project-card">
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              marginBottom: '0.4rem',
              textTransform: 'uppercase'
            }}>
              {proj.code}
            </div>

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
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>Source</span>
                </a>
              </div>
            </div>

            <p style={{ marginTop: '0.5rem', color: 'var(--ink-medium)', fontSize: '0.94rem', fontStyle: 'italic', lineHeight: 1.6 }}>
              &ldquo;{proj.narrative}&rdquo;
            </p>

            {proj.award && (
              <div className="award-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>{proj.award}</span>
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
