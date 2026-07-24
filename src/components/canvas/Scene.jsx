import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import Core from './Core';
import HeroText3D from './HeroText3D';
import ExperienceOrbs from './ExperienceOrbs';
import ProjectGallery from './ProjectGallery';
import SkillsTunnel from './SkillsTunnel';
import ParticleField from './ParticleField';
import PostFX from './PostFX';
import { useUIStore } from '../../store/uiStore';
import { useResponsive } from '../../hooks/useResponsive';

// Mouse-responsive point light in NDC, adding subtle interactive highlight
// without moving the actual camera target.
function MouseLight() {
  const light = useRef();
  useFrame(({ pointer, camera }) => {
    if (!light.current) return;
    const target = new THREE.Vector3(pointer.x * 6, pointer.y * 4, camera.position.z - 6);
    light.current.position.lerp(target, 0.08);
  });
  return <pointLight ref={light} color="#a78bfa" intensity={2.5} distance={14} />;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, -4, -10]} intensity={0.4} color="#818cf8" />
      <MouseLight />
    </>
  );
}

export default function Scene() {
  const isMobile = useResponsive();
  useUIStore((s) => s.isMobile); // subscribe so PostFX toggles on resize

  return (
    <div
      className="fixed inset-0 -z-10 bg-radial-fade"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 42], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Lighting />
        <Suspense fallback={null}>
          <ParticleField />
          <Core />
          <HeroText3D />
          <ExperienceOrbs />
          <ProjectGallery />
          <SkillsTunnel />
          <CameraRig />
          {!isMobile && <PostFX />}
        </Suspense>
      </Canvas>
    </div>
  );
}
