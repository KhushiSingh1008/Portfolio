import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const colors = ['#89b5c7', '#ffc857', '#c58a9c']
const motes = Array.from({ length: 18 }, (_, index) => ({
  position: [Math.sin(index * 2.17) * 6.6, Math.cos(index * 1.41) * 4.4, -2 - (index % 5)],
  speed: 0.08 + (index % 6) * 0.04,
  size: 0.018 + (index % 5) * 0.011,
  color: colors[index % colors.length],
  offset: index * 0.91
}))

function Mote({ position, speed, size, color, offset, activeIndex }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * (0.4 + activeIndex * 0.025)
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * (0.2 + activeIndex * 0.015)
    ref.current.position.z = position[2] + Math.sin(t * 0.4) * 0.15
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} />
    </mesh>
  )
}

export default function FloatingMolecules({ activeIndex = 0 }) {
  return (
    <group>
      {motes.map((m, i) => (
        <Mote key={i} {...m} activeIndex={activeIndex} />
      ))}
    </group>
  )
}
