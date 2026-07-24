import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';

// The glowing central core behind the hero copy (0 -> ~15% scroll). Hero
// text is a 2D overlay now (see ui/HeroOverlay.jsx), so the core no longer
// risks occluding it — but it still needs to be fully out of the way
// before ExperienceOrbs (career timeline) ramps in around 12-22% scroll,
// so it shrinks and drifts up/back out of the camera's sightline early.
//
// Built as a nested glass/wireframe structure — a solid faceted inner
// gem counter-rotating against an outer wireframe shell — instead of a
// single wobbling MeshDistortMaterial blob, to read as one deliberate
// engineered object rather than a lava-lamp centerpiece.
export default function Core() {
  const group = useRef();
  const inner = useRef();
  const shell = useRef();

  useFrame((state, delta) => {
    inner.current.rotation.y += delta * 0.22;
    inner.current.rotation.x += delta * 0.09;
    shell.current.rotation.y -= delta * 0.08;
    shell.current.rotation.z += delta * 0.05;

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
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={group} position={[0, 0, 0]}>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshPhysicalMaterial
            color="#0e2f38"
            emissive="#22d3ee"
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.2}
            transmission={0.55}
            thickness={1.2}
            clearcoat={1}
          />
        </mesh>
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
        </mesh>
        <pointLight color="#22d3ee" intensity={4} distance={12} />
      </group>
    </Float>
  );
}
