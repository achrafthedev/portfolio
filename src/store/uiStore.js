import { create } from 'zustand';

// Central UI state shared between the 2D overlay and the 3D canvas.
// Scroll progress itself is NOT kept here — it changes every frame and
// would force a re-render of every subscriber. It lives in scrollState
// (see src/store/scrollState.js) as a plain mutable ref instead.
export const useUIStore = create((set) => ({
  lang: 'en',
  setLang: (lang) => set({ lang }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  // id of the project whose full-detail modal is open (3D node click)
  openProjectId: null,
  openProject: (id) => set({ openProjectId: id }),
  closeProject: () => set({ openProjectId: null }),

  // id of the project the 2D carousel (ProjectsOverlay) is currently
  // showing — separate from openProjectId so browsing the carousel can
  // steer the camera without popping the modal open on every step.
  focusedProjectId: null,
  setFocusedProjectId: (id) => set({ focusedProjectId: id }),

  hoveredProjectId: null,
  setHoveredProjectId: (id) => set({ hoveredProjectId: id }),
}));
