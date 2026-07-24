import * as THREE from 'three';

// Arranges project nodes on a wide arc, viewed from outside/beyond it by
// CameraRig's phase-3 orbit (see CameraRig.jsx — the camera's orbit radius
// is deliberately much larger than ARC_RADIUS so it views the gallery from
// outside the ring rather than skimming through the same radius band,
// which is what made cards feel huge/overlapping up close). Spacing between
// card centers is sized to clear each 2.6-wide card with real margin.
const ARC_RADIUS = 13;
const ARC_SPAN = Math.PI * 1.15; // total angular spread of the gallery

export function getProjectPosition(index, total, out = new THREE.Vector3()) {
  const t = total > 1 ? index / (total - 1) : 0.5;
  const angle = -ARC_SPAN / 2 + t * ARC_SPAN;
  const x = Math.sin(angle) * ARC_RADIUS;
  const z = -8 - Math.cos(angle) * ARC_RADIUS * 0.28;
  const y = Math.sin(t * Math.PI * 2) * 0.6;
  return out.set(x, y, z);
}
