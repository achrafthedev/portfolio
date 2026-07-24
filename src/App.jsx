import { useEffect, useState } from 'react';
import Scene from './components/canvas/Scene';
import Navbar from './components/ui/Navbar';
import HeroOverlay from './components/ui/HeroOverlay';
import ScrollScaffold from './components/ui/ScrollScaffold';
import ContactDock from './components/ui/ContactDock';
import ProjectModal from './components/ui/ProjectModal';
import { translations } from './data';
import { useUIStore } from './store/uiStore';

export default function App() {
  const lang = useUIStore((s) => s.lang);
  const setLang = useUIStore((s) => s.setLang);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('fr')) setLang('fr');

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(lang === 'en' ? 'fr' : 'en');
  const t = translations[lang];

  return (
    <>
      {/* Fixed full-screen 3D layer — this IS the content now. Hero copy,
          career stats/diplomas, project cards and skills are all rendered
          as real objects inside the canvas (see components/canvas/*), not
          drawn as HTML on top of it. CameraRig moves through them on scroll. */}
      <Scene />
      <HeroOverlay t={t} />

      {/* Minimal 2D chrome: navigation + an accessible/SEO text scaffold that
          provides the same content as the 3D scene for screen readers,
          crawlers and no-JS fallback, without visually competing with it. */}
      <div className="pointer-events-none relative z-10">
        <Navbar t={t} lang={lang} toggleLang={toggleLang} scrolled={scrolled} />
        <main role="main">
          <ScrollScaffold t={t} lang={lang} />
        </main>
      </div>

      <ContactDock t={t} />
      <ProjectModal t={t} lang={lang} />
    </>
  );
}
