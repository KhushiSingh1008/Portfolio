import * as THREE from 'three'
import { sound } from '../../lib/sound'

// Keyboard layout, row by row from the back of the machine to the front.
export const ROWS = ['1234567890-', 'QWERTYUIOP', 'ASDFGHJKL;', 'ZXCVBNM,./']
export const TYPEBARS = 32

// Paper canvas geometry. The strike point is the horizontal centre of the
// machine; the carriage slides so the next character always lands there.
const W = 1024
const H = 720
const FONT_PX = 50
const LINE_H = 64
const MARGIN_X = 0.08 * W
const TYPING_Y = H - 104
const MAX_COLS = 26

const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const now = () => performance.now() / 1000

// Characters that physically exist as keys on the model.
export const keyFor = (ch) => {
  if (ch === ' ') return 'SPACE'
  const up = ch.toUpperCase()
  return ROWS.some((r) => r.includes(up)) ? up : null
}

export function createEngine() {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  // Paper fibre, drawn once.
  const grain = document.createElement('canvas')
  grain.width = W
  grain.height = H
  const g = grain.getContext('2d')
  const base = g.createLinearGradient(0, 0, 0, H)
  base.addColorStop(0, '#efe6d2')
  base.addColorStop(0.7, '#f6efdf')
  base.addColorStop(1, '#e9dfc9')
  g.fillStyle = base
  g.fillRect(0, 0, W, H)
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = `rgba(120, 100, 70, ${hash(i) * 0.06})`
    g.fillRect(hash(i + 1) * W, hash(i + 2) * H, 1 + hash(i + 3) * 2, 1)
  }

  const lines = [] // { text, red }
  let current = ''
  let charWidth = FONT_PX * 0.6
  const pressed = new Map() // key -> time
  const strikes = new Map() // typebar index -> time
  let lastReturn = -10
  let lineFeeds = 0

  const font = `${FONT_PX}px "Special Elite", "Courier New", monospace`

  function drawLine(text, y, red, seed) {
    for (let i = 0; i < text.length; i++) {
      const h = hash(seed * 97 + i)
      const a = 0.72 + 0.28 * h
      ctx.fillStyle = red ? `rgba(170, 32, 28, ${a})` : `rgba(26, 24, 22, ${a})`
      ctx.fillText(text[i], MARGIN_X + i * charWidth, y + (h - 0.5) * 2.2)
    }
  }

  function draw() {
    ctx.drawImage(grain, 0, 0)
    ctx.font = font
    ctx.textBaseline = 'alphabetic'
    charWidth = ctx.measureText('M').width
    const all = [...lines, { text: current, red: false }]
    for (let i = all.length - 1, row = 0; i >= 0; i--, row++) {
      const y = TYPING_Y - row * LINE_H
      if (y < -LINE_H) break
      drawLine(all[i].text, y, all[i].red, i)
    }
    texture.needsUpdate = true
  }

  function wrap(text) {
    const out = []
    let line = ''
    for (const word of text.split(' ')) {
      if ((line + ' ' + word).trim().length > MAX_COLS) {
        out.push(line)
        line = word
      } else line = (line + ' ' + word).trim()
    }
    if (line) out.push(line)
    return out
  }

  const engine = {
    texture,
    paperAspect: W / H,

    // Called once the typewriter font has loaded so the paper re-renders in it.
    redraw: draw,

    strike(ch) {
      if (current.length >= MAX_COLS) engine.carriageReturn(false)
      current += ch
      const key = keyFor(ch)
      if (key) pressed.set(key, now())
      pressed.set('__any__', now())
      if (ch !== ' ') strikes.set(Math.floor(hash(ch.charCodeAt(0)) * TYPEBARS), now())
      sound.clack()
      draw()
    },

    carriageReturn(ring = true) {
      if (!current && !ring) return
      lines.push({ text: current, red: false })
      current = ''
      lastReturn = now()
      lineFeeds += 1
      if (lines.length > 40) lines.splice(0, lines.length - 40)
      if (ring) sound.bell()
      draw()
    },

    // Output is printed in the red half of the ribbon, all at once.
    print(text) {
      for (const line of wrap(text)) lines.push({ text: line, red: true })
      lineFeeds += 1
      draw()
    },

    pressKey(key) {
      pressed.set(key, now())
    },

    pressedAt: (key) => pressed.get(key) ?? -10,
    strikeAt: (bar) => strikes.get(bar) ?? -10,
    returnAt: () => lastReturn,
    lineFeeds: () => lineFeeds,

    // How far along the current line the next character is, as a fraction
    // of paper width (0 at the left margin).
    lineProgress: () => (current.length * charWidth) / W,
    lastStrikeAt: () => pressed.get('__any__') ?? -10,
  }

  draw()
  return engine
}
