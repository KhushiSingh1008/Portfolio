import { useEffect, useState } from 'react'

// Hero typewriter: types and deletes a rotating list of words.
export default function TypeLoop({ words, reduced }) {
  const [text, setText] = useState(reduced ? words[0] : '')

  useEffect(() => {
    if (reduced) return
    let word = 0
    let len = 0
    let deleting = false
    let timer
    const tick = () => {
      const full = words[word]
      len += deleting ? -1 : 1
      setText(full.slice(0, len))
      let wait = deleting ? 38 : 78
      if (!deleting && len === full.length) {
        deleting = true
        wait = 1700
      } else if (deleting && len === 0) {
        deleting = false
        word = (word + 1) % words.length
        wait = 320
      }
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words, reduced])

  return (
    <span className="type-loop">
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  )
}
