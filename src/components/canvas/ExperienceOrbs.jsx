import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';
import { stats, diplomas } from '../../data';

const ORB_COLORS = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#818cf8'];

// Phase 2 (20% -> 50% scroll): a lateral spatial timeline built from real
// career-journey data — the headline stats and the HETIC diplomas — since
// data.js has no separate "companies" list to invent nodes for.
const nodes = [
  ...stats.map((s) => ({ id: s.key, label: s.value, sub: s.key, kind: 'stat' })),
  ...diplomas.map((d) => ({
    id: d.id,
    label: d.school,
    sub: d.status,
    kind: 'diploma',
  })),
];

function Orb({ node, index, total }) {
  const ref = useRef();
  const color = ORB_COLORS[index % ORB_COLORS.length];
  const x = THREE.MathUtils.lerp(-7, 7, total > 1 ? index / (total - 1) : 0.5);
  const y = Math.sin(index * 1.7) * 1.1;
  const z = 8.5 + Math.cos(index * 1.3) * 1.5;

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4 + index;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group position={[x, y, z]}>
        <mesh ref={ref}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.32} color="white" anchorX="center" anchorY="middle">
          {node.label}
        </Text>
      </group>
    </Float>
  );
}

export default function ExperienceOrbs() {
  const group = useRef();

  useFrame(() => {
    const p = scrollState.progress;
    const rampIn = THREE.MathUtils.smoothstep(p, 0.12, 0.22);
    const rampOut = 1 - THREE.MathUtils.smoothstep(p, 0.52, 0.62);
    group.current.scale.setScalar(Math.max(0.001, rampIn * rampOut));
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <Orb key={node.id} node={node} index={i} total={nodes.length} />
      ))}
    </group>
  );
}
