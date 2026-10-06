/* eslint-disable react-hooks/immutability -- three.js objects and uniforms are mutated inside useFrame by design (R3F render loop), never during React render. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import { AXONS, HUB, NODES, nodeById } from '../data/sections'

/* ---------- helpers ---------- */

// Deterministic RNG so the network grows the same way on every load.
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const randomUnit = (rnd) => {
  const u = rnd() * 2 - 1
  const th = rnd() * Math.PI * 2
  const s = Math.sqrt(1 - u * u)
  return new THREE.Vector3(s * Math.cos(th), u, s * Math.sin(th))
}

const emitCursor = (detail) => window.dispatchEvent(new CustomEvent('neuron-hover', { detail }))

/* ---------- shaders ---------- */

const somaVertex = /* glsl */ `
  uniform float uTime;
  uniform float uFire;
  uniform float uSeed;
  varying vec3 vN;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    vec3 p = position;
    float d = sin(p.x * 4.0 + uTime * 1.3 + uSeed) * sin(p.y * 5.0 + uTime * 1.1) * sin(p.z * 4.5 + uTime * 0.9 + uSeed);
    d *= 0.09 * (1.0 + uFire * 1.6);
    p += normal * d;
    vDisp = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`

const somaFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uFire;
  uniform float uDim;
  varying vec3 vN;
  varying vec3 vView;
  varying float vDisp;
  void main() {
    float fres = pow(1.0 - max(dot(vN, vView), 0.0), 2.2);
    vec3 col = uColor * 0.16 + uColor * fres * 1.7 + vec3(1.0) * fres * fres * 0.35;
    col += uColor * max(vDisp, 0.0) * 4.0;
    col += mix(uColor, vec3(1.0), 0.4) * uFire * 0.8;
    float a = (0.5 + fres * 0.5);
    gl_FragColor = vec4(col * mix(1.0, 0.35, uDim), a * mix(1.0, 0.5, uDim));
  }
`

const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPR;
  uniform float uTwinkle;
  varying vec3 vC;
  varying float vA;
  void main() {
    vC = aColor;
    vA = aAlpha * mix(1.0, 0.45 + 0.55 * sin(uTime * (0.6 + aSeed) + aSeed * 40.0), uTwinkle);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPR * (260.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const pointFragment = /* glsl */ `
  varying vec3 vC;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vC * (1.0 + a), a * vA);
  }
`

function makePointMaterial(twinkle) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPR: { value: Math.min(window.devicePixelRatio, 2) }, uTwinkle: { value: twinkle } },
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

let glowTexture
function getGlowTexture() {
  if (glowTexture) return glowTexture
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.18, 'rgba(255,255,255,0.55)')
  grad.addColorStop(0.45, 'rgba(255,255,255,0.12)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  glowTexture = new THREE.CanvasTexture(c)
  return glowTexture
}

/* ---------- geometry builders ---------- */

function buildDendrites(node, seed) {
  const rnd = mulberry32(seed)
  const segs = []
  const branch = (start, dir, len, depth) => {
    let p = start.clone()
    let d = dir.clone()
    const steps = 4
    for (let i = 0; i < steps; i++) {
      d.add(randomUnit(rnd).multiplyScalar(0.45)).normalize()
      const next = p.clone().addScaledVector(d, len / steps)
      segs.push(p.clone(), next.clone())
      if (depth < 2 && i > 0 && rnd() < 0.45) branch(next, d.clone().add(randomUnit(rnd)).normalize(), len * 0.55, depth + 1)
      p = next
    }
  }
  const count = node.id === 'home' ? 14 : 9
  for (let i = 0; i < count; i++) {
    const dir = randomUnit(rnd)
    branch(dir.clone().multiplyScalar(node.size * 0.85), dir, node.size * (1.8 + rnd() * 1.8), 0)
  }
  return segs
}

function buildAxons() {
  const rnd = mulberry32(7)
  return AXONS.map(([a, b]) => {
    const A = new THREE.Vector3(...nodeById(a).pos)
    const B = new THREE.Vector3(...nodeById(b).pos)
    const dist = A.distanceTo(B)
    const off = () => randomUnit(rnd).multiplyScalar(dist * 0.16)
    const curve = new THREE.CatmullRomCurve3([
      A,
      A.clone().lerp(B, 0.33).add(off()),
      A.clone().lerp(B, 0.66).add(off()),
      B,
    ])
    const ca = new THREE.Color(nodeById(a).color)
    const cb = new THREE.Color(nodeById(b).color)
    const points = curve.getPoints(64)
    const colors = points.map((_, i) => ca.clone().lerp(cb, i / 64))
    return { a, b, curve, points, colors }
  })
}

/* ---------- components ---------- */

function Soma({ node, active, dimmed, fires, onSelect }) {
  const halo = useRef()
  const [hover, setHover] = useState(false)
  const dendrites = useMemo(() => buildDendrites(node, node.id.length * 131 + node.pos[0] * 17), [node])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uFire: { value: 0 },
          uDim: { value: 0 },
          uSeed: { value: node.pos[1] * 3.1 },
          uColor: { value: new THREE.Color(node.color) },
        },
        vertexShader: somaVertex,
        fragmentShader: somaFragment,
        transparent: true,
      }),
    [node],
  )

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const f = fires.current[node.id] || 0
    fires.current[node.id] = Math.max(0, f - dt * 0.7)
    const u = material.uniforms
    u.uTime.value = t
    u.uFire.value = Math.max(f, active ? 0.3 + 0.12 * Math.sin(t * 3) : 0, hover ? 0.35 : 0)
    u.uDim.value += ((dimmed ? 1 : 0) - u.uDim.value) * Math.min(1, dt * 3)
    if (halo.current) {
      const s = node.size * (4.2 + f * 3 + (hover ? 0.8 : 0) + Math.sin(t * 1.6 + node.pos[0]) * 0.2)
      halo.current.scale.setScalar(s)
      halo.current.material.opacity = (0.55 + f * 0.45) * (1 - u.uDim.value * 0.6)
    }
  })

  const isHub = node.id === HUB.id

  return (
    <group position={node.pos}>
      <mesh
        material={material}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(isHub ? null : node.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          emitCursor({ label: isHub ? 'Return to hub' : `Fire → ${node.label}`, color: node.color })
        }}
        onPointerOut={() => {
          setHover(false)
          emitCursor(null)
        }}
      >
        <icosahedronGeometry args={[node.size, 14]} />
      </mesh>
      <mesh>
        <sphereGeometry args={[node.size * 0.32, 20, 20]} />
        <meshBasicMaterial color={new THREE.Color(node.color).lerp(new THREE.Color('#ffffff'), 0.6)} transparent opacity={0.9} />
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial map={getGlowTexture()} color={node.color} blending={THREE.AdditiveBlending} depthWrite={false} transparent />
      </sprite>
      <Line points={dendrites} segments color={node.color} lineWidth={1} transparent opacity={dimmed ? 0.18 : 0.45} />
      <Html position={[0, node.size + 0.7, 0]} center zIndexRange={[10, 0]}>
        <button
          type="button"
          className={`neuron-label${active ? ' active' : ''}${isHub ? ' hub' : ''}`}
          style={{ '--c': node.color }}
          onClick={() => onSelect(isHub ? null : node.id)}
        >
          <kbd>{isHub ? 'Esc' : node.key.toUpperCase()}</kbd>
          {node.label}
        </button>
      </Html>
    </group>
  )
}

function Axons({ axons, activeId }) {
  const refs = useRef([])
  useFrame((_, dt) => {
    axons.forEach((ax, i) => {
      const line = refs.current[i]
      if (!line) return
      const lit = activeId && (ax.a === activeId || ax.b === activeId)
      const target = activeId ? (lit ? 0.85 : 0.12) : 0.38
      line.material.opacity += (target - line.material.opacity) * Math.min(1, dt * 3)
    })
  })
  return axons.map((ax, i) => (
    <Line
      key={`${ax.a}-${ax.b}`}
      ref={(el) => (refs.current[i] = el)}
      points={ax.points}
      vertexColors={ax.colors}
      lineWidth={1.3}
      transparent
      opacity={0.38}
      depthWrite={false}
    />
  ))
}

const MAX_POINTS = 240
const TAIL = 3

function Pulses({ axons, signal, fires, reduced }) {
  const material = useMemo(() => makePointMaterial(0), [])
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(MAX_POINTS * 3), 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(MAX_POINTS), 1))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(MAX_POINTS), 1))
    g.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(MAX_POINTS), 1))
    return g
  }, [])
  const pulses = useRef([])
  const spawnClock = useRef(0)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  // Route a burst of action potentials from the previous neuron to the new one.
  useEffect(() => {
    if (!signal || signal.from === signal.to) return
    const find = (a, b) => {
      const ax = axons.find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a))
      return ax && { ax, dir: ax.a === a ? 1 : -1 }
    }
    const direct = find(signal.from, signal.to)
    const legs = direct ? [direct] : [find(signal.from, 'home'), find('home', signal.to)].filter(Boolean)
    const legTime = 0.55
    legs.forEach((leg, li) => {
      for (let k = 0; k < 5; k++) {
        pulses.current.push({
          ...leg,
          t: 0,
          speed: 1 / legTime,
          delay: li * legTime + k * 0.07,
          size: k === 0 ? 1.5 : 1.0,
          color: new THREE.Color(nodeById(signal.to).color).lerp(new THREE.Color('#ffffff'), 0.3),
          arrive: li === legs.length - 1 && k === 0 ? signal.to : null,
        })
      }
    })
  }, [signal, axons])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    material.uniforms.uTime.value = state.clock.elapsedTime

    // Ambient spontaneous firing.
    spawnClock.current -= dt
    if (spawnClock.current <= 0) {
      spawnClock.current = reduced ? 1.2 : 0.22 + Math.random() * 0.3
      const ax = axons[Math.floor(Math.random() * axons.length)]
      const dir = Math.random() < 0.5 ? 1 : -1
      pulses.current.push({
        ax,
        dir,
        t: 0,
        speed: 0.25 + Math.random() * 0.35,
        delay: 0,
        size: 0.7,
        color: new THREE.Color(nodeById(dir > 0 ? ax.b : ax.a).color),
        arrive: null,
      })
    }

    const pos = geometry.attributes.position.array
    const col = geometry.attributes.aColor.array
    const size = geometry.attributes.aSize.array
    const alpha = geometry.attributes.aAlpha.array
    let n = 0
    pulses.current = pulses.current.filter((p) => {
      if (p.delay > 0) {
        p.delay -= dt
        return true
      }
      p.t += dt * p.speed
      if (p.t >= 1) {
        if (p.arrive) fires.current[p.arrive] = 1
        return false
      }
      for (let k = 0; k < TAIL && n < MAX_POINTS; k++) {
        const tt = Math.max(0, p.t - k * 0.025)
        p.ax.curve.getPoint(p.dir > 0 ? tt : 1 - tt, tmp)
        pos[n * 3] = tmp.x
        pos[n * 3 + 1] = tmp.y
        pos[n * 3 + 2] = tmp.z
        col[n * 3] = p.color.r
        col[n * 3 + 1] = p.color.g
        col[n * 3 + 2] = p.color.b
        size[n] = p.size * (1 - k * 0.3)
        alpha[n] = Math.sin(Math.PI * Math.min(1, p.t * 1.05)) * (1 - k * 0.3)
        n++
      }
      return true
    })
    geometry.setDrawRange(0, n)
    for (const key of ['position', 'aColor', 'aSize', 'aAlpha']) geometry.attributes[key].needsUpdate = true
  })

  return <points geometry={geometry} material={material} frustumCulled={false} />
}

// Faint field of distant neurons and their connections.
function Field() {
  const { points, lines, material } = useMemo(() => {
    const rnd = mulberry32(42)
    const N = 280
    const verts = []
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const size = new Float32Array(N)
    const alpha = new Float32Array(N)
    const seed = new Float32Array(N)
    const palette = NODES.map((n) => new THREE.Color(n.color))
    for (let i = 0; i < N; i++) {
      const v = randomUnit(rnd).multiplyScalar(10 + rnd() * 20)
      verts.push(v)
      pos.set([v.x, v.y, v.z], i * 3)
      const c = palette[Math.floor(rnd() * palette.length)]
      col.set([c.r, c.g, c.b], i * 3)
      size[i] = 0.25 + rnd() * 0.5
      alpha[i] = 0.35 + rnd() * 0.5
      seed[i] = rnd()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))

    const seg = []
    verts.forEach((v, i) => {
      let links = 0
      for (let j = i + 1; j < N && links < 2; j++) {
        if (v.distanceTo(verts[j]) < 4.2) {
          seg.push(v.x, v.y, v.z, verts[j].x, verts[j].y, verts[j].z)
          links++
        }
      }
    })
    const lg = new THREE.BufferGeometry()
    lg.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3))
    return { points: g, lines: lg, material: makePointMaterial(1) }
  }, [])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <group>
      <points geometry={points} material={material} />
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#5b7bd5" transparent opacity={0.09} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

function CameraRig({ activeId, compact, reduced }) {
  const { camera, pointer } = useThree()
  const look = useRef(new THREE.Vector3())
  const v = useMemo(
    () => ({ pos: new THREE.Vector3(), target: new THREE.Vector3(), fwd: new THREE.Vector3(), right: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0) }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.25)
    const t = reduced ? 0 : state.clock.elapsedTime
    const { pos, target, fwd, right, up } = v
    if (!activeId) {
      const ang = t * 0.035 + 0.25
      const r = compact ? 27 : 18
      pos.set(Math.sin(ang) * r + pointer.x * 1.2, 2.5 + pointer.y * 1.2, Math.cos(ang) * r)
      fwd.copy(pos).negate().normalize()
      right.crossVectors(fwd, up).normalize()
      // Desktop: push the network right so the hero copy has room on the left.
      // Mobile: drop it below the hero copy instead.
      target.set(0, compact ? 4.2 : 0, 0).addScaledVector(right, compact ? 0 : -3.4)
    } else {
      const node = new THREE.Vector3(...nodeById(activeId).pos)
      const out = node.clone().normalize()
      pos.copy(node).addScaledVector(out, compact ? 9.5 : 7.6)
      pos.y += 0.6 + pointer.y * 0.3
      pos.x += pointer.x * 0.3
      fwd.subVectors(node, pos).normalize()
      right.crossVectors(fwd, up).normalize()
      // Desktop: the panel sits on the right, so the neuron sits left of centre.
      // Mobile: the panel is a bottom sheet, so the neuron sits near the top.
      target.copy(node)
      if (compact) target.y -= 3.2
      else {
        target.addScaledVector(right, 2.9)
        target.y -= 1.4
      }
    }
    const k = 1 - Math.exp(-dt * 2.2)
    camera.position.lerp(pos, k)
    look.current.lerp(target, k)
    camera.lookAt(look.current)
  })
  return null
}

export default function NeuralScene({ activeId, signal, onSelect, compact, reduced }) {
  const axons = useMemo(() => buildAxons(), [])
  const fires = useRef({})

  return (
    <Canvas
      className="neural-canvas"
      camera={{ position: [0, 8, 38], fov: 50, near: 0.1, far: 120 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraRig activeId={activeId} compact={compact} reduced={reduced} />
      <Field />
      <Axons axons={axons} activeId={activeId} />
      <Pulses axons={axons} signal={signal} fires={fires} reduced={reduced} />
      {NODES.map((node) => (
        <Soma
          key={node.id}
          node={node}
          active={node.id === (activeId ?? 'home')}
          dimmed={Boolean(activeId) && node.id !== activeId}
          fires={fires}
          onSelect={onSelect}
        />
      ))}
    </Canvas>
  )
}
