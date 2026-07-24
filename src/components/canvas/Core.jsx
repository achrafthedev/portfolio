import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';

// The glowing central core the camera zooms into during the hero phase
// (0 -> 20% scroll). It used to linger at world origin at a fixed 0.35
// scale forever, which put it directly between the camera and the project
// gallery during phase 3 — a bright, bloomed sphere sitting in front of
// several cards, occluding their text. It now keeps shrinking and drifts
// up and back out of the camera's sightline as the hero phase ends, so it
// never gets in the way of later phases.
export default function Core() {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.06;

    const p = scrollState.progress;
    // Peak radius (1.8 * 0.85 ≈ 1.5) is kept just under HeroText3D's nearest
    // billboard at y=2.05 so the core never overlaps the hero copy.
    const heroFactor = 1 - THREE.MathUtils.smoothstep(p, 0, 0.3);
    const lingerFactor = 1 - THREE.MathUtils.smoothstep(p, 0.3, 0.5);
    const scale = THREE.MathUtils.lerp(0.35, 0.85, heroFactor) * THREE.MathUtils.lerp(0.04, 1, lingerFactor);
    group.current.scale.setScalar(scale);

    const drift = THREE.MathUtils.smoothstep(p, 0.2, 0.5);
    group.current.position.y = THREE.MathUtils.lerp(0, 6, drift);
    group.current.position.z = THREE.MathUtils.lerp(0, 6, drift);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group} position={[0, 0, 0]}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.8, 4]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0ea5c7"
            emissiveIntensity={1.1}
            roughness={0.15}
            metalness={0.4}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
        <pointLight color="#22d3ee" intensity={4} distance={12} />
      </group>
    </Float>
  );
}
