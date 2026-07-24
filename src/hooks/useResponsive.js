import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';

const MOBILE_BREAKPOINT = 768;

// Tracks viewport width and keeps uiStore.isMobile in sync so both the
// canvas layer (particle count, postprocessing) and the UI layer can react.
export function useResponsive() {
  const isMobile = useUIStore((s) => s.isMobile);
  const setIsMobile = useUIStore((s) => s.setIsMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setIsMobile]);

  return isMobile;
}
