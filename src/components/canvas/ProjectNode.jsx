import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useCardTexture } from '../../hooks/useCardTexture';
import { useUIStore } from '../../store/uiStore';
import { categoryMeta } from '../../data';

const _target = new THREE.Vector2();

// A single floating 3D project card — deliberately decorative/ambient now,
// not a place to read anything. Three rounds of testing (billboarded
// titles, camera-facing fade thresholds, wider arc spacing) never got card
// text to a reliably legible state on a tilted, orbiting surface — cards
// this close together on an arc this wide always have some viewing angle
// where several line up and stack. Real project info (title, role,
// description, tags, links) now lives entirely in ui/ProjectsOverlay.jsx,
// a synced 2D layer — the same fix that already worked for the hero copy.
// This card still tilts toward the cursor and opens the project modal on
// click, so it stays part of the interaction, just not the reading surface.
export default function ProjectNode({ project, position, rotationY = 0 }) {
  const group = useRef();
  const card = useRef();
  const [hovered, setHovered] = useState(false);
  const openProjectId = useUIStore((s) => s.openProjectId);
  const openProject = useUIStore((s) => s.openProject);

  const meta = categoryMeta[project.category] || { color: '#22d3ee' };
  const texture = useCardTexture(project, meta.color);

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
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial
          color={meta.color}
          transparent
          opacity={hovered ? 0.4 : 0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={card} rotation={[0, rotationY, 0]}>
        <RoundedBox args={[2.6, 1.6, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            map={texture}
            emissiveMap={texture}
            emissive="#ffffff"
            emissiveIntensity={hovered ? 0.35 : 0.08}
            roughness={0.4}
            metalness={0.15}
          />
        </RoundedBox>
      </group>
    </group>
  );
}
