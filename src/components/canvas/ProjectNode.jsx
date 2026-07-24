import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useCardTexture } from '../../hooks/useCardTexture';
import { useUIStore } from '../../store/uiStore';
import { categoryMeta } from '../../data';

const _target = new THREE.Vector2();

// A single floating 3D project card. Tilts toward the cursor on hover,
// glows via a rim-light backing plane, and opens the 2D project modal
// (through uiStore) on click. Swap useCardTexture for a real screenshot by
// setting `project.image` and using drei's useTexture instead — see
// hooks/useCardTexture.js for the exact swap point.
export default function ProjectNode({ project, position, rotationY = 0 }) {
  const group = useRef();
  const card = useRef();
  const [hovered, setHovered] = useState(false);
  const openProjectId = useUIStore((s) => s.openProjectId);
  const openProject = useUIStore((s) => s.openProject);

  const lang = useUIStore((s) => s.lang);
  const meta = categoryMeta[project.category] || { color: '#22d3ee' };
  const texture = useCardTexture(project, meta.color, lang);

  useFrame((_, delta) => {
    const isOpen = openProjectId === project.id;
    const targetScale = hovered || isOpen ? 1.15 : 1;
    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, targetScale, 6, delta)
    );

    const tiltX = hovered ? _target.y * -0.35 : 0;
    const tiltY = hovered ? _target.x * 0.35 : 0;
    card.current.rotation.x = THREE.MathUtils.damp(card.current.rotation.x, tiltX, 6, delta);
    card.current.rotation.y = THREE.MathUtils.damp(
      card.current.rotation.y,
      rotationY + tiltY,
      6,
      delta
    );
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerMove={(e) => {
        _target.set(e.uv ? e.uv.x * 2 - 1 : 0, e.uv ? e.uv.y * 2 - 1 : 0);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        openProject(project.id);
      }}
    >
      {/* rim-light backing plane */}
      <mesh position={[0, 0, -0.06]} rotation={[0, rotationY, 0]}>
        <planeGeometry args={[3.4, 2.2]} />
        <meshBasicMaterial
          color={meta.color}
          transparent
          opacity={hovered ? 0.55 : 0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={card} rotation={[0, rotationY, 0]}>
        <RoundedBox args={[3.2, 2, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            map={texture}
            emissive={meta.color}
            emissiveIntensity={hovered ? 0.4 : 0.1}
            roughness={0.35}
            metalness={0.2}
          />
        </RoundedBox>
      </group>
    </group>
  );
}
