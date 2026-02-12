'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ---- Rotating torus knot ---- */
function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 2, 0.02);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 2, 0.02);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} scale={0.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial color="#FF6600" wireframe distort={0.15} speed={3} />
      </mesh>
    </Float>
  );
}

/* ---- Wobble sphere ---- */
function WobbleSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 3;
    ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.4) * 3;
  });

  return (
    <mesh ref={ref} scale={0.6}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshWobbleMaterial color="#FF3300" wireframe factor={0.4} speed={2} />
    </mesh>
  );
}

/* ---- Orbiting cubes ---- */
function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 12;

  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4;
      return {
        position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius] as [number, number, number],
        scale: 0.1 + Math.random() * 0.15,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6600" wireframe opacity={0.5} transparent />
        </mesh>
      ))}
    </group>
  );
}

/* ---- Dense particles ---- */
function DenseParticles() {
  const count = 500;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FF6600" size={0.015} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ---- Grid helper ---- */
function GridFloor() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(40, 40, '#333333', '#1a1a1a');
    g.position.y = -3;
    return g;
  }, []);
  return <primitive object={grid} />;
}

/* ---- Exported creative scene ---- */
export default function CreativeScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FF6600" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#FF3300" />
      <spotLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />
      <TorusKnot />
      <WobbleSphere />
      <OrbitingCubes />
      <DenseParticles />
      <GridFloor />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={4}
        maxDistance={20}
      />
    </Canvas>
  );
}
