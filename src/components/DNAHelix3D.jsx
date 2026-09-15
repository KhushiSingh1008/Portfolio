import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DNAHelix3D() {
  const groupRef = useRef()

  const { strand1Curve, strand2Curve, rungData } = useMemo(() => {
    const s1Points = []
    const s2Points = []
    const rungs = []

    const turns = 2.5
    const pointsPerTurn = 48
    const total = Math.floor(turns * pointsPerTurn)
    const height = 7
    const radius = 0.5

    for (let i = 0; i <= total; i++) {
      const t = i / total
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height

      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius

      s1Points.push(new THREE.Vector3(x1, y, z1))
      s2Points.push(new THREE.Vector3(x2, y, z2))

      // Rungs every 10 points
      if (i % 10 === 0 && i > 0 && i < total) {
        rungs.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2)
        })
      }
    }

    return {
      strand1Curve: new THREE.CatmullRomCurve3(s1Points),
      strand2Curve: new THREE.CatmullRomCurve3(s2Points),
      rungData: rungs
    }
  }, [])

  // Pre-compute rung curves
  const rungCurves = useMemo(() => {
    return rungData.map(r => new THREE.LineCurve3(r.start, r.end))
  }, [rungData])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[3, 0.5, -3]} rotation={[0.2, 0, 0.1]}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 100, 0.018, 6, false]} />
        <meshBasicMaterial color="#b89a5a" transparent opacity={0.2} />
      </mesh>

      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 100, 0.018, 6, false]} />
        <meshBasicMaterial color="#b89a5a" transparent opacity={0.14} />
      </mesh>

      {/* Base pair rungs */}
      {rungCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 2, 0.008, 4, false]} />
          <meshBasicMaterial color="#b89a5a" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}
