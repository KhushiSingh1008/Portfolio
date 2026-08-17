import { motion } from 'framer-motion'
import Particles from './shared/Particles'

const PORTALS = [
  {
    id: 'about',
    number: '01',
    name: 'About Me',
    desc: 'Background, interests & personality',
    accent: 'var(--accent-blush)',
  },
  {
    id: 'projects',
    number: '02',
    name: 'Projects',
    desc: 'Blockchain, AI & app builds',
    accent: 'var(--accent-lavender)',
  },
  {
    id: 'skills',
    number: '03',
    name: 'Skills',
    desc: 'Languages, tools & tech stack',
    accent: 'var(--accent-sage)',
  },
  {
    id: 'experience',
    number: '04',
    name: 'Experience',
    desc: 'Timeline of work & involvement',
    accent: 'var(--accent-amber)',
  },
  {
    id: 'contact',
    number: '05',
    name: 'Contact',
    desc: 'Get in touch — let\'s build',
    accent: 'var(--accent-coral)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Hub({ setRoom }) {
  return (
    <motion.div
      className="hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      {/* Background effects */}
      <div className="grid-lines" />
      <div className="hub-blob" />
      <Particles count={28} />

      {/* Header */}
      <motion.div
        className="hub-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <h1 className="hub-name">Khushi</h1>
        <p className="hub-tagline">
          IT Engineer · Blockchain &amp; Bio-AI Researcher · Mumbai
        </p>

        {/* Social links */}
        <div className="hub-socials">
          <a
            href="#"
            className="hub-social-link"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* GitHub icon */}
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="#"
            className="hub-social-link"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* LinkedIn icon */}
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Portal cards */}
      <motion.div
        className="hub-portals"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PORTALS.map((portal) => (
          <motion.div
            key={portal.id}
            className="portal-card"
            style={{ '--portal-accent': portal.accent }}
            variants={itemVariants}
            onClick={() => setRoom(portal.id)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="portal-number">{portal.number}</div>
            <div className="portal-name">{portal.name}</div>
            <div className="portal-desc">{portal.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
