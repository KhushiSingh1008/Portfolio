import { useState, useEffect, useRef, useCallback } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  const animate = useCallback(() => {
    // Smooth follow for the ring
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12

    if (ringRef.current) {
      ringRef.current.style.left = ringPos.current.x + 'px'
      ringRef.current.style.top = ringPos.current.y + 'px'
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

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

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('cursor-active')
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [animate, visible])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${visible ? ' visible' : ''}${hovering ? ' hovering' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${visible ? ' visible' : ''}${hovering ? ' hovering' : ''}`}
      />
    </>
  )
}
