import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';
import { useUIStore } from '../../store/uiStore';
import { skillCategories } from '../../data';
import { FONT_SEMIBOLD, FONT_REGULAR } from '../../utils/fonts';

// Shared depth-based gradient (cyan -> indigo) instead of each ring taking
// on its category's own saturated color — five categories at five full
// hues read as a carnival tunnel; one gradient reads as a single
// engineered corridor. Category color survives only as a small title accent.
const GRADIENT_FROM = new THREE.Color('#22d3ee');
const GRADIENT_TO = new THREE.Color('#818cf8');

function Ring({ category, index, total, lang }) {
  const ref = useRef();
  const z = -14 - index * 5;
  const ringRadius = 3.4 - index * 0.15;
  const title = lang === 'fr' ? category.title_fr : category.title_en;
  const ringColor = GRADIENT_FROM.clone()
    .lerp(GRADIENT_TO, total > 1 ? index / (total - 1) : 0)
    .getStyle();

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.15 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <group position={[0, 0, z]}>
      <mesh ref={ref}>
        <torusGeometry args={[ringRadius, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      <Billboard position={[0, ringRadius + 0.35, 0]}>
        <Text font={FONT_SEMIBOLD} fontSize={0.4} color={category.color} anchorX="center" anchorY="middle">
          {title}
        </Text>
      </Billboard>

      {/* Skill list as one calm, centered block instead of scattered words
          orbiting the ring interior — ambient set-dressing, not a reading
          task, so it stays legible without competing for attention. */}
      <Billboard position={[0, 0, 0.3]}>
        <Text
          font={FONT_REGULAR}
          fontSize={0.16}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          maxWidth={ringRadius * 1.3}
          textAlign="center"
          lineHeight={1.7}
        >
          {category.skills.join('   ·   ')}
        </Text>
      </Billboard>
    </group>
  );
}

// Phase 4 (80% -> 100% scroll): a deep corridor of glowing skill rings —
// each carrying its real category title and skill list as 3D text — that
// the camera dives through toward a bright contact "portal" plane.
export default function SkillsTunnel() {
  const group = useRef();
  const portal = useRef();
  const lang = useUIStore((s) => s.lang);

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
        <Ring key={cat.id} category={cat} index={i} total={skillCategories.length} lang={lang} />
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
