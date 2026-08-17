import { useMemo } from 'react'

export default function Particles({ count = 25, color }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 4 + 2 // 2–6px
      const left = Math.random() * 100 // 0–100%
      const delay = Math.random() * 15 // 0–15s
      const duration = Math.random() * 10 + 12 // 12–22s
      const drift = (Math.random() - 0.5) * 60 // -30 to +30px

      return (
        <div
          key={i}
          className="particle"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            bottom: `-${size}px`,
            '--particle-delay': `${delay}s`,
            '--particle-duration': `${duration}s`,
            '--particle-drift': `${drift}px`,
            '--particle-opacity': 0.15,
            background: color || 'var(--text-primary)',
          }}
        />
      )
    })
  }, [count, color])

  return <div className="particles-container">{particles}</div>
}
