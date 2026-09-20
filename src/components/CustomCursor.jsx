import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches) return

    document.body.classList.add('cursor-active')

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }

      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, .interactive')) {
        setHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, .interactive')) {
        setHovering(false)
      }
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)
    const handleMouseDown = () => setPressed(true)
    const handleMouseUp = () => setPressed(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.classList.remove('cursor-active')
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [visible])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${visible ? ' visible' : ''}${hovering ? ' hovering' : ''}${pressed ? ' pressed' : ''}`}
      >
        <svg viewBox="0 0 52 78" aria-hidden="true">
          <defs>
            <linearGradient id="feather-gold" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#fff1bf" /><stop offset=".28" stopColor="#ffc857" /><stop offset=".7" stopColor="#b97432" /><stop offset="1" stopColor="#5b3625" />
            </linearGradient>
          </defs>
          <path className="feather-body" d="M40 4C24 6 9 22 8 44c-1 11 2 18 9 21l13-12 13-34c3-7 2-12-3-15Z" />
          <path className="feather-spine" d="M12 70C20 51 29 32 40 7" />
          <g className="feather-barbs">
            <path d="m35 13-13 4M37 17 17 24M36 22 13 33M33 29 10 42M30 36 9 51M26 44 11 59M23 50 14 64" />
            <path d="m38 13 3 7M34 22l8 5M30 30l8 5M26 38l6 7M22 47l4 7" />
          </g>
          <path className="feather-tip" d="m12 69-5 8" />
        </svg>
      </div>
      <div
        ref={ringRef}
        className={`cursor-ring${visible ? ' visible' : ''}${hovering ? ' hovering' : ''}${pressed ? ' pressed' : ''}`}
      />
    </>
  )
}
