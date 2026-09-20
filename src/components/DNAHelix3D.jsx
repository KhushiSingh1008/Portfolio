import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function DNAHelix3D({ activeIndex = 0 }) {
  const groupRef = useRef()
  const { viewport } = useThree()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const { strand1Curve, strand2Curve, rungData, backboneNodes } = useMemo(() => {
    const s1Points = []
    const s2Points = []
    const rungs = []
    const nodes = []

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

      if (i % 8 === 0) {
        nodes.push({ strand: 1, position: new THREE.Vector3(x1, y, z1) })
        nodes.push({ strand: 2, position: new THREE.Vector3(x2, y, z2) })
      }
    }

    return {
      strand1Curve: new THREE.CatmullRomCurve3(s1Points),
      strand2Curve: new THREE.CatmullRomCurve3(s2Points),
      rungData: rungs,
      backboneNodes: nodes
    }
  }, [])

  // Pre-compute rung curves
  const rungCurves = useMemo(() => {
    return rungData.map(r => new THREE.LineCurve3(r.start, r.end))
  }, [rungData])

  useFrame((state) => {
    if (groupRef.current) {
      const rotationSpeed = reducedMotion ? 0.00012 : 0.0015 + activeIndex * 0.00022
      groupRef.current.rotation.y += rotationSpeed
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * (reducedMotion ? 0.03 : 0.12)) * 0.035
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * (reducedMotion ? 0.04 : 0.2)) * 0.15
    }
  })

  return (
    <group
      ref={groupRef}
      position={[-viewport.width * 0.46, 0.1, -1.25]}
      rotation={[0.2, 0, -0.1]}
      scale={Math.max(0.68, Math.min(1.18, viewport.height / 7.3))}
    >
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 100, 0.018, 6, false]} />
        <meshBasicMaterial color={activeIndex === 2 ? '#ffc857' : '#89b5c7'} transparent opacity={0.67} />
      </mesh>

      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 100, 0.018, 6, false]} />
        <meshBasicMaterial color={activeIndex === 4 ? '#c58a9c' : '#89b5c7'} transparent opacity={0.52} />
      </mesh>

      {/* Base pair rungs */}
      {rungCurves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 2, 0.008, 4, false]} />
          <meshBasicMaterial color="#ffc857" transparent opacity={0.52} />
        </mesh>
      ))}

      {backboneNodes.map((node, index) => (
        <mesh key={`${node.strand}-${index}`} position={node.position}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color={node.strand === 1 ? '#89b5c7' : '#ffc857'} transparent opacity={0.74} />
        </mesh>
      ))}
    </group>
  )
}
