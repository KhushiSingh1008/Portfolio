import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SECTIONS } from '../data/sections'
import { sound } from '../lib/sound'
import { createEngine } from './typewriter/engine'
import TypewriterModel from './typewriter/TypewriterModel'

// A 3D typewriter that types every navigation command onto its paper.
// Physical keys, clicks on the 3D keys and the chips below all route through onKey.
export default function Typewriter({ command, activeId, onKey, onHome, reduced }) {
  const [engine] = useState(createEngine)
  const [live, setLive] = useState('')
  const [muted, setMuted] = useState(sound.isMuted)

  useEffect(() => sound.subscribe(setMuted), [])

  useEffect(() => {
    document.fonts?.load('50px "Special Elite"').then(() => engine.redraw(), () => {})
  }, [engine])

  useEffect(() => {
    if (!command) return
    let i = 0
    let done = false
    const finish = () => {
      if (done) return
      done = true
      while (i < command.text.length) engine.strike(command.text[i++])
      engine.carriageReturn()
      command.output.forEach((line) => engine.print(line))
      setLive(`${command.text}. ${command.output.join(' ')}`)
    }
    const timer = setInterval(
      () => {
        if (i < command.text.length) engine.strike(command.text[i++])
        if (i >= command.text.length) {
          clearInterval(timer)
          finish()
        }
      },
      reduced ? 1 : 62,
    )
    return () => {
      clearInterval(timer)
      finish()
    }
  }, [command, engine, reduced])

  return (
    <section className="typewriter-dock" aria-label="Typewriter navigation">
      <div className="tw-stage">
        <Canvas camera={{ position: [0, 5.4, 5.6], fov: 31 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} onCreated={({ camera }) => camera.lookAt(0, 1.05, -0.15)}>
          <TypewriterModel engine={engine} onKey={onKey} onHome={onHome} />
        </Canvas>
      </div>

      <div className="tw-bar" role="toolbar" aria-label="Jump to a section">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`tw-chip${activeId === s.id ? ' active' : ''}`}
            style={{ '--c': s.color }}
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
          className="tw-chip ghost sound"
          onClick={() => sound.setMuted(!muted)}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn typewriter sound on' : 'Mute typewriter sound'}
        >
          {muted ? 'sound off' : 'sound on'}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {live}
      </p>
    </section>
  )
}
