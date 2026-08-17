import { motion } from 'framer-motion'
import RoomWrapper from '../shared/RoomWrapper'
import BackButton from '../shared/BackButton'

const PROJECTS = [
  {
    name: 'RecBlock',
    desc: 'Decentralized Electronic Health Records on Polygon PoS with IPFS storage and AI agent diagnostics for secure, patient-owned medical data.',
    tags: ['Blockchain'],
    tech: ['Solidity', 'Python', 'IPFS', 'Polygon', 'React'],
    tagClass: 'tag-blockchain',
    github: '#',
    live: '#',
  },
  {
    name: 'NaviSense',
    desc: 'AI-powered navigation application designed for visually impaired users, combining real-time object detection with voice-guided routing.',
    tags: ['App'],
    tech: ['Flutter', 'Gemini API', 'Firebase', 'TensorFlow Lite'],
    tagClass: 'tag-app',
    github: '#',
    live: '#',
  },
  {
    name: 'HealthChain Analysis',
    desc: 'Three-agent AI pipeline for parsing, analyzing, and summarizing medical lab reports with federated learning for privacy.',
    tags: ['AI'],
    tech: ['Python', 'LLaMA', 'FastAPI', 'LangChain'],
    tagClass: 'tag-ai',
    github: '#',
    live: null,
  },
  {
    /* {REPLACE: Project 4 — add your own project} */
    name: 'Project Four',
    desc: 'A brief description of your fourth project goes here. Replace this placeholder with real content.',
    tags: ['Other'],
    tech: ['Tech1', 'Tech2', 'Tech3'],
    tagClass: 'tag-other',
    github: '#',
    live: '#',
  },
  {
    /* {REPLACE: Project 5 — add your own project} */
    name: 'Project Five',
    desc: 'A brief description of your fifth project goes here. Replace this placeholder with real content.',
    tags: ['Other'],
    tech: ['Tech1', 'Tech2'],
    tagClass: 'tag-other',
    github: '#',
    live: null,
  },
]

/* SVG Hex grid background pattern */
function HexGridBg() {
  return (
    <div className="hex-grid-bg">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hex-pattern"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <path
              d="M28 2 L50 15 L50 41 L28 54 L6 41 L6 15 Z"
              fill="none"
              stroke="var(--accent-lavender)"
              strokeWidth="0.5"
            />
            <path
              d="M28 54 L50 67 L50 93 L28 106 L6 93 L6 67 Z"
              fill="none"
              stroke="var(--accent-lavender)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
    </div>
  )
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ProjectsRoom({ setRoom }) {
  return (
    <RoomWrapper accentColor="var(--accent-lavender)">
      <BackButton setRoom={setRoom} />
      <HexGridBg />

      <motion.div
        className="room-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="room-title" variants={cardVariants}>
          Projects
        </motion.h2>
        <motion.p className="room-subtitle" variants={cardVariants}>
          A selection of builds across blockchain, AI, and application development.
        </motion.p>

        <motion.div
          className="projects-grid"
          variants={staggerContainer}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="project-card"
              variants={cardVariants}
            >
              <div>
                {project.tags.map((tag) => (
                  <span key={tag} className={`project-tag ${project.tagClass}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>

              <div className="project-links">
                {project.github && (
                  <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                    GitHub
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} className="project-link" target="_blank" rel="noopener noreferrer">
                    Live
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </RoomWrapper>
  )
}
