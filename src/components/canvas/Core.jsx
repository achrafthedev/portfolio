import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';

// The glowing central core behind the hero copy (0 -> ~15% scroll). Hero
// text is a 2D overlay now (see ui/HeroOverlay.jsx), so the core no longer
// risks occluding it — but it still needs to be fully out of the way
// before ExperienceOrbs (career timeline) ramps in around 12-22% scroll,
// so it shrinks and drifts up/back out of the camera's sightline early.
export default function Core() {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.06;

    const p = scrollState.progress;
    const heroFactor = 1 - THREE.MathUtils.smoothstep(p, 0, 0.1);
    const lingerFactor = 1 - THREE.MathUtils.smoothstep(p, 0.08, 0.18);
    const scale = THREE.MathUtils.lerp(0.35, 0.85, heroFactor) * THREE.MathUtils.lerp(0.02, 1, lingerFactor);
    group.current.scale.setScalar(scale);

    const drift = THREE.MathUtils.smoothstep(p, 0.06, 0.18);
    group.current.position.y = THREE.MathUtils.lerp(0, 7, drift);
    group.current.position.z = THREE.MathUtils.lerp(0, 7, drift);
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
