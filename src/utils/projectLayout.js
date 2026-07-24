import * as THREE from 'three';

// Arranges project nodes on a shallow arc facing the camera's phase-3 orbit
// path, so CameraRig and ProjectGallery can independently derive the same
// world position for a given project index without sharing refs.
const ARC_RADIUS = 9;
const ARC_SPAN = Math.PI * 0.6; // total angular spread of the gallery

export function getProjectPosition(index, total, out = new THREE.Vector3()) {
  const t = total > 1 ? index / (total - 1) : 0.5;
  const angle = -ARC_SPAN / 2 + t * ARC_SPAN;
  const x = Math.sin(angle) * ARC_RADIUS;
  const z = -8 - Math.cos(angle) * ARC_RADIUS * 0.35;
  const y = Math.sin(t * Math.PI * 2) * 0.6;
  return out.set(x, y, z);
}
