import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useUIStore } from '../../store/uiStore';

const DESKTOP_COUNT = 1800;
const MOBILE_COUNT = Math.round(DESKTOP_COUNT * 0.4); // -60% per perf spec

// Drifting dust field spanning the whole camera path (z from +20 to -60).
function DriftingDust({ count }) {
  const points = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      spd[i] = 0.15 + Math.random() * 0.35;
    }
    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    const arr = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.3;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#818cf8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  const isMobile = useUIStore((s) => s.isMobile);
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

  return (
    <>
      <Stars
        radius={120}
        depth={60}
        count={isMobile ? 1200 : 3000}
        factor={3}
        saturation={0}
        fade
        speed={1}
      />
      <DriftingDust count={count} />
    </>
  );
}
