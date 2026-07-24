import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

// Disabled entirely on mobile per the perf fallback spec — heavy passes are
// the first thing to cut for frame budget on weaker GPUs.
export default function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.0006, 0.0006)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.9} />
    </EffectComposer>
  );
}
