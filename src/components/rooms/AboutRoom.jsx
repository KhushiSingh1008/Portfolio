import { motion } from 'framer-motion'
import RoomWrapper from '../shared/RoomWrapper'
import BackButton from '../shared/BackButton'

/* SVG DNA Helix — blush strands with teal rungs */
function DNAHelix() {
  return (
    <div className="dna-helix">
      <svg
        viewBox="0 0 80 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="160"
      >
        {/* Left strand */}
        <path
          d="M20 0 C20 20 60 20 60 40 C60 60 20 60 20 80 C20 100 60 100 60 120 C60 140 20 140 20 160"
          stroke="var(--accent-blush)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {/* Right strand */}
        <path
          d="M60 0 C60 20 20 20 20 40 C20 60 60 60 60 80 C60 100 20 100 20 120 C20 140 60 140 60 160"
          stroke="var(--accent-blush)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {/* Connecting rungs */}
        {[10, 30, 50, 70, 90, 110, 130, 150].map((y, i) => (
          <line
            key={i}
            x1="25"
            y1={y}
            x2="55"
            y2={y}
            stroke="var(--accent-teal)"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </svg>
    </div>
  )
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutRoom({ setRoom }) {
  return (
    <RoomWrapper accentColor="var(--accent-blush)">
      <BackButton setRoom={setRoom} />
      <DNAHelix />

      <motion.div
        className="room-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="room-title" variants={fadeUp}>
          About Me
        </motion.h2>
        <motion.p className="room-subtitle" variants={fadeUp}>
          The person behind the code — interests, background, and what drives the work.
        </motion.p>

        <div className="about-layout">
          {/* Left column: Photo + Fun Facts */}
          <motion.div variants={fadeUp}>
            <div className="about-photo">
              {/* {REPLACE: Add your photo here — replace this placeholder} */}
              <span>[Photo]</span>
            </div>

            <div className="about-facts">
              <div className="fact-card">
                <span className="fact-emoji">📖</span>
                {/* {REPLACE: your current read / book interest} */}
                <span>Currently reading about distributed systems</span>
              </div>
              <div className="fact-card">
                <span className="fact-emoji">🌆</span>
                <span>Based in Mumbai</span>
              </div>
              <div className="fact-card">
                <span className="fact-emoji">🎓</span>
                <span>3rd Year IT @ VESIT</span>
              </div>
            </div>
          </motion.div>

          {/* Right column: Bio + Currently working on */}
          <motion.div variants={fadeUp}>
            <p className="about-bio">
              {/* {REPLACE: your bio here — 3–4 sentences about background, current focus, what drives you} */}
              I'm a third-year Information Technology student at VESIT, Mumbai, with a deep
              fascination for the intersection of blockchain technology and biological intelligence.
              My work spans decentralized healthcare systems, AI-powered diagnostic tools, and
              privacy-preserving computation. I believe in building technology that is both
              technically rigorous and genuinely human-centered — systems that protect, empower,
              and illuminate.
            </p>

            <div className="current-badge">
              <span className="current-badge-dot" />
              {/* {REPLACE: current project} */}
              Currently building: RecBlock — Decentralized EHR
            </div>
          </motion.div>
        </div>
      </motion.div>
    </RoomWrapper>
  )
}
