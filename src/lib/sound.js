// Tiny synthesized sound kit: typewriter clack, carriage bell, page rustle.
// Nothing plays until the visitor has interacted with the page (browser
// autoplay rules), and the mute choice is remembered per browser.

const STORAGE_KEY = 'portfolio-sound'
let ctx
let muted = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'off'
  } catch {
    return false
  }
})()

const listeners = new Set()

function audio() {
  if (muted) return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx.state === 'running' ? ctx : null
}

function noise(ac, seconds) {
  const buffer = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ac.createBufferSource()
  src.buffer = buffer
  return src
}

function burst({ seconds, freq, q, gain, type = 'bandpass' }) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime
  const src = noise(ac, seconds)
  const filter = ac.createBiquadFilter()
  filter.type = type
  filter.frequency.value = freq
  filter.Q.value = q
  const g = ac.createGain()
  g.gain.setValueAtTime(gain, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds)
  src.connect(filter).connect(g).connect(ac.destination)
  src.start(t)
}

export const sound = {
  clack() {
    burst({ seconds: 0.045, freq: 1800 + Math.random() * 900, q: 1.4, gain: 0.32 })
    burst({ seconds: 0.03, freq: 260, q: 0.8, gain: 0.25, type: 'lowpass' })
  },
  bell() {
    const ac = audio()
    if (!ac) return
    const t = ac.currentTime
    for (const [f, v] of [[2093, 0.12], [3136, 0.05]]) {
      const o = ac.createOscillator()
      const g = ac.createGain()
      o.frequency.value = f
      g.gain.setValueAtTime(v, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
      o.connect(g).connect(ac.destination)
      o.start(t)
      o.stop(t + 0.9)
    }
    burst({ seconds: 0.18, freq: 500, q: 0.7, gain: 0.18 })
  },
  rustle() {
    burst({ seconds: 0.22, freq: 3200, q: 0.5, gain: 0.07, type: 'highpass' })
  },
  isMuted: () => muted,
  setMuted(value) {
    muted = value
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'off' : 'on')
    } catch {
      /* storage unavailable: keep the in-memory choice */
    }
    listeners.forEach((fn) => fn(muted))
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
