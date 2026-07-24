import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

// Disabled entirely on mobile per the perf fallback spec — heavy passes are
// the first thing to cut for frame budget on weaker GPUs.
export default function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      {/* Threshold kept fairly high so genuinely bright emissive accents
          (Core, portal, orb/ring geometry) still glow, without blooming the
          text-bearing project card faces into unreadable flat color. */}
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.0003, 0.0003)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.9} />
    </EffectComposer>
  );
}
