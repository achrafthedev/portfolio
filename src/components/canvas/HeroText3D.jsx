import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { scrollState } from '../../store/scrollState';
import { useUIStore } from '../../store/uiStore';
import { translations } from '../../data';
import { FONT_BOLD, FONT_SEMIBOLD, FONT_REGULAR } from '../../utils/fonts';

// Phase 1 (0 -> ~25% scroll): the hero copy itself, rendered as real 3D text
// billboarded to face the camera, floating around the glowing Core instead
// of being drawn as an HTML section on top of the canvas.
export default function HeroText3D() {
  const group = useRef();
  const lang = useUIStore((s) => s.lang);
  const t = translations[lang];

  useFrame(() => {
    const p = scrollState.progress;
    const visibility = 1 - THREE.MathUtils.smoothstep(p, 0.1, 0.25);
    group.current.scale.setScalar(Math.max(0.001, visibility));
    group.current.position.y = THREE.MathUtils.lerp(0, 1.5, THREE.MathUtils.smoothstep(p, 0, 0.2));
  });

  return (
    <group ref={group}>
      <Billboard position={[0, 3.1, 0]}>
        <Text font={FONT_BOLD} fontSize={0.85} color="#f1f5f9" anchorX="center" anchorY="middle" letterSpacing={-0.01}>
          Achraf Chardoudi
        </Text>
      </Billboard>

      <Billboard position={[0, 2.05, 0]}>
        <Text font={FONT_SEMIBOLD} fontSize={0.34} color="#22d3ee" anchorX="center" anchorY="middle" letterSpacing={0.02}>
          {`${t.hero_role}  ·  ${t.hero_subtitle}`}
        </Text>
      </Billboard>

      <Billboard position={[0, -2.4, 0]}>
        <Text
          font={FONT_REGULAR}
          fontSize={0.24}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          maxWidth={6.2}
          textAlign="center"
          lineHeight={1.5}
        >
          {t.hero_desc}
        </Text>
      </Billboard>
    </group>
  );
}
