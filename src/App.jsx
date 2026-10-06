import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NeuralScene from './components/NeuralScene'
import Typewriter from './components/Typewriter'
import TypeLoop from './components/TypeLoop'
import Notebook from './components/Notebook'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import { HUB, SECTIONS } from './data/sections'

const ROLES = ['biotechnology', 'blockchain', 'engineering', 'neural vision', 'verse']
const NOTEBOOK_DELAY = 950

// Short lines: they are printed on the typewriter's paper.
const helpOutput = [
  SECTIONS.slice(0, 4).map((s) => `${s.key.toUpperCase()} ${s.label.toLowerCase()}`).join('  '),
  SECTIONS.slice(4).map((s) => `${s.key.toUpperCase()} ${s.label.toLowerCase()}`).join('  '),
  '<- -> turn pages   Esc close',
]

const useMedia = (query) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

export default function App() {
  const compact = useMedia('(max-width: 900px)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [booted, setBooted] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [notebookId, setNotebookId] = useState(null)
  const [signal, setSignal] = useState(null)
  const [command, setCommand] = useState(null)
  const activeRef = useRef(null)
  const notebookTimer = useRef(null)

  const type = useCallback((text, output) => setCommand({ text, output, n: performance.now() }), [])

  const navigate = useCallback(
    (id) => {
      const from = activeRef.current
      if (id === from) {
        if (id) setNotebookId(id)
        return
      }
      activeRef.current = id
      setActiveId(id)
      setSignal({ from: from ?? 'home', to: id ?? 'home', n: performance.now() })
      clearTimeout(notebookTimer.current)
      if (!id) {
        setNotebookId(null)
        type('back to the hub', ['-> notebook closed.'])
        return
      }
      const i = SECTIONS.findIndex((x) => x.id === id)
      type(`open ${SECTIONS[i].label.toLowerCase()}`, [`-> turning to page ${i + 1}.`])
      // Already reading: flip straight to the new page. Coming from the hub:
      // let the camera reach the neuron before the notebook arrives.
      if (from) setNotebookId(id)
      else notebookTimer.current = setTimeout(() => setNotebookId(id), reduced ? 0 : NOTEBOOK_DELAY)
    },
    [type, reduced],
  )

  // One entry point for physical keys, 3D typewriter keys and the chip bar.
  const handleKey = useCallback(
    (key) => {
      const idx = SECTIONS.findIndex((s) => s.id === activeRef.current)
      if (key === 'escape') return navigate(null)
      if (key === '?' || key === '/') return type('help', helpOutput)
      if (key === 'arrowright') return navigate(SECTIONS[(idx + 1) % SECTIONS.length].id)
      if (key === 'arrowleft') return navigate(SECTIONS[(idx - 1 + SECTIONS.length) % SECTIONS.length].id)
      const section = SECTIONS.find((s) => s.key === key)
      if (section) return navigate(section.id)
      if (/^[a-z0-9]$/.test(key)) type(key, [`no page for "${key}". try ?`])
    },
    [navigate, type],
  )

  const boot = useCallback(() => {
    setBooted(true)
    type('hello, visitor.', ['press A for about, R for resume,', '? for every key.'])
  }, [type])

  useEffect(() => {
    if (!booted) return
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      const key = e.key.toLowerCase()
      if (key === 'arrowleft' || key === 'arrowright') e.preventDefault()
      handleKey(key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booted, handleKey])

  useEffect(() => () => clearTimeout(notebookTimer.current), [])

  const accent = (SECTIONS.find((s) => s.id === activeId) ?? HUB).color
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  return (
    <div className={`app${activeId ? ' focused' : ''}${notebookId ? ' notebook-open' : ''}`}>
      <NeuralScene activeId={activeId} signal={signal} onSelect={navigate} compact={compact} reduced={reduced} />
      <div className="vignette" aria-hidden="true" />

      <header className="topbar">
        <button type="button" className="brand" onClick={() => navigate(null)}>
          <span className="brand-mark">KS</span>
          <span>
            Khushi Singh
            <small>neural.portfolio</small>
          </span>
        </button>
        <nav className="topnav" aria-label="Quick links">
          <button type="button" onClick={() => handleKey('?')}>
            <kbd>?</kbd> keys
          </button>
          <button type="button" onClick={() => navigate('resume')} className="resume-link">
            <kbd>R</kbd> Resume
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {booted && !activeId && (
          <motion.section
            className="hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="eyebrow accent">IT engineer · VESIT Mumbai · CGPA 9.91</p>
            <h1>
              Khushi
              <br />
              Singh
            </h1>
            <p className="hero-line">
              Building at the synapse of <TypeLoop words={ROLES} reduced={reduced} />
            </p>
            <p className="hero-sub">
              Every neuron holds one chapter of my notebook. Click one, or type its key on the typewriter.
            </p>
            <div className="hero-tags">
              <span style={{ '--c': '#5eead4' }}>Bio-AI</span>
              <span style={{ '--c': '#a78bfa' }}>Web3 & ZK</span>
              <span style={{ '--c': '#60a5fa' }}>Systems</span>
              <span style={{ '--c': '#f472b6' }}>Poetry</span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>{notebookId && <Notebook key="notebook" id={notebookId} onSelect={navigate} reduced={reduced} />}</AnimatePresence>

      {booted && <Typewriter command={command} activeId={activeId} onKey={handleKey} onHome={() => navigate(null)} reduced={reduced} />}

      <Loader onDone={boot} reduced={reduced} />
      <CustomCursor />
    </div>
  )
}
