import { motion } from 'framer-motion'

const roomTransition = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.03 },
  transition: { duration: 0.45, ease: 'easeInOut' },
}

export default function RoomWrapper({ children, accentColor }) {
  return (
    <motion.div
      className="room"
      style={{ '--room-accent': accentColor }}
      initial={roomTransition.initial}
      animate={roomTransition.animate}
      exit={roomTransition.exit}
      transition={roomTransition.transition}
    >
      {children}
    </motion.div>
  )
}
