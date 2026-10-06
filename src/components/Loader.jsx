import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STAGES = ['growing dendrites', 'myelinating axons', 'calibrating synapses', 'network online']

export default function Loader({ onDone, reduced }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = reduced ? 300 : 1900
    let raf
    let done
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else done = setTimeout(() => setGone(true), 250)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [reduced])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!gone && (
        <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} role="status" aria-live="polite">
          <div className="loader-top">
            <span>neural.portfolio</span>
            <span>v2 · khushi singh</span>
          </div>
          <div className="loader-number">{String(count).padStart(3, '0')}</div>
          <div className="loader-line">
            <i style={{ transform: `scaleX(${count / 100})` }} />
          </div>
          <p className="loader-stage">{STAGES[Math.min(STAGES.length - 1, Math.floor(count / 26))]}…</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
