import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import { translations, projects } from './data';
import { Github, Linkedin, Phone } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('fr')) {
      setLang('fr');
    }
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'fr' : 'en');
  const t = translations[lang];

  return (
    <div className="container">
      <header>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>AC.</div>
        <button className="lang-switch" onClick={toggleLang}>
          {lang === 'en' ? t.lang_fr : t.lang_en}
        </button>
      </header>

      <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="animate-fade-in delay-100" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#38bdf8', marginBottom: '1rem', fontWeight: 600 }}>{t.hero_greeting}</h2>
            <h1>Achraf Chardoudi</h1>
            <h2 style={{ fontSize: '2rem', color: '#cbd5e1' }}>{t.hero_role}</h2>
            <p style={{ maxWidth: '700px', fontSize: '1.2rem', marginTop: '2rem' }}>
              {t.hero_desc}
            </p>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:chardoudiachraf@gmail.com" className="btn">
                {t.contact_me}
              </a>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
                <a href="https://linkedin.com/in/achrafchardoudi" target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }}>
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/achrafthedev" target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }}>
                  <Github size={24} />
                </a>
                <a href="tel:+33667064077" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  <Phone size={24} /> <span style={{ fontSize: '0.9rem' }}>+33 6 67 06 40 77</span>
                </a>
              </div>
            </div>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '350px' }}>
            <img 
              src="/profile.png" 
              alt="Achraf Chardoudi" 
              style={{
                width: '100%',
                maxWidth: '350px',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                objectFit: 'cover'
              }} 
            />
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="animate-fade-in delay-200">
          <h2>{t.projects_title}</h2>
          <p style={{ marginBottom: '3rem' }}>{t.projects_desc}</p>
          
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} lang={lang} t={t} />
            ))}
          </div>
        </div>
      </section>

      <footer>
        <p>{t.footer_text}</p>
      </footer>
    </div>
  );
}
