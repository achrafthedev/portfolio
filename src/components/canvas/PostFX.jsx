import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// Disabled entirely on mobile per the perf fallback spec — heavy passes are
// the first thing to cut for frame budget on weaker GPUs. ChromaticAberration
// was dropped: it visibly smeared text edges (billboarded titles, orb/ring
// labels), which matters more here than the stylistic touch was worth.
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
      <Vignette eskil={false} offset={0.15} darkness={0.9} />
    </EffectComposer>
  );
}
