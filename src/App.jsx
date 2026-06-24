import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import { translations, projects, diplomas } from './data';
import { Github, Linkedin, Phone, Award, ExternalLink, CheckCircle, Clock } from 'lucide-react';

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
              src={`${import.meta.env.BASE_URL}profile.png`} 
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

      <section id="education" style={{ paddingBottom: '8rem' }}>
        <div className="animate-fade-in delay-200">
          <h2>{t.education_title}</h2>
          <p style={{ marginBottom: '3rem' }}>{t.education_desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {diplomas.map((diploma) => (
              <div key={diploma.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={24} color="#38bdf8" />
                      {lang === 'fr' ? diploma.title_fr : diploma.title_en}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>
                      {diploma.school}
                    </p>
                  </div>
                  <div style={{ 
                    padding: '0.4rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: diploma.status === 'obtained' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    color: diploma.status === 'obtained' ? '#22c55e' : '#eab308'
                  }}>
                    {diploma.status === 'obtained' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    {diploma.status === 'obtained' ? t.status_obtained : t.status_preparing}
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                  {lang === 'fr' ? diploma.desc_fr : diploma.desc_en}
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {diploma.rncp_link && (
                    <a href={diploma.rncp_link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                      {t.verify_rncp} <ExternalLink size={16} />
                    </a>
                  )}
                  {diploma.linkedin_link && (
                    <a href={diploma.linkedin_link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                      {t.verify_diploma} <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
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
