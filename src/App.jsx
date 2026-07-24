import { useEffect, useState } from 'react';
import Scene from './components/canvas/Scene';
import Navbar from './components/ui/Navbar';
import Hero from './components/ui/Hero';
import Skills from './components/ui/Skills';
import Education from './components/ui/Education';
import ProjectsSection from './components/ui/ProjectsSection';
import ProjectModal from './components/ui/ProjectModal';
import Footer from './components/ui/Footer';
import { translations } from './data';

export default function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('fr')) setLang('fr');

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'fr' : 'en'));
  const t = translations[lang];

  return (
    <>
      {/* Fixed full-screen 3D layer — camera path is driven by page scroll */}
      <Scene />

      {/* 2D overlay: transparent to pointer events except on interactive children */}
      <div className="pointer-events-none relative z-10">
        <Navbar t={t} lang={lang} toggleLang={toggleLang} scrolled={scrolled} />
        <main role="main">
          <Hero t={t} />
          <Skills t={t} lang={lang} />
          <Education t={t} lang={lang} />
          <ProjectsSection t={t} lang={lang} />
        </main>
        <Footer t={t} />
      </div>

      <ProjectModal t={t} lang={lang} />
    </>
  );
}
