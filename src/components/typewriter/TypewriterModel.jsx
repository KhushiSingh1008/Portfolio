import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { SECTIONS } from '../../data/sections'
import { ROWS, TYPEBARS } from './engine'

const now = () => performance.now() / 1000
const emitCursor = (detail) => window.dispatchEvent(new CustomEvent('neuron-hover', { detail }))

const PAPER_W = 2.4
const PLATEN_Y = 1.56
const PLATEN_Z = -1.0
const ROW_SPACING = 0.27
const ROW_OFFSET = [0, -0.04, 0.03, 0.1]

const SECTION_BY_KEY = Object.fromEntries(SECTIONS.map((s) => [s.key.toUpperCase(), s]))

/* ---------- textures ---------- */

// Cream key cap with an ink letter; section keys get a pastel ring and their ink colour.
function keyTexture(label, section) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(54, 48, 6, 64, 64, 64)
  grad.addColorStop(0, '#fffaf0')
  grad.addColorStop(0.75, '#f1e7d3')
  grad.addColorStop(1, '#d9ccb2')
  g.fillStyle = grad
  g.beginPath()
  g.arc(64, 64, 64, 0, Math.PI * 2)
  g.fill()
  if (section) {
    g.fillStyle = section.color
    g.beginPath()
    g.arc(64, 64, 58, 0, Math.PI * 2)
    g.arc(64, 64, 46, 0, Math.PI * 2, true)
    g.fill()
  }
  g.fillStyle = section?.ink ?? '#2b2540'
  g.font = `700 ${label.length > 1 ? 34 : 58}px Inter, Arial, sans-serif`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(label, 64, 68)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function spoolTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(110, 100, 10, 128, 128, 128)
  grad.addColorStop(0, '#fbf3e4')
  grad.addColorStop(0.6, '#e2cfa8')
  grad.addColorStop(1, '#b49a6e')
  g.fillStyle = grad
  g.beginPath()
  g.arc(128, 128, 128, 0, Math.PI * 2)
  g.fill()
  g.fillStyle = '#2b2540'
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    g.beginPath()
    g.arc(128 + Math.cos(a) * 74, 128 + Math.sin(a) * 74, 26, 0, Math.PI * 2)
    g.fill()
  }
  g.beginPath()
  g.arc(128, 128, 18, 0, Math.PI * 2)
  g.fill()
  g.fillStyle = '#f1e2c2'
  g.beginPath()
  g.arc(128, 128, 9, 0, Math.PI * 2)
  g.fill()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function scaleTexture() {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 48
  const g = c.getContext('2d')
  g.fillStyle = '#211510'
  g.fillRect(0, 0, 1024, 48)
  g.fillStyle = '#f1e2c2'
  g.font = '16px Inter, Arial, sans-serif'
  g.textAlign = 'center'
  for (let i = 0; i <= 90; i++) {
    const x = 22 + i * 10.9
    const tall = i % 10 === 0
    g.fillRect(x, 0, 1.5, tall ? 18 : i % 5 === 0 ? 12 : 7)
    if (tall) g.fillText(String(i), x, 40)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ---------- parts ---------- */

function useMaterials() {
  return useMemo(
    () => ({
      // Chocolate-brown enamel body, near-black brown carriage, champagne-gold trim;
      // the cream keys and pastel rings carry the contrast against the dark page.
      silver: new THREE.MeshStandardMaterial({ color: '#5a3a2a', metalness: 0.18, roughness: 0.32 }),
      silverDark: new THREE.MeshStandardMaterial({ color: '#45291d', metalness: 0.2, roughness: 0.36 }),
      black: new THREE.MeshStandardMaterial({ color: '#211510', metalness: 0.25, roughness: 0.4 }),
      cavity: new THREE.MeshStandardMaterial({ color: '#120b08', metalness: 0.1, roughness: 0.85 }),
      chrome: new THREE.MeshStandardMaterial({ color: '#ecd9b4', metalness: 0.9, roughness: 0.22 }),
      steel: new THREE.MeshStandardMaterial({ color: '#a08670', metalness: 0.7, roughness: 0.32 }),
      rubber: new THREE.MeshStandardMaterial({ color: '#170f0b', metalness: 0, roughness: 0.85 }),
      keyCap: new THREE.MeshStandardMaterial({ color: '#efe5d1', metalness: 0, roughness: 0.45 }),
      ribbon: new THREE.MeshStandardMaterial({ color: '#6b3550', roughness: 0.7 }),
    }),
    [],
  )
}

const keyGeo = {
  stem: new THREE.CylinderGeometry(0.016, 0.016, 0.26, 8),
  cap: new THREE.CylinderGeometry(0.1, 0.1, 0.045, 28),
  rim: new THREE.TorusGeometry(0.1, 0.013, 8, 28),
  face: new THREE.CircleGeometry(0.088, 28),
}

function Key({ label, position, engine, mats, onPress }) {
  const group = useRef()
  const [hover, setHover] = useState(false)
  const section = SECTION_BY_KEY[label]
  const texture = useMemo(() => keyTexture(label, section), [label, section])
  const rimMat = useMemo(
    () => (section ? new THREE.MeshStandardMaterial({ color: section.color, emissive: section.color, emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.3 }) : null),
    [section],
  )

  useFrame(() => {
    const dt = now() - engine.pressedAt(label)
    const depth = dt < 0 ? 0 : dt < 0.05 ? dt / 0.05 : Math.max(0, 1 - (dt - 0.05) / 0.14)
    group.current.position.y = position[1] - depth * 0.075 - (hover ? 0.012 : 0)
  })

  return (
    <group ref={group} position={position}>
      <mesh geometry={keyGeo.stem} material={mats.steel} position={[0, -0.14, 0]} />
      <mesh
        geometry={keyGeo.cap}
        material={mats.keyCap}
        onClick={(e) => {
          e.stopPropagation()
          onPress(label)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          emitCursor({ label: section ? `Type ${label} → ${section.label}` : `Type ${label}`, color: section?.color ?? '#e6e8eb' })
        }}
        onPointerOut={() => {
          setHover(false)
          emitCursor(null)
        }}
      />
      <mesh geometry={keyGeo.rim} material={rimMat ?? mats.chrome} rotation-x={Math.PI / 2} position={[0, 0.005, 0]} />
      <mesh geometry={keyGeo.face} rotation-x={-Math.PI / 2} position={[0, 0.0235, 0]}>
        <meshStandardMaterial map={texture} roughness={0.35} metalness={0.1} />
      </mesh>
    </group>
  )
}

function Keyboard({ engine, mats, onPress }) {
  const keys = []
  ROWS.forEach((row, r) => {
    // Row 0 (numbers) sits at the back and highest; row 3 at the front.
    const y = 0.92 - r * 0.085
    const z = 0.35 + r * 0.3
    ;[...row].forEach((label, i) => {
      const x = (i - (row.length - 1) / 2) * ROW_SPACING + ROW_OFFSET[r]
      keys.push(<Key key={label} label={label} position={[x, y, z]} engine={engine} mats={mats} onPress={onPress} />)
    })
  })
  return keys
}

function SpaceBar({ engine, mats, onPress }) {
  const ref = useRef()
  useFrame(() => {
    const dt = now() - engine.pressedAt('SPACE')
    const depth = dt < 0.05 ? Math.max(0, dt / 0.05) : Math.max(0, 1 - (dt - 0.05) / 0.14)
    ref.current.position.y = 0.6 - depth * 0.05
  })
  return (
    <group ref={ref} position={[0, 0.6, 1.6]}>
      <RoundedBox args={[1.8, 0.05, 0.11]} radius={0.02} material={mats.chrome} onClick={() => onPress(' ')} />
      <mesh material={mats.steel} position={[-0.75, -0.1, -0.05]}>
        <boxGeometry args={[0.03, 0.2, 0.03]} />
      </mesh>
      <mesh material={mats.steel} position={[0.75, -0.1, -0.05]}>
        <boxGeometry args={[0.03, 0.2, 0.03]} />
      </mesh>
    </group>
  )
}

// Fan of type bars resting in the basket; the struck one swings up to the platen.
function TypeBasket({ engine, mats }) {
  const bars = useRef([])
  const center = useMemo(() => new THREE.Vector3(0, 1.0, -0.78), [])
  const items = useMemo(
    () =>
      Array.from({ length: TYPEBARS }, (_, i) => {
        const phi = THREE.MathUtils.degToRad(-78 + (156 * i) / (TYPEBARS - 1))
        return { phi, pos: [center.x + Math.sin(phi) * 0.86, 0.93, center.z + Math.cos(phi) * 0.86] }
      }),
    [center],
  )
  useFrame(() => {
    items.forEach((_, i) => {
      const el = bars.current[i]
      if (!el) return
      const dt = now() - engine.strikeAt(i)
      const lift = dt < 0 ? 0 : dt < 0.06 ? dt / 0.06 : Math.max(0, 1 - (dt - 0.06) / 0.16)
      el.rotation.x = 0.08 + lift * 1.05
    })
  })
  return (
    <group>
      {items.map((b, i) => (
        <group key={i} position={b.pos} rotation-y={b.phi}>
          <group ref={(el) => (bars.current[i] = el)}>
            <mesh material={mats.steel} position={[0, 0, -0.36]}>
              <boxGeometry args={[0.022, 0.014, 0.72]} />
            </mesh>
            <mesh material={mats.chrome} position={[0, 0.012, -0.72]}>
              <boxGeometry args={[0.03, 0.03, 0.03]} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

function Spool({ x, engine, mats, texture }) {
  const ref = useRef()
  const spin = useRef(0)
  useFrame((_, dt) => {
    const recent = now() - engine.pressedAt('__any__')
    spin.current += dt * (recent < 0.3 ? 2 : 0.05)
    ref.current.rotation.y = spin.current * (x < 0 ? 1 : -1)
  })
  return (
    <group position={[x, 1.08, -0.52]}>
      <mesh material={mats.ribbon} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
      </mesh>
      <group ref={ref}>
        <mesh material={mats.chrome}>
          <cylinderGeometry args={[0.34, 0.34, 0.025, 48, 1, true]} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.013, 0]}>
          <circleGeometry args={[0.34, 48]} />
          <meshStandardMaterial map={texture} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

function Carriage({ engine, mats, onHome }) {
  const carriage = useRef()
  const platen = useRef()
  const lever = useRef()
  const [leverHover, setLeverHover] = useState(false)
  const scale = useMemo(() => scaleTexture(), [])
  const paperH = PAPER_W / engine.paperAspect
  const tilt = 0.24

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    // Keep the paper centred: glide left a little while typing, then ease back.
    const typing = now() - engine.lastStrikeAt() < 0.9
    const target = typing ? -engine.lineProgress() * PAPER_W * 0.3 : 0
    const sinceReturn = now() - engine.returnAt()
    const k = 1 - Math.exp(-dt * (typing ? 24 : 5))
    carriage.current.position.x += (target - carriage.current.position.x) * k
    const roll = engine.lineFeeds() * 0.42
    platen.current.rotation.x += (roll - platen.current.rotation.x) * (1 - Math.exp(-dt * 10))
    const swing = sinceReturn < 0.5 ? Math.sin((sinceReturn / 0.5) * Math.PI) * 0.5 : 0
    lever.current.rotation.y = 0.5 - swing + (leverHover ? 0.08 : 0)
  })

  return (
    <group ref={carriage}>
      <RoundedBox args={[3.7, 0.26, 0.5]} radius={0.06} position={[0, 1.36, -1.34]} material={mats.black} />
      <mesh position={[0, 1.462, -0.99]} rotation-x={-Math.PI / 2 + 0.55}>
        <planeGeometry args={[3.1, 0.12]} />
        <meshStandardMaterial map={scale} roughness={0.5} />
      </mesh>

      <group ref={platen} position={[0, PLATEN_Y, PLATEN_Z]}>
        <mesh material={mats.rubber} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.21, 0.21, 3.3, 40]} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 1.82, 0, 0]} rotation-z={Math.PI / 2}>
            <mesh material={mats.black}>
              <cylinderGeometry args={[0.17, 0.17, 0.26, 18]} />
            </mesh>
            <mesh material={mats.chrome} position={[0, s * 0.14, 0]}>
              <cylinderGeometry args={[0.1, 0.12, 0.03, 24]} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[0, PLATEN_Y + (paperH / 2) * Math.cos(tilt) + 0.02, PLATEN_Z - 0.12 - (paperH / 2) * Math.sin(tilt)]} rotation-x={-tilt}>
        <planeGeometry args={[PAPER_W, paperH]} />
        <meshStandardMaterial map={engine.texture} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      <mesh material={mats.chrome} position={[0, PLATEN_Y + 0.14, PLATEN_Z - 0.06]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, 2.7, 10]} />
      </mesh>
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} material={mats.rubber} position={[x, PLATEN_Y + 0.14, PLATEN_Z - 0.06]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.035, 0.035, 0.1, 14]} />
        </mesh>
      ))}

      {/* Carriage return lever: click it to return to the hub. */}
      <group ref={lever} position={[-1.72, 1.62, -0.98]}>
        <mesh
          material={mats.chrome}
          position={[-0.05, 0.05, 0.36]}
          rotation={[Math.PI / 2 - 0.25, 0, 0.12]}
          onClick={(e) => {
            e.stopPropagation()
            onHome()
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setLeverHover(true)
            emitCursor({ label: 'Return carriage → hub', color: '#e6e8eb' })
          }}
          onPointerOut={() => {
            setLeverHover(false)
            emitCursor(null)
          }}
        >
          <cylinderGeometry args={[0.028, 0.022, 0.75, 10]} />
        </mesh>
        <mesh material={mats.black} position={[-0.09, 0.14, 0.72]}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
      </group>
    </group>
  )
}

function Body({ mats }) {
  return (
    <group>
      <RoundedBox args={[3.55, 0.56, 3.15]} radius={0.12} smoothness={4} position={[0, 0.28, 0.12]} material={mats.silver} />
      <RoundedBox args={[3.55, 0.12, 0.5]} radius={0.05} position={[0, 0.5, 1.55]} rotation-x={0.12} material={mats.silverDark} />
      <mesh material={mats.cavity} position={[0, 0.72, -0.55]}>
        <boxGeometry args={[3.05, 0.34, 1.1]} />
      </mesh>
      <RoundedBox args={[3.35, 0.07, 0.6]} radius={0.03} position={[0, 0.97, 0.12]} rotation-x={-0.32} material={mats.silver} />
      <RoundedBox args={[0.3, 0.75, 1.5]} radius={0.06} position={[-1.65, 0.85, -0.6]} material={mats.silver} />
      <RoundedBox args={[0.3, 0.75, 1.5]} radius={0.06} position={[1.65, 0.85, -0.6]} material={mats.silver} />
      <mesh material={mats.ribbon} position={[0, 1.12, -0.72]}>
        <boxGeometry args={[2.2, 0.006, 0.05]} />
      </mesh>
      <mesh material={mats.chrome} position={[0, 1.2, -0.8]}>
        <boxGeometry args={[0.12, 0.06, 0.02]} />
      </mesh>
    </group>
  )
}

export default function TypewriterModel({ engine, onKey, onHome }) {
  const mats = useMaterials()
  const spool = useMemo(() => spoolTexture(), [])
  const root = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const tx = state.pointer.x * 0.12
    const ty = -state.pointer.y * 0.04
    root.current.rotation.y += (tx - root.current.rotation.y) * 0.05
    root.current.rotation.x += (ty - root.current.rotation.x) * 0.05
    root.current.position.y = Math.sin(t * 0.8) * 0.015
  })

  const press = (label) => {
    engine.pressKey(label === ' ' ? 'SPACE' : label)
    onKey(label === ' ' ? ' ' : label.toLowerCase())
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 6, 4]} intensity={1.6} />
      <directionalLight position={[4, 3, -3]} intensity={0.5} color="#9ec5ff" />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 5, 2]} scale={[8, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.2} position={[-5, 2, 1]} scale={[3, 4, 1]} rotation-y={Math.PI / 2} />
        <Lightformer intensity={0.8} color="#8fb8ff" position={[5, 1, -2]} scale={[3, 3, 1]} rotation-y={-Math.PI / 2} />
      </Environment>

      <group ref={root}>
        <Body mats={mats} />
        <TypeBasket engine={engine} mats={mats} />
        <Spool x={-1.05} engine={engine} mats={mats} texture={spool} />
        <Spool x={1.05} engine={engine} mats={mats} texture={spool} />
        <Keyboard engine={engine} mats={mats} onPress={press} />
        <SpaceBar engine={engine} mats={mats} onPress={press} />
        <Carriage engine={engine} mats={mats} onHome={onHome} />
      </group>
      {/* The machine only bobs a few millimetres, so bake the shadow once instead of
          re-rendering and blurring the whole model into it every frame. */}
      <ContactShadows frames={1} position={[0, -0.01, 0.1]} opacity={0.55} scale={7} blur={2.4} far={2} />
    </>
  )
}
