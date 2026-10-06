import { useEffect, useRef } from 'react'

const TRAIL = 8
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .interactive'

// A neuron cursor: a glowing soma at the pointer, a lagging ring of dendrites,
// an axon trail of fading signal dots, and an action-potential ripple on click.
// Hovering a 3D neuron shows its name next to the cursor.
export default function CustomCursor() {
  const rootRef = useRef(null)
  const somaRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const trailRefs = useRef([])

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    document.body.classList.add('cursor-active')

    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    const trail = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))
    let neuronHover = false
    let raf

    const setFlag = (name, on) => root.classList.toggle(name, on)

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setFlag('visible', true)
    }
    const onOver = (e) => setFlag('hovering', neuronHover || Boolean(e.target.closest?.(INTERACTIVE)))
    const onDown = (e) => {
      setFlag('pressed', true)
      const ripple = document.createElement('span')
      ripple.className = 'cursor-ripple'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      root.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }
    const onUp = () => setFlag('pressed', false)
    const onLeave = () => setFlag('visible', false)
    const onNeuron = (e) => {
      neuronHover = Boolean(e.detail)
      setFlag('hovering', neuronHover)
      setFlag('labelled', neuronHover)
      if (e.detail) {
        labelRef.current.textContent = e.detail.label
        root.style.setProperty('--cursor-c', e.detail.color)
      } else {
        root.style.removeProperty('--cursor-c')
      }
    }

    const tick = () => {
      const k = reduced ? 1 : 0.16
      ring.x += (mouse.x - ring.x) * k
      ring.y += (mouse.y - ring.y) * k
      somaRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      labelRef.current.style.transform = `translate3d(${ring.x + 26}px, ${ring.y + 18}px, 0)`
      let lead = mouse
      trail.forEach((p, i) => {
        p.x += (lead.x - p.x) * 0.38
        p.y += (lead.y - p.y) * 0.38
        const el = trailRefs.current[i]
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - i / TRAIL})`
        lead = p
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('neuron-hover', onNeuron)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('neuron-hover', onNeuron)
      document.body.classList.remove('cursor-active')
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span key={i} ref={(el) => (trailRefs.current[i] = el)} className="cursor-trail" style={{ opacity: 0.5 * (1 - i / TRAIL) }} />
      ))}
      <div ref={ringRef} className="cursor-ring">
        <svg viewBox="-30 -30 60 60">
          <circle r="11" className="membrane" />
          <g className="dendrites">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M0 -11 L0 -19 M0 -16 L-4 -21 M0 -18 L3 -24" />
                <circle cy="-24" cx="3" r="1.3" />
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div ref={somaRef} className="cursor-soma" />
      <div ref={labelRef} className="cursor-label" />
    </div>
  )
}
