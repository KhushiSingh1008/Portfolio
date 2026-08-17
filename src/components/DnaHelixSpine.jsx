import React from 'react'

export default function DnaHelixSpine({ activeChapter, totalChapters, isTransitioning, onSelectChapter }) {
  const chapterLabels = [
    'Cover',
    'I. Prologue',
    'II. The Work',
    'III. Field Notes',
    'IV. Marginalia',
    'V. Verses',
    'VI. Appendix',
    'Closing'
  ]

  // Render SVG DNA Double Helix for desktop
  const numPairs = 14
  const height = 480
  const width = 36
  const progressPercent = (activeChapter / (totalChapters - 1)) * 100

  const points = Array.from({ length: numPairs }).map((_, i) => {
    const y = (i / (numPairs - 1)) * (height - 40) + 20
    const phase = (i / numPairs) * Math.PI * 3
    const x1 = width / 2 + Math.sin(phase) * 12
    const x2 = width / 2 - Math.sin(phase) * 12
    const chapterIndexForPoint = Math.floor((i / (numPairs - 1)) * totalChapters)
    const isLit = chapterIndexForPoint <= activeChapter
    return { y, x1, x2, isLit, index: i, chapterIndexForPoint }
  })

  return (
    <>
      {/* Mobile Top Progress Ribbon */}
      <div className="helix-mobile-bar" aria-label="Mobile reading progress">
        <div 
          className="helix-mobile-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop Vertical DNA Spine (Right Margin) */}
      <aside 
        className={`helix-sidebar ${isTransitioning ? 'helix-animating' : ''}`}
        aria-label="DNA Helix Navigation Spine"
      >
        <div className="helix-svg-container">
          <svg 
            width={width} 
            height={height} 
            viewBox={`0 0 ${width} ${height}`}
            style={{
              transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isTransitioning ? 'rotateY(180deg) scale(1.04)' : 'rotateY(0deg) scale(1)'
            }}
          >
            <defs>
              <linearGradient id="helixGradLit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1D3557" />
                <stop offset="100%" stopColor="#5C7A99" />
              </linearGradient>
              <linearGradient id="helixGradDim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E4DCD0" />
                <stop offset="100%" stopColor="#D2C8B8" />
              </linearGradient>
            </defs>

            {/* Base pairs (connecting horizontal rungs) */}
            {points.map((p, idx) => (
              <line
                key={`rung-${idx}`}
                x1={p.x1}
                y1={p.y}
                x2={p.x2}
                y2={p.y}
                stroke={p.isLit ? '#1D3557' : '#E4DCD0'}
                strokeWidth={p.isLit ? 1.5 : 1}
                strokeDasharray={p.isLit ? 'none' : '2 2'}
                opacity={p.isLit ? 0.85 : 0.4}
              />
            ))}

            {/* Strand 1 Curve */}
            <path
              d={points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x1} ${p.y}`, '')}
              fill="none"
              stroke="url(#helixGradLit)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Strand 2 Curve */}
            <path
              d={points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x2} ${p.y}`, '')}
              fill="none"
              stroke="url(#helixGradLit)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Chapter Node Dots */}
            {Array.from({ length: totalChapters }).map((_, cIdx) => {
              const nodeY = (cIdx / (totalChapters - 1)) * (height - 40) + 20
              const isActive = cIdx === activeChapter
              const isPast = cIdx < activeChapter

              return (
                <g 
                  key={`node-${cIdx}`} 
                  onClick={() => onSelectChapter(cIdx)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={width / 2}
                    cy={nodeY}
                    r={isActive ? 6 : isPast ? 4 : 3}
                    fill={isActive ? '#1D3557' : isPast ? '#5C7A99' : '#FAF6F0'}
                    stroke="#1D3557"
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <title>{`${chapterLabels[cIdx]} (Click to navigate)`}</title>
                </g>
              )
            })}
          </svg>
        </div>
      </aside>
    </>
  )
}
