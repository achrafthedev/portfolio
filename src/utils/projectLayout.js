import * as THREE from 'three';

// Cards sit along a straight rail in x at a shared depth, with a gentle
// sine ripple in y so the row doesn't read as a rigid grid — replacing the
// earlier wide arc. CameraRig's phase-3 keyframes dolly laterally along
// this same rail (see CameraRig.jsx) instead of orbiting around it, so
// cards approach and pass the camera like a shelf rather than a carousel.
const RAIL_SPACING = 3.4;
export const RAIL_Z = -9;

export function getProjectPosition(index, total, out = new THREE.Vector3()) {
  const x = (index - (total - 1) / 2) * RAIL_SPACING;
  const y = Math.sin(index * 1.4) * 0.5;
  return out.set(x, y, RAIL_Z);
}

// Half the rail's total width — used by CameraRig to know how far left/right
// its phase-3 dolly needs to travel to cover every card, however many there are.
export function getRailHalfWidth(total) {
  return ((Math.max(total, 1) - 1) / 2) * RAIL_SPACING;
}
