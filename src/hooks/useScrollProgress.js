import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from '../store/scrollState';

gsap.registerPlugin(ScrollTrigger);

// Drives scrollState.progress (0 -> 1) for the whole document height using
// GSAP ScrollTrigger's scrub, which is what CameraRig reads every frame to
// place the 3D camera along its scroll-mapped path.
export function useScrollProgress() {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);
}
