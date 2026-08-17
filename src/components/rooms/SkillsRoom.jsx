import { motion } from 'framer-motion'
import RoomWrapper from '../shared/RoomWrapper'
import BackButton from '../shared/BackButton'

const SKILL_CLUSTERS = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'Dart', 'Solidity', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['React', 'Flutter', 'FastAPI', 'Hardhat', 'Node.js', 'Express'],
  },
  {
    title: 'Blockchain',
    skills: ['Polygon', 'IPFS', 'ERC-4337', 'Ethereum', 'Ethers.js', 'Web3.py'],
  },
  {
    title: 'AI / ML',
    skills: ['LLaMA', 'Ollama', 'Gemini', 'Federated Learning', 'LangChain', 'Scikit-learn'],
  },
  {
    title: 'Dev Tools',
    skills: ['Git', 'Firebase', 'AWS', 'Docker', 'MongoDB', 'VS Code'],
  },
]

/* CSS 3D Wireframe Cube */
function WireframeCube() {
  return (
    <div className="wireframe-cube-wrapper">
      <div className="wireframe-cube">
        <div className="cube-face front" />
        <div className="cube-face back" />
        <div className="cube-face right" />
        <div className="cube-face left" />
        <div className="cube-face top" />
        <div className="cube-face bottom" />
      </div>
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

const clusterVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const pillStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const pillVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

export default function SkillsRoom({ setRoom }) {
  return (
    <RoomWrapper accentColor="var(--accent-sage)">
      <BackButton setRoom={setRoom} />
      <WireframeCube />

      <motion.div
        className="room-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="room-title" variants={clusterVariants}>
          Skills &amp; Tech Stack
        </motion.h2>
        <motion.p className="room-subtitle" variants={clusterVariants}>
          Organized by domain — the tools and technologies I work with daily.
        </motion.p>

        <div className="skills-clusters">
          {SKILL_CLUSTERS.map((cluster) => (
            <motion.div
              key={cluster.title}
              className="skill-cluster"
              variants={clusterVariants}
            >
              <div className="cluster-title">{cluster.title}</div>
              <motion.div
                className="skill-pills"
                variants={pillStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {cluster.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-pill"
                    variants={pillVariant}
                  >
                    <span className="skill-dot" />
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </RoomWrapper>
  )
}
