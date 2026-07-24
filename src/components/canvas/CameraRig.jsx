import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { scrollState } from '../../store/scrollState';
import { useUIStore } from '../../store/uiStore';
import { getProjectPosition } from '../../utils/projectLayout';
import { projects } from '../../data';

// Scroll-mapped camera keyframes. Each stop is { t, pos, look } where t is
// the normalized scroll progress (0-1) at which the camera should be at
// `pos`, looking at `look`. Segments between stops are eased with a
// smoothstep so motion never feels linear/robotic.
//
// Phase 1  Hero / Entrance            0.00 -> 0.20
// Phase 2  Experience & Career        0.20 -> 0.50
// Phase 3  Featured Projects Gallery  0.50 -> 0.80
// Phase 4  Skills & Contact tunnel    0.80 -> 1.00
// ExperienceOrbs (src/components/canvas/ExperienceOrbs.jsx) places its
// nodes at x in [-7, 7], z in [7, 10]. The waypoints below deliberately
// keep the camera further back than that z-range (z >= 13) with `look`
// pointed AT that cluster (z ~8.5) for the whole 0.22 -> 0.5 span — an
// earlier version had the camera at nearly the same depth as the orbs
// while looking straight past them, which pushed them out of frame for
// most of the phase.
const DESKTOP_STOPS = [
  { t: 0.0, pos: [0, 0.5, 42], look: [0, 0, 0] },
  { t: 0.12, pos: [0, 0.3, 10], look: [0, 0, 0] },
  { t: 0.25, pos: [0, 1.5, 17], look: [0, 0.3, 8.5] },
  { t: 0.38, pos: [6, 2, 15], look: [4, 0.3, 8.5] },
  { t: 0.5, pos: [2, 1, 10], look: [-1, 0, 3] },
  { t: 0.65, pos: [9, 1.5, -3], look: [0, 0, -8] },
  { t: 0.8, pos: [-9, 0.8, -4], look: [0, 0, -8] },
  { t: 0.9, pos: [0, 0.3, -16], look: [0, 0, -26] },
  { t: 1.0, pos: [0, 0, -27], look: [0, 0, -38] },
];

// Mobile: flattened linear z-axis zoom only, per the perf fallback spec —
// still kept behind the orb cluster's z-range so it stays in frame.
const MOBILE_STOPS = [
  { t: 0.0, pos: [0, 0, 40], look: [0, 0, 0] },
  { t: 0.2, pos: [0, 0, 15], look: [0, 0, 8] },
  { t: 0.5, pos: [0, 0, 10], look: [0, 0, -6] },
  { t: 0.8, pos: [0, 0, -8], look: [0, 0, -18] },
  { t: 1.0, pos: [0, 0, -27], look: [0, 0, -38] },
];

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _al = new THREE.Vector3();
const _bl = new THREE.Vector3();
const _focusPos = new THREE.Vector3();
const _focusLook = new THREE.Vector3();

function sampleStops(stops, t, outPos, outLook) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  let i = 0;
  while (i < stops.length - 2 && clamped > stops[i + 1].t) i++;
  const s0 = stops[i];
  const s1 = stops[i + 1];
  const span = s1.t - s0.t || 1;
  const localT = THREE.MathUtils.clamp((clamped - s0.t) / span, 0, 1);
  const eased = THREE.MathUtils.smoothstep(localT, 0, 1);

  _a.set(...s0.pos);
  _b.set(...s1.pos);
  outPos.lerpVectors(_a, _b, eased);

  _al.set(...s0.look);
  _bl.set(...s1.look);
  outLook.lerpVectors(_al, _bl, eased);
}

export default function CameraRig() {
  useScrollProgress();
  const { camera, pointer } = useThree();
  const isMobile = useUIStore((s) => s.isMobile);
  const openProjectId = useUIStore((s) => s.openProjectId);
  const focusBlend = useRef(0);

  useFrame((_, delta) => {
    const stops = isMobile ? MOBILE_STOPS : DESKTOP_STOPS;
    sampleStops(stops, scrollState.progress, _pos, _look);

    // Mouse parallax fades out as we travel deeper into the scene, and is
    // skipped entirely on mobile (touch devices + perf fallback).
    if (!isMobile) {
      const fade = 1 - THREE.MathUtils.smoothstep(scrollState.progress, 0, 0.5) * 0.7;
      _pos.x += pointer.x * 0.6 * fade;
      _pos.y += pointer.y * 0.35 * fade;
    }

    // Click-to-focus: blend toward the clicked project node instead of the
    // scroll path while a project modal is open.
    const targetBlend = openProjectId ? 1 : 0;
    focusBlend.current = THREE.MathUtils.damp(focusBlend.current, targetBlend, 4, delta);

    if (focusBlend.current > 0.001) {
      const index = projects.findIndex((p) => p.id === openProjectId);
      if (index >= 0) {
        getProjectPosition(index, projects.length, _focusPos);
        _focusLook.copy(_focusPos);
        _focusPos.z += 4.5;
        _pos.lerp(_focusPos, focusBlend.current);
        _look.lerp(_focusLook, focusBlend.current);
      }
    }

    camera.position.lerp(_pos, isMobile ? 1 : Math.min(1, delta * 4));
    const currentLook = camera.userData.lookAt || (camera.userData.lookAt = new THREE.Vector3());
    currentLook.lerp(_look, isMobile ? 1 : Math.min(1, delta * 4));
    camera.lookAt(currentLook);
  });

  return null;
}
