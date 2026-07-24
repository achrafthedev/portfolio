// High-frequency scroll progress (0 -> 1 across the whole page), written by
// CameraRig's GSAP ScrollTrigger and read every frame inside useFrame loops.
// Kept outside React/zustand on purpose so 60fps updates never trigger re-renders.
export const scrollState = {
  progress: 0,
};
