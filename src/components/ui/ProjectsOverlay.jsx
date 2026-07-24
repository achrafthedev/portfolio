import { motion } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import { projects, categoryMeta } from '../../data';
import { useUIStore } from '../../store/uiStore';

// Real, readable project details as a normal in-flow 2D section — not
// pinned/fixed like HeroOverlay, just part of the page's natural scroll,
// faded in via Framer Motion's `whileInView` (IntersectionObserver-based,
// not the page-scroll-progress hook that caused HeroOverlay's
// non-monotonic-fade bug — whileInView has no such issue). This replaces
// three failed rounds of trying to make project text legible baked onto
// tilted, orbiting 3D cards: title, role, description, tags and links all
// live here now, while the 3D cards behind this section stay purely
// decorative/interactive (hover tilt, click still opens the same modal).
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

function ProjectCard({ project, lang, t }) {
  const openProject = useUIStore((s) => s.openProject);
  const meta = categoryMeta[project.category] || { color: '#22d3ee', en: project.category, fr: project.category };

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="glass-panel pointer-events-auto flex flex-col p-5"
      style={{ boxShadow: `0 0 30px -14px ${meta.color}66` }}
    >
      <button onClick={() => openProject(project.id)} className="text-left" aria-label={`Open ${project.title} details`}>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
          {lang === 'fr' ? meta.fr : meta.en}
        </span>
        <h3 className="mt-1 text-base font-bold text-white">{project.title}</h3>
        <span className="text-xs text-slate-400">{lang === 'fr' ? project.role_fr : project.role_en}</span>
      </button>

      <p className="mt-2.5 flex-1 text-sm text-slate-400 line-clamp-3">
        {lang === 'fr' ? project.desc_fr : project.desc_en}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="badge !px-2 !py-0.5 !text-[11px]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {project.isPublic && project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline !px-3 !py-1.5 text-xs"
          >
            {t.view_project} <ExternalLink size={12} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline !px-3 !py-1.5 text-xs"
          >
            {t.github_repo} <ExternalLink size={12} />
          </a>
        )}
        {!project.isPublic && !project.link && !project.repo && (
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock size={12} /> {t.private_project}
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsOverlay({ t, lang }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="pointer-events-none mx-auto w-full max-w-6xl px-6 py-24"
    >
      <motion.div variants={fadeInUp} className="pointer-events-auto mb-10 max-w-xl">
        <span className="section-label">{t.nav_projects}</span>
        <h2 className="heading-gradient mt-2 text-3xl font-bold md:text-4xl">{t.projects_title}</h2>
        <p className="mt-3 text-slate-400">{t.projects_desc}</p>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} lang={lang} t={t} />
        ))}
      </motion.div>
    </motion.div>
  );
}
