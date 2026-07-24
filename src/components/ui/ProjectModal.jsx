import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Lock, X } from 'lucide-react';
import { projects, categoryMeta } from '../../data';
import { useUIStore } from '../../store/uiStore';

export default function ProjectModal({ t, lang }) {
  const openProjectId = useUIStore((s) => s.openProjectId);
  const closeProject = useUIStore((s) => s.closeProject);
  const project = projects.find((p) => p.id === openProjectId);
  const meta = project ? categoryMeta[project.category] || { color: '#22d3ee' } : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-void-950/70 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProject}
        >
          <motion.div
            className="glass-panel relative w-full max-w-lg p-8"
            style={{ boxShadow: `0 0 60px -12px ${meta.color}88` }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProject}
              aria-label="Close"
              className="absolute right-5 top-5 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
              {lang === 'fr' ? meta.fr : meta.en}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {lang === 'fr' ? project.role_fr : project.role_en}
            </p>

            <p className="mt-4 text-slate-300">{lang === 'fr' ? project.desc_fr : project.desc_en}</p>

            <div className="mt-5 flex flex-wrap gap-2">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
