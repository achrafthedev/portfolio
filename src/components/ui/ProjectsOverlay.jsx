import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from 'lucide-react';
import { projects, categoryMeta } from '../../data';
import { useUIStore } from '../../store/uiStore';

// A one-at-a-time carousel instead of a scrolling grid — browsing stays a
// deliberate, paused action (click Prev/Next or a dot) rather than
// something you have to keep scrolling past. Setting focusedProjectId as
// you browse also steers the 3D camera toward whichever card is active
// (see CameraRig.jsx), so the decorative 3D gallery visually follows along.
const cardVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

export default function ProjectsOverlay({ t, lang }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const setFocusedProjectId = useUIStore((s) => s.setFocusedProjectId);

  const project = projects[index];
  const meta = categoryMeta[project.category] || { color: '#22d3ee', en: project.category, fr: project.category };

  useEffect(() => {
    setFocusedProjectId(project.id);
    return () => setFocusedProjectId(null);
  }, [project.id, setFocusedProjectId]);

  const go = (delta) => {
    setDirection(delta);
    setIndex((prev) => (prev + delta + projects.length) % projects.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-24"
    >
      <div className="pointer-events-auto mb-8 text-center">
        <span className="section-label">{t.nav_projects}</span>
        <h2 className="heading-gradient mt-2 text-3xl font-bold md:text-4xl">{t.projects_title}</h2>
        <p className="mt-3 text-slate-400">{t.projects_desc}</p>
      </div>

      <div className="pointer-events-auto flex w-full items-center gap-3 sm:gap-5">
        <button
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="glass-panel flex h-11 w-11 shrink-0 items-center justify-center text-slate-300 hover:text-neon-cyan"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative min-h-[340px] flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={project.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel flex flex-col p-6"
              style={{ boxShadow: `0 0 40px -14px ${meta.color}66` }}
            >
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
                {lang === 'fr' ? meta.fr : meta.en}
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">{project.title}</h3>
              <span className="text-sm text-slate-400">
                {lang === 'fr' ? project.role_fr : project.role_en}
              </span>

              <p className="mt-4 text-sm text-slate-300">
                {lang === 'fr' ? project.desc_fr : project.desc_en}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.isPublic && project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary text-xs">
                    {t.view_project} <ExternalLink size={14} />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-outline text-xs">
                    {t.github_repo} <ExternalLink size={14} />
                  </a>
                )}
                {!project.isPublic && !project.link && !project.repo && (
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Lock size={14} /> {t.private_project}
                  </span>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next project"
          className="glass-panel flex h-11 w-11 shrink-0 items-center justify-center text-slate-300 hover:text-neon-cyan"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`Go to ${p.title}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === index ? '1.5rem' : '0.5rem',
              backgroundColor: i === index ? meta.color : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
      <p className="pointer-events-none mt-3 text-xs text-slate-500">
        {index + 1} / {projects.length}
      </p>
    </motion.div>
  );
}
