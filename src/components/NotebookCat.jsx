import { useState } from 'react'

export default function NotebookCat() {
  const [awake, setAwake] = useState(false)

  return (
    <aside
      className={`notebook-cat${awake ? ' awake' : ''}`}
      aria-label="A quiet notebook companion"
      onMouseEnter={() => setAwake(true)}
      onMouseLeave={() => setAwake(false)}
      onClick={() => setAwake((value) => !value)}
    >
      <svg viewBox="0 0 132 150" role="img" aria-hidden="true">
        <path className="cat-tail" d="M102 110c18 0 22-12 16-20-4-5-10-4-10 1 0 6 9 3 9-4" />
        <path d="M31 102c-7-20 2-44 21-50l7-19 12 14c5-1 10-1 15 0l13-14 6 19c20 9 27 31 20 50-5 14-16 23-31 25l-3 13H47l-3-13c-14-3-24-12-29-25Z" />
        <path d="M46 72c3-3 7-3 10 0M78 72c3-3 7-3 10 0M62 85c3 2 6 2 9 0M66 85v7M53 94c8 5 18 5 26 0" />
        <path d="M31 89 11 82M31 98 9 101M101 89l20-7M101 98l22 3" />
        <path className="cat-book" d="M27 123c12-4 25-3 39 3 14-6 27-7 39-3v16c-12-4-25-3-39 3-14-6-27-7-39-3v-16Z" />
      </svg>
      <span>lab companion</span>
    </aside>
  )
}
