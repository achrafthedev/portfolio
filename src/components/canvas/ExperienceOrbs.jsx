import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Line, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';
import { useUIStore } from '../../store/uiStore';
import { stats, diplomas, translations } from '../../data';
import { FONT_BOLD, FONT_SEMIBOLD } from '../../utils/fonts';

// Stats and diplomas each get one signature color now instead of cycling
// through a 6-color rainbow per node — the kind of the data (a delivered
// number vs. an earned credential) is what's meaningful, not its index.
const KIND_COLOR = {
  stat: '#22d3ee',
  diploma: '#818cf8',
};

// Phase 2 (20% -> 50% scroll): a lateral spatial timeline built from real
// career-journey data — the headline stats and the HETIC diplomas — since
// data.js has no separate "companies" list to invent nodes for.
function buildNodes(t, lang) {
  return [
    ...stats.map((s) => ({
      id: s.key,
      kind: 'stat',
      value: s.value,
      caption: t[s.key],
    })),
    ...diplomas.map((d) => ({
      id: d.id,
      kind: 'diploma',
      value: lang === 'fr' ? d.title_fr : d.title_en,
      caption: `${d.school} — ${d.status === 'obtained' ? t.status_obtained : t.status_preparing}`,
    })),
  ];
}

function nodePosition(index, total, out = new THREE.Vector3()) {
  const x = THREE.MathUtils.lerp(-7, 7, total > 1 ? index / (total - 1) : 0.5);
  const y = Math.sin(index * 1.7) * 1.1;
  const z = 8.5 + Math.cos(index * 1.3) * 1.5;
  return out.set(x, y, z);
}

function Node({ node, position }) {
  const ref = useRef();
  const color = KIND_COLOR[node.kind] || KIND_COLOR.stat;
  const isDiploma = node.kind === 'diploma';

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group position={position}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
        <mesh scale={1.7}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
        </mesh>
        <Billboard position={[0, -1, 0]}>
          <Text
            font={FONT_BOLD}
            fontSize={isDiploma ? 0.22 : 0.34}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={isDiploma ? 3 : undefined}
            textAlign="center"
            lineHeight={1.3}
          >
            {node.value}
          </Text>
          <Text
            font={FONT_SEMIBOLD}
            position={[0, isDiploma ? -0.65 : -0.45, 0]}
            fontSize={0.15}
            color={color}
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            textAlign="center"
          >
            {node.caption}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

export default function ExperienceOrbs() {
  const group = useRef();
  const lang = useUIStore((s) => s.lang);
  const t = translations[lang];
  const nodes = buildNodes(t, lang);

  const positions = useMemo(
    () => nodes.map((_, i) => nodePosition(i, nodes.length).toArray()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  // The connecting thread's own curve, sampled smooth between node anchors
  // so the timeline reads as one continuous spine rather than disconnected
  // floating shapes — each node then floats gently just off that spine.
  const threadPoints = useMemo(() => {
    if (positions.length < 2) return [];
    const curve = new THREE.CatmullRomCurve3(positions.map((p) => new THREE.Vector3(...p)));
    return curve.getPoints(Math.max(positions.length * 12, 24));
  }, [positions]);

  useFrame(() => {
    const p = scrollState.progress;
    const rampIn = THREE.MathUtils.smoothstep(p, 0.12, 0.22);
    const rampOut = 1 - THREE.MathUtils.smoothstep(p, 0.52, 0.62);
    group.current.scale.setScalar(Math.max(0.001, rampIn * rampOut));
  });

  return (
    <group ref={group}>
      {threadPoints.length > 0 && (
        <Line points={threadPoints} color="#22d3ee" lineWidth={1} transparent opacity={0.3} />
      )}
      {nodes.map((node, i) => (
        <Node key={node.id} node={node} position={positions[i]} />
      ))}
    </group>
  );
}
