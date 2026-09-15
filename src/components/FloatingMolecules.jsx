import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

function Mote({ position, speed, size }) {
  const ref = useRef()
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.4
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.2
    ref.current.position.z = position[2] + Math.sin(t * 0.4) * 0.15
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color="#b89a5a" transparent opacity={0.08} />
    </mesh>
  )
}

export default function FloatingMolecules() {
  const motes = useMemo(() => {
    return Array.from({ length: 18 }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2
      ],
      speed: Math.random() * 0.25 + 0.08,
      size: Math.random() * 0.04 + 0.015
    }))
  }, [])

  return (
    <group>
      {motes.map((m, i) => (
        <Mote key={i} {...m} />
      ))}
    </group>
  )
}
