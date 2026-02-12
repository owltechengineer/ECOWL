'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ---- Main wireframe icosahedron that follows mouse ---- */
function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth follow mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3,
      0.05
    );

    // Gentle floating
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
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

/* ---- Engineering-style grid floor ---- */
function GridFloor() {
  const gridHelper = useMemo(() => {
    const grid = new THREE.GridHelper(30, 30, '#333333', '#1a1a1a');
    grid.position.y = -2;
    return grid;
  }, []);

  return <primitive object={gridHelper} />;
}

/* ---- Floating particles ---- */
function Particles() {
  const count = 200;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#FF6600"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ---- Exported scene ---- */
export default function HeroScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF6600" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF3300" />
        <HeroObject />
        <GridFloor />
        <Particles />
      </Canvas>
    </div>
  );
}
