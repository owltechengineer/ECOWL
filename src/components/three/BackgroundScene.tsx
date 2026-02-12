'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================================
   Scroll-aware store — shared between React and R3F
   ============================================================ */
const scrollStore = { progress: 0, y: 0 };

function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollStore.y = window.scrollY;
      scrollStore.progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/* ============================================================
   Flowing dot-wave surface — replaces the grid
   Creates a fabric/topographic wave effect with individual dots
   ============================================================ */
function DotWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Grid of points on XZ plane
  const cols = 120;
  const rows = 80;
  const spacing = 0.3;
  const count = cols * rows;

  // Base positions (flat grid)
  const basePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = (i * cols + j) * 3;
        pos[idx] = (j - cols / 2) * spacing;     // x
        pos[idx + 1] = 0;                         // y (will be animated)
        pos[idx + 2] = (i - rows / 2) * spacing;  // z
      }
    }
    return pos;
  }, []);

  // Animated positions buffer
  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  // Per-point opacity based on wave height
  const opacities = useMemo(() => {
    const o = new Float32Array(count);
    o.fill(0.85);
    return o;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const t = scrollStore.progress;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const opAttr = geo.getAttribute('opacity') as THREE.BufferAttribute;

    // Mouse influence area
    const mx = pointer.x * 8;
    const mz = pointer.y * 5;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = (i * cols + j) * 3;
        const x = basePositions[idx];
        const z = basePositions[idx + 2];

        // Multiple wave layers for organic feel
        const wave1 = Math.sin(x * 0.4 + time * 0.5 + t * Math.PI * 2) * 0.8;
        const wave2 = Math.cos(z * 0.3 + time * 0.3 + t * Math.PI) * 0.6;
        const wave3 = Math.sin((x + z) * 0.25 + time * 0.7) * 0.4;
        const wave4 = Math.cos(x * 0.6 - z * 0.4 + time * 0.4 + t * 3) * 0.3;

        // Mouse ripple effect
        const dx = x - mx;
        const dz = z - mz;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const mouseWave = Math.sin(dist * 1.5 - time * 3) * Math.max(0, 1 - dist * 0.15) * 0.6;

        const y = wave1 + wave2 + wave3 + wave4 + mouseWave;
        positions[idx + 1] = y;

        // Opacity based on height — higher points are brighter
        const normalizedY = (y + 2.5) / 5; // roughly -2.5 to +2.5 → 0 to 1
        const op = THREE.MathUtils.clamp(normalizedY * 0.9 + 0.35, 0.2, 1.0);
        opacities[i * cols + j] = op;
      }
    }

    posAttr.array = positions;
    posAttr.needsUpdate = true;
    opAttr.array = opacities;
    opAttr.needsUpdate = true;

    // Gentle scroll-driven rotation
    pointsRef.current.rotation.z = t * 0.15;
    pointsRef.current.position.y = -2 + Math.sin(time * 0.2) * 0.3;
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-opacity"
          args={[opacities, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={`
          attribute float opacity;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = max(2.0, 4.5 * (1.0 / -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.05, d) * vOpacity;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 1.3);
          }
        `}
      />
    </points>
  );
}

/* ============================================================
   Main wireframe icosahedron — follows mouse + scroll
   ============================================================ */
function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = scrollStore.progress;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3 + t * Math.PI * 2,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3 + t * Math.PI,
      0.04
    );

    const targetY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + Math.sin(t * Math.PI * 3) * 1.5;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.04
    );

    const targetX = Math.sin(t * Math.PI * 2) * 2.5;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.03
    );

    const s = 1.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#FF6600"
          wireframe
          distort={0.2}
          speed={2}
          roughness={0.5}
        />
      </mesh>
    </Float>
  );
}

/* ============================================================
   Secondary shape — orbits independently
   ============================================================ */
function SecondaryShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = scrollStore.progress;
    const time = state.clock.elapsedTime;

    meshRef.current.rotation.x = time * 0.3 + pointer.y * 0.2;
    meshRef.current.rotation.z = time * 0.2 + pointer.x * 0.2;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      3 + Math.sin(t * Math.PI * 2 + time * 0.15) * 2,
      0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      Math.cos(t * Math.PI * 2 + time * 0.1) * 2,
      0.03
    );
    meshRef.current.position.z = Math.sin(time * 0.2) * 1.5;
  });

  return (
    <mesh ref={meshRef} scale={0.45}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#FF3300"
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

/* ============================================================
   Third shape — smaller, opposite side
   ============================================================ */
function TertiaryShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = scrollStore.progress;
    const time = state.clock.elapsedTime;

    meshRef.current.rotation.y = time * 0.4 + pointer.x * 0.15;
    meshRef.current.rotation.x = time * 0.25;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      -3 + Math.cos(t * Math.PI * 2 + time * 0.12) * 1.5,
      0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      -1 + Math.sin(t * Math.PI * 3 + time * 0.08) * 1.8,
      0.03
    );
  });

  return (
    <mesh ref={meshRef} scale={0.28}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#FF6600"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

/* ============================================================
   Camera rig — smooth scroll-driven camera moves
   ============================================================ */
function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const t = scrollStore.progress;

    const targetZ = THREE.MathUtils.lerp(6, 8, t);
    const targetY = THREE.MathUtils.lerp(0.5, 2, t);
    const targetX = pointer.x * 0.4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);

    camera.lookAt(0, -t * 0.3 - 0.5, 0);
  });

  return null;
}

/* ============================================================
   Exported persistent background scene — always visible
   ============================================================ */
export default function BackgroundScene() {
  useScrollProgress();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <CameraRig />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF6600" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF3300" />
        <HeroObject />
        <SecondaryShape />
        <TertiaryShape />
        <DotWave />
      </Canvas>
    </div>
  );
}
