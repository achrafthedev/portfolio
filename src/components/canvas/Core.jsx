import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';

// The glowing central core the camera zooms into during the hero phase
// (0 -> 20% scroll). Shrinks to a small distant ember afterward rather than
// disappearing, so it still reads as an anchor point of the scene.
export default function Core() {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.06;

    const heroFactor = 1 - THREE.MathUtils.smoothstep(scrollState.progress, 0, 0.3);
    const scale = THREE.MathUtils.lerp(0.35, 1.6, heroFactor);
    group.current.scale.setScalar(scale);
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
