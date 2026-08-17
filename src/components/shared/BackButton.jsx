import { motion } from 'framer-motion'

export default function BackButton({ setRoom }) {
  return (
    <motion.button
      className="back-button"
      onClick={() => setRoom('hub')}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span>Back to Hub</span>
    </motion.button>
  )
}
