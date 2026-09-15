import { Canvas } from '@react-three/fiber'
import DNAHelix3D from './DNAHelix3D'
import FloatingMolecules from './FloatingMolecules'

export default function Scene3D() {
  return (
    <Canvas
      className="scene-canvas"
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 6, 5]} intensity={0.3} color="#f0e6d3" />
      <DNAHelix3D />
      <FloatingMolecules />
      <fog attach="fog" args={['#0c0a09', 4, 14]} />
    </Canvas>
  )
}
