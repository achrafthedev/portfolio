import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import Scene from './components/Scene';
import { translations, projects, diplomas, skillCategories, stats } from './data';
import { Github, Linkedin, Mail, Phone, Award, ExternalLink, CheckCircle, Clock, ArrowRight, ChevronDown } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

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

  const toggleLang = () => setLang(prev => prev === 'en' ? 'fr' : 'en');
  const t = translations[lang];

  return (
    <>
      <Scene />

      <motion.nav
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner container">
          <a href="#" className="nav-logo">AC.</a>
          <div className="nav-links">
            <a href="#skills">{t.nav_skills}</a>
            <a href="#education">{t.nav_education}</a>
            <a href="#projects">{t.nav_projects}</a>
          </div>
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <span className={lang === 'en' ? 'active' : ''}>{t.lang_en}</span>
            <span className="lang-divider">/</span>
            <span className={lang === 'fr' ? 'active' : ''}>{t.lang_fr}</span>
          </button>
        </div>
      </motion.nav>

      <main className="container" role="main">
        {/* ── Hero ── */}
        <motion.section
          className="hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          aria-label="Introduction"
        >
          <div className="hero-content">
            <div className="hero-text">
              <motion.p variants={fadeInUp} className="hero-greeting">
                {t.hero_greeting}
              </motion.p>
              <motion.h1 variants={fadeInUp} className="hero-name">
                Achraf Chardoudi
              </motion.h1>
              <motion.div variants={fadeInUp} className="hero-roles">
                <span className="hero-role">{t.hero_role}</span>
                <span className="hero-role-divider">|</span>
                <span className="hero-subtitle">{t.hero_subtitle}</span>
              </motion.div>
              <motion.p variants={fadeInUp} className="hero-desc">
                {t.hero_desc}
              </motion.p>
              <motion.div variants={fadeInUp} className="hero-actions">
                <a href="mailto:chardoudiachraf@gmail.com" className="btn btn-primary">
                  <Mail size={18} />
                  {t.contact_me}
                </a>
                <div className="hero-socials">
                  <a href="https://linkedin.com/in/achrafchardoudi" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/achrafthedev" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="tel:+33667064077" className="social-btn" aria-label="Phone">
                    <Phone size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="hero-image-wrapper"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="hero-image-glow" aria-hidden="true" />
              <img
                src={`${import.meta.env.BASE_URL}profile.png`}
                alt="Achraf Chardoudi — CTO & Full-Stack Software Architect"
                className="hero-image"
                width="320"
                height="320"
                loading="eager"
              />
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="scroll-indicator" aria-hidden="true">
            <ChevronDown size={24} />
          </motion.div>
        </motion.section>

        {/* ── Stats ── */}
        <motion.section
          className="stats-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          aria-label="Key figures"
        >
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{t[stat.key]}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Skills ── */}
        <motion.section
          id="skills"
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          aria-label="Technical skills"
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-label">{t.nav_skills}</span>
            <h2>{t.skills_title}</h2>
            <p>{t.skills_desc}</p>
          </motion.div>

          <div className="skills-grid">
            {skillCategories.map(category => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="skill-card glass-card"
                style={{ '--category-color': category.color }}
              >
                <div className="skill-card-header">
                  <div className="skill-dot" aria-hidden="true" />
                  <h3>{lang === 'fr' ? category.title_fr : category.title_en}</h3>
                </div>
                <div className="skill-tags">
                  {category.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Education ── */}
        <motion.section
          id="education"
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          aria-label="Education and certifications"
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-label">{t.nav_education}</span>
            <h2>{t.education_title}</h2>
            <p>{t.education_desc}</p>
          </motion.div>

          <div className="education-list">
            {diplomas.map(diploma => (
              <motion.div
                key={diploma.id}
                variants={fadeInUp}
                className="education-card glass-card"
              >
                <div className="education-card-top">
                  <div className="education-info">
                    <h3>
                      <Award size={22} className="education-icon" />
                      {lang === 'fr' ? diploma.title_fr : diploma.title_en}
                    </h3>
                    <p className="education-school">{diploma.school}</p>
                  </div>
                  <div className={`status-badge status-${diploma.status}`}>
                    {diploma.status === 'obtained' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {diploma.status === 'obtained' ? t.status_obtained : t.status_preparing}
                  </div>
                </div>
                <p className="education-desc">
                  {lang === 'fr' ? diploma.desc_fr : diploma.desc_en}
                </p>
                <div className="education-links">
                  {diploma.rncp_link && (
                    <a href={diploma.rncp_link} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      {t.verify_rncp} <ExternalLink size={14} />
                    </a>
                  )}
                  {diploma.linkedin_link && (
                    <a href={diploma.linkedin_link} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      {t.verify_diploma} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Projects ── */}
        <motion.section
          id="projects"
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          aria-label="Selected projects"
        >
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-label">{t.nav_projects}</span>
            <h2>{t.projects_title}</h2>
            <p>{t.projects_desc}</p>
          </motion.div>

          <motion.div className="projects-grid" variants={staggerContainer}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} lang={lang} t={t} />
            ))}
          </motion.div>
        </motion.section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <motion.div
            className="footer-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>{t.footer_cta}</h2>
            <p>{t.footer_cta_desc}</p>
            <a href="mailto:chardoudiachraf@gmail.com" className="btn btn-primary btn-lg">
              <Mail size={20} />
              {t.contact_me}
              <ArrowRight size={20} />
            </a>
          </motion.div>

          <div className="footer-bottom">
            <div className="footer-socials">
              <a href="https://linkedin.com/in/achrafchardoudi" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://github.com/achrafthedev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
              <a href="tel:+33667064077" aria-label="Phone"><Phone size={20} /></a>
            </div>
            <p className="footer-copy">{t.footer_text}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
