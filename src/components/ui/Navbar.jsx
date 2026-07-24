import { motion } from 'framer-motion';

export default function Navbar({ t, lang, toggleLang, scrolled }) {
  const scrollToId = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`pointer-events-auto fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-void-950/70 backdrop-blur-xl border-b border-white/5' : ''
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" onClick={scrollToId('hero')} className="text-xl font-bold text-white">
          AC<span className="text-neon-cyan">.</span>
        </a>
        <div className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#skills" onClick={scrollToId('skills')} className="hover:text-neon-cyan transition-colors">
            {t.nav_skills}
          </a>
          <a href="#education" onClick={scrollToId('education')} className="hover:text-neon-cyan transition-colors">
            {t.nav_education}
          </a>
          <a href="#projects" onClick={scrollToId('projects')} className="hover:text-neon-cyan transition-colors">
            {t.nav_projects}
          </a>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-400"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          <span className={lang === 'en' ? 'text-neon-cyan' : ''}>{t.lang_en}</span>
          <span className="text-white/20">/</span>
          <span className={lang === 'fr' ? 'text-neon-cyan' : ''}>{t.lang_fr}</span>
        </button>
      </div>
    </motion.nav>
  );
}
