"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Mountain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(2, 3, 6);
    // Displace vertices for natural mountain shape
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const noise = Math.sin(y * 2) * 0.2 + Math.cos(y * 3) * 0.1;
      positions.setX(i, positions.getX(i) + noise);
      positions.setZ(i, positions.getZ(i) + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -0.5, 0]}>
      <meshStandardMaterial
        color="#1e3a5f"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function SmallMountain({ position }: { position: [number, number, number] }) {
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.8, 1.5, 5);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const noise = Math.sin(y * 3) * 0.1;
      positions.setX(i, positions.getX(i) + noise);
      positions.setZ(i, positions.getZ(i) + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={position}>
      <meshStandardMaterial color="#2d5a8e" roughness={0.9} />
    </mesh>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} roughness={1} />
      </mesh>
      <mesh position={[0.35, 0.05, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
      </mesh>
      <mesh position={[-0.3, -0.05, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
      </mesh>
    </group>
  );
}

function SnowParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        pos.setY(i, pos.getY(i) - 0.005);
        if (pos.getY(i) < -2) {
          pos.setY(i, 5);
        }
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#e8a838" />

        <Mountain />
        <SmallMountain position={[-1.8, -1, 0.5]} />
        <SmallMountain position={[2, -1, -0.3]} />
        <SmallMountain position={[-0.5, -1.2, 1]} />
        <SmallMountain position={[1.2, -1.1, 1.2]} />

        <Cloud position={[-1.5, 1.5, -1]} />
        <Cloud position={[1.8, 1.2, -0.5]} />
        <Cloud position={[0, 2, -2]} />

        <SnowParticles />
      </Canvas>
    </div>
  );
}
