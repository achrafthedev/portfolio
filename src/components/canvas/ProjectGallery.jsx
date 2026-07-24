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
    const rampIn = THREE.MathUtils.smoothstep(p, 0.38, 0.5);
    const rampOut = 1 - THREE.MathUtils.smoothstep(p, 0.85, 0.95);
    group.current.scale.setScalar(Math.max(0.001, rampIn * rampOut));
  });

  return (
    <group ref={group}>
      {projects.map((project, i) => {
        const position = getProjectPosition(i, projects.length, _pos.clone());
        const rotationY = Math.atan2(position.x, position.z + 8) * -1;
        return (
          <ProjectNode
            key={project.id}
            project={project}
            position={position.toArray()}
            rotationY={rotationY}
          />
        );
      })}
    </group>
  );
}
