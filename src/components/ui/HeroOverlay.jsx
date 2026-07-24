import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { scrollState } from '../../store/scrollState';

// Hero copy as a synced 2D overlay instead of 3D text baked into the scene
// — baking paragraphs onto WebGL text meshes meant the description could
// clip off-frame at certain scroll positions and get sat on by the Core
// sphere before it finished shrinking away.
//
// This used to fade via Framer Motion's `useScroll()`, which in some
// browsers auto-upgrades to the native CSS ScrollTimeline API when no
// `target` ref is given — and that path measured non-monotonically here,
// so the hero text silently returned to full opacity near the bottom of
// the page and sat on top of the projects/skills sections. Driving
// opacity directly off `scrollState.progress` (the same GSAP-ScrollTrigger
// value CameraRig already uses correctly) via a rAF loop avoids that
// entirely, and the component fully unmounts past 22% scroll as a hard
// safety net so it can never reappear no matter what drives the fade.
export default function HeroOverlay({ t }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let frame;
    const tick = () => {
      const p = scrollState.progress;
      if (ref.current) {
        const opacity = Math.max(0, 1 - p / 0.16);
        ref.current.style.opacity = opacity;
        ref.current.style.transform = `translateY(${-40 * Math.min(1, p / 0.16)}px)`;
      }
      const shouldMount = p < 0.22;
      setMounted((prev) => (prev === shouldMount ? prev : shouldMount));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Soft dark scrim behind the text so it stays legible regardless of
          what's happening in the 3D scene behind it (the bright Core glow
          sits at the same screen-center position while shrinking away). */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 480px 320px at center, rgba(2,4,8,0.55) 0%, rgba(2,4,8,0) 70%)',
        }}
        aria-hidden="true"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="heading-gradient text-4xl font-extrabold tracking-tight sm:text-6xl"
        style={{ textShadow: '0 2px 24px rgba(2,4,8,0.8)' }}
      >
        Achraf Chardoudi
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-lg font-semibold text-neon-cyan sm:text-xl"
        style={{ textShadow: '0 2px 16px rgba(2,4,8,0.9)' }}
      >
        {t.hero_role} <span className="text-white/30">·</span> {t.hero_subtitle}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-xl text-sm text-slate-300 sm:text-base"
        style={{ textShadow: '0 2px 16px rgba(2,4,8,0.9)' }}
      >
        {t.hero_desc}
      </motion.p>
    </div>
  );
}
