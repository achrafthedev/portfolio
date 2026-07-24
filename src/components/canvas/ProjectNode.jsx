import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useCardTexture } from '../../hooks/useCardTexture';
import { useUIStore } from '../../store/uiStore';
import { categoryMeta } from '../../data';
import { FONT_BOLD } from '../../utils/fonts';

const _target = new THREE.Vector2();

// A single floating 3D project card. Tilts toward the cursor on hover,
// glows via a rim-light backing plane, and opens the 2D project modal
// (through uiStore) on click. Swap useCardTexture for a real screenshot by
// setting `project.image` and using drei's useTexture instead — see
// hooks/useCardTexture.js for the exact swap point.
const _cardNormal = new THREE.Vector3();
const _toCamera = new THREE.Vector3();
const _worldPos = new THREE.Vector3();

export default function ProjectNode({ project, position, rotationY = 0 }) {
  const group = useRef();
  const card = useRef();
  const titleRef = useRef();
  const [hovered, setHovered] = useState(false);
  const openProjectId = useUIStore((s) => s.openProjectId);
  const openProject = useUIStore((s) => s.openProject);
  const { camera } = useThree();

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

    // The gallery arc spans over 180°, so at some points along the camera's
    // orbit several cards line up along the view ray and their billboarded
    // titles visually stack even though they're well separated in 3D space.
    // Fading each title out as its own card turns away from the camera
    // (rather than always rendering every title at once) keeps only the
    // near-facing, actually-readable ones on screen at a time.
    _cardNormal.set(Math.sin(rotationY), 0, Math.cos(rotationY));
    group.current.getWorldPosition(_worldPos);
    _toCamera.subVectors(camera.position, _worldPos).normalize();
    // Threshold is deliberately tight (title only shows within roughly a
    // card-width's worth of angle either side of dead-on) — cards are ~16°
    // apart around the arc, so a loose threshold left 5-6 titles visible
    // and stacked at once. This keeps only whichever 1-2 cards the camera
    // currently faces "in focus."
    const facing = _cardNormal.dot(_toCamera);
    const titleOpacity = THREE.MathUtils.smoothstep(facing, 0.94, 0.99);
    if (titleRef.current) {
      titleRef.current.fillOpacity = titleOpacity;
      titleRef.current.outlineOpacity = titleOpacity;
    }
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
          {/* emissiveMap (not a flat emissive color) so only the texture's
              own bright accents glow — a flat emissive tint here would wash
              the whole face into a solid color. */}
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

      {/* Billboarded (always camera-facing) title — kept outside the
          rotating `card` group so it stays flat and readable regardless
          of the card's own tilt/orbit angle. This is the one thing that
          must always be legible; everything else lives in the modal. */}
      <Billboard position={[0, 1.15, 0]}>
        <Text
          ref={titleRef}
          font={FONT_BOLD}
          fontSize={0.32}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#020408"
          maxWidth={3.6}
          textAlign="center"
          fillOpacity={0}
          outlineOpacity={0}
        >
          {project.title}
        </Text>
      </Billboard>
    </group>
  );
}
