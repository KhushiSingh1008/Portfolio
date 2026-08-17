import { motion } from 'framer-motion'
import RoomWrapper from '../shared/RoomWrapper'
import BackButton from '../shared/BackButton'

const TIMELINE_ITEMS = [
  {
    /* {REPLACE: Organization / Club Name} */
    org: 'Organization Name',
    /* {REPLACE: Role} */
    role: 'Core Member',
    /* {REPLACE: Duration} */
    date: '2024 – Present',
    /* {REPLACE: 2–3 bullet points of what you did} */
    points: [
      'Contributed to blockchain-based solutions for real-world problems',
      'Collaborated on research papers and technical documentation',
      'Organized workshops and mentoring sessions for juniors',
    ],
  },
  {
    /* {REPLACE: Hackathon / Buildathon} */
    org: 'Hackathon Name',
    role: 'Participant / Finalist',
    /* {REPLACE: date} */
    date: 'March 2025',
    /* {REPLACE: brief outcome} */
    points: [
      'Built a decentralized health records prototype in 36 hours',
      'Placed among top 10 teams out of 200+ participants',
    ],
  },
  {
    org: 'VESLIT',
    role: 'Graphics Head',
    date: '2024 – Present',
    points: [
      'Led visual design for college tech fest',
      'Created branding, posters, and digital assets',
      'Coordinated a design team of 8 members',
    ],
  },
  {
    /* {REPLACE: add more experience items as needed} */
    org: 'Another Organization',
    role: 'Volunteer / Contributor',
    date: '2023 – 2024',
    points: [
      'Placeholder bullet point — replace with actual experience',
      'Another placeholder — describe your contributions here',
    ],
  },
]

/* Floating document shapes */
function FloatingDocs() {
  const docs = [
    { top: '15%', right: '5%', rx: '12deg', ry: '20deg', delay: '0s' },
    { top: '35%', right: '3%', rx: '-8deg', ry: '-15deg', delay: '1.5s' },
    { top: '60%', right: '8%', rx: '18deg', ry: '5deg', delay: '3s' },
    { top: '80%', right: '2%', rx: '-5deg', ry: '25deg', delay: '4.5s' },
  ]

  return (
    <>
      {docs.map((doc, i) => (
        <div
          key={i}
          className="floating-doc"
          style={{
            top: doc.top,
            right: doc.right,
            '--doc-rx': doc.rx,
            '--doc-ry': doc.ry,
            animationDelay: doc.delay,
            animationDuration: `${6 + i * 1.5}s`,
          }}
        />
      ))}
    </>
  )
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ExperienceRoom({ setRoom }) {
  return (
    <RoomWrapper accentColor="var(--accent-amber)">
      <BackButton setRoom={setRoom} />
      <FloatingDocs />

      <motion.div
        className="room-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="room-title" variants={itemVariants}>
          Experience &amp; Involvement
        </motion.h2>
        <motion.p className="room-subtitle" variants={itemVariants}>
          A timeline of work, hackathons, clubs, and contributions along the way.
        </motion.p>

        <div className="timeline">
          {TIMELINE_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-marker" />
              <h3 className="timeline-org">{item.org}</h3>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-date">{item.date}</div>
              <ul className="timeline-points">
                {item.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </RoomWrapper>
  )
}
