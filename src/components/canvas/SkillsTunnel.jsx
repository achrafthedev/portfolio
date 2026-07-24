import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';
import { skillCategories } from '../../data';

function Ring({ category, index }) {
  const ref = useRef();
  const z = -14 - index * 5;

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.15 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <group position={[0, 0, z]}>
      <mesh ref={ref}>
        <torusGeometry args={[3.4 - index * 0.15, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Text
        position={[0, 3.7 - index * 0.15, 0]}
        fontSize={0.4}
        color={category.color}
        anchorX="center"
        anchorY="middle"
      >
        {category.title_en}
      </Text>
    </group>
  );
}

// Phase 4 (80% -> 100% scroll): a deep tunnel of glowing skill rings that
// the camera dives through toward a bright contact "portal" plane.
export default function SkillsTunnel() {
  const group = useRef();
  const portal = useRef();

  useFrame((state) => {
    const p = scrollState.progress;
    const visibility = THREE.MathUtils.smoothstep(p, 0.7, 0.82);
    group.current.scale.setScalar(Math.max(0.001, visibility));

    const glow = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    if (portal.current) portal.current.material.emissiveIntensity = glow;
  });

  return (
    <group ref={group}>
      {skillCategories.map((cat, i) => (
        <Ring key={cat.id} category={cat} index={i} />
      ))}
      <mesh ref={portal} position={[0, 0, -14 - skillCategories.length * 5 - 6]}>
        <circleGeometry args={[4, 48]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
