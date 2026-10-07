import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SECTIONS } from '../data/sections'
import { sound } from '../lib/sound'
import { createEngine } from './typewriter/engine'
import TypewriterModel from './typewriter/TypewriterModel'

// A 3D typewriter that types every navigation command onto its paper.
// Physical keys, clicks on the 3D keys and the chips below all route through onKey.
export default function Typewriter({ command, activeId, onKey, onHome, reduced, paused }) {
  const [engine] = useState(createEngine)
  const [live, setLive] = useState('')
  const [muted, setMuted] = useState(sound.isMuted)

  useEffect(() => sound.subscribe(setMuted), [])

  useEffect(() => {
    document.fonts?.load('50px "Special Elite"').then(() => engine.redraw(), () => {})
  }, [engine])

  // The current typing job lives in a ref so an effect re-run (React StrictMode
  // in development) resumes it instead of printing the command twice.
  const job = useRef(null)

  useEffect(() => {
    if (!command) return
    const finish = (j) => {
      if (j.done) return
      j.done = true
      while (j.i < j.cmd.text.length) engine.strike(j.cmd.text[j.i++])
      engine.carriageReturn()
      j.cmd.output.forEach((line) => engine.print(line))
      setLive(`${j.cmd.text}. ${j.cmd.output.join(' ')}`)
    }
    let j = job.current
    if (!j || j.cmd !== command) {
      if (j) finish(j) // a newer command arrived: flush the unfinished one
      j = job.current = { cmd: command, i: 0, done: false }
    }
    if (j.done) return
    const timer = setInterval(
      () => {
        if (j.i < command.text.length) engine.strike(command.text[j.i++])
        if (j.i >= command.text.length) {
          clearInterval(timer)
          finish(j)
        }
      },
      reduced ? 1 : 62,
    )
    return () => clearInterval(timer)
  }, [command, engine, reduced])

  return (
    <section className="typewriter-dock" aria-label="Typewriter navigation">
      <div className="tw-stage">
        {/* paused: the dock is hidden (phone layout with the notebook open), so stop rendering it. */}
        <Canvas
          camera={{ position: [0, 5.4, 5.6], fov: 31 }}
          dpr={[1, 1.5]}
          frameloop={paused ? 'never' : 'always'}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ camera }) => camera.lookAt(0, 1.05, -0.15)}
        >
          <TypewriterModel engine={engine} onKey={onKey} onHome={onHome} />
        </Canvas>
      </div>

      <div className="tw-bar" role="toolbar" aria-label="Jump to a section">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`tw-chip${activeId === s.id ? ' active' : ''}`}
            style={{ '--c': s.color, '--k': s.ink }}
            onClick={() => onKey(s.key)}
            aria-label={`${s.label} (press ${s.key.toUpperCase()})`}
            title={s.label}
          >
            {s.key.toUpperCase()}
          </button>
        ))}
        <button type="button" className="tw-chip ghost" onClick={onHome} aria-label="Back to the hub (Esc)">
          Esc
        </button>
        <button type="button" className="tw-chip ghost" onClick={() => onKey('?')} aria-label="List every key (?)">
          ?
        </button>
        <button
          type="button"
          className={`tw-chip sound${muted ? ' muted' : ''}`}
          onClick={() => sound.setMuted(!muted)}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn typewriter sound on' : 'Mute typewriter sound'}
          title={muted ? 'Sound off' : 'Sound on'}
        >
          ♪
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {live}
      </p>
    </section>
  )
}
