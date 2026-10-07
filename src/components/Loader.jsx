import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Blockchain loader: six isometric blocks are "mined" one after another and
// linked into a chain, while a ledger logs each confirmed block and its hash.

const BLOCKS = ['#9ee6cf', '#c4b5fd', '#a5c8f5', '#f5b3cf', '#f6dc8f', '#f9c09f']
const NAME = 'KHUSHI SINGH'
// Each word with the index of its first letter in NAME (letters keep their NAME index).
const WORDS = NAME.split(' ').map((word, w, all) => ({ word, start: all.slice(0, w).join(' ').length + (w ? 1 : 0) }))
const HEX = '0123456789ABCDEF'
const STAGES = ['mining genesis block', 'hashing transactions', 'linking blocks', 'verifying proofs', 'syncing ledger', 'network online']

// Deterministic pseudo-hash so each block keeps its own id between renders.
function hexHash(seed, length = 8) {
  let x = (seed * 2654435761) >>> 0
  let out = ''
  for (let i = 0; i < length; i++) {
    x = (x * 1103515245 + 12345) >>> 0
    out += ((x >>> 16) & 15).toString(16)
  }
  return out
}

const shortHash = (seed) => `0x${hexHash(seed, 4)}…${hexHash(seed + 99, 4)}`

export default function Loader({ onDone, reduced }) {
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = reduced ? 300 : 2600
    let raf
    let done
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - p, 2.2)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else done = setTimeout(() => setGone(true), 450)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [reduced])

  const mined = Math.min(BLOCKS.length, Math.floor((count / 100) * BLOCKS.length + 0.001))
  const mining = mined < BLOCKS.length ? mined : -1
  const ledger = Array.from({ length: mined }, (_, i) => i).slice(-3)
  // Letters lock in step with the count, finishing just as the last block lands.
  const resolved = Math.floor((count / 100) * NAME.length + 0.001)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!gone && (
        <motion.div className="loader" exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.6 }} role="status" aria-live="polite">
          <div className="loader-top">
            <span>neural.portfolio</span>
            <span>khushi singh · chain v2</span>
          </div>

          <div className="chain" aria-hidden="true">
            {BLOCKS.map((color, i) => {
              const state = i < mined ? 'mined' : i === mining ? 'mining' : 'pending'
              return (
                <div className="chain-cell" key={i} style={{ '--c': color }}>
                  {i > 0 && <span className={`chain-link${i < mined ? ' on' : ''}`} />}
                  <div className={`block ${state}`}>
                    <div className="cube">
                      <i className="face top" />
                      <i className="face left" />
                      <i className="face right" />
                      <i className="face back" />
                      <i className="face east" />
                      <i className="face bottom" />
                    </div>
                  </div>
                  <span className="block-id">#{String(i).padStart(4, '0')}</span>
                  <span className="block-hash">{state === 'mining' ? `0x${hexHash(count * 7 + i, 8)}` : state === 'mined' ? shortHash(i + 1) : '········'}</span>
                </div>
              )
            })}
          </div>

          {/* Proof-of-work decode: the name resolves out of scrambling hex as blocks are mined. */}
          <h1 className="decode" aria-label={NAME}>
            {/* Letters are grouped per word so narrow screens wrap at the space, never mid-word. */}
            {WORDS.map(({ word, start }, w) => (
              <span key={w} className="decode-word">
                {[...word].map((ch, j) => {
                  const i = start + j
                  const locked = i < resolved
                  return (
                    <span key={i} className={locked ? 'locked' : 'scramble'} style={{ '--c': BLOCKS[i % BLOCKS.length] }} aria-hidden="true">
                      {locked ? ch : HEX[parseInt(hexHash(count * 13 + i * 7, 1), 16)]}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p className="pow" aria-hidden="true">
            <span>nonce 0x{hexHash(count * 3 + 5, 6)}</span>
            <span>difficulty 0x0000</span>
            <span className="pow-stage">{STAGES[Math.min(STAGES.length - 1, mined)]}…</span>
          </p>

          <ol className="ledger" aria-hidden="true">
            {ledger.map((i) => (
              <li key={i} style={{ '--c': BLOCKS[i] }}>
                <b>✓</b> block #{String(i).padStart(4, '0')} confirmed <span>{shortHash(i + 1)}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
