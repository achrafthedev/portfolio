import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ProjectNode from './ProjectNode';
import { getProjectPosition } from '../../utils/projectLayout';
import { scrollState } from '../../store/scrollState';
import { projects } from '../../data';

const _pos = new THREE.Vector3();

// Phase 3 (50% -> 80% scroll): the orbiting gallery of project cards. The
// whole group scales in/out around that scroll range so cards don't clutter
// the hero or the closing tunnel.
export default function ProjectGallery() {
  const group = useRef();

  useFrame(() => {
    const p = scrollState.progress;
    // rampOut finishes by 0.68, matching CameraRig's rail dolly (see
    // CameraRig.jsx) which also leaves the rail by t=0.68 — and well
    // before SkillsTunnel ramps in at 0.8-0.9 (see SkillsTunnel.jsx).
    const rampIn = THREE.MathUtils.smoothstep(p, 0.38, 0.5);
    const rampOut = 1 - THREE.MathUtils.smoothstep(p, 0.58, 0.68);
    group.current.scale.setScalar(Math.max(0.001, rampIn * rampOut));
  });

  return (
    <group ref={group}>
      {projects.map((project, i) => {
        const position = getProjectPosition(i, projects.length, _pos.clone());
        return (
          <ProjectNode
            key={project.id}
            project={project}
            position={position.toArray()}
            rotationY={0}
          />
        );
      })}
    </group>
  );
}
