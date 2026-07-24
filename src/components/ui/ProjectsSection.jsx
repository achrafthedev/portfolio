import { motion } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import { projects, categoryMeta } from '../../data';
import { useUIStore } from '../../store/uiStore';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function ProjectCard({ project, lang, t }) {
  const openProject = useUIStore((s) => s.openProject);
  const meta = categoryMeta[project.category] || { color: '#22d3ee', en: project.category, fr: project.category };

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      className="glass-panel pointer-events-auto flex flex-col p-6 text-left"
      style={{ boxShadow: `0 0 30px -14px ${meta.color}66` }}
    >
      <button onClick={() => openProject(project.id)} className="text-left" aria-label={`Open ${project.title} details`}>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
          {lang === 'fr' ? meta.fr : meta.en}
        </span>
        <h3 className="mt-1 text-lg font-bold text-white">{project.title}</h3>
        <span className="text-sm text-slate-400">{lang === 'fr' ? project.role_fr : project.role_en}</span>
      </button>

      <p className="mt-3 flex-1 text-sm text-slate-400">
        {lang === 'fr' ? project.desc_fr : project.desc_en}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.isPublic && project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline text-xs"
          >
            {t.view_project} <ExternalLink size={14} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline text-xs"
          >
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
  );
}

export default function ProjectsSection({ t, lang }) {
  return (
    <section
      id="projects"
      className="pointer-events-none relative mx-auto max-w-6xl px-6 py-32"
      aria-label="Selected projects"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="pointer-events-auto mb-12 max-w-xl">
          <span className="section-label">{t.nav_projects}</span>
          <h2 className="heading-gradient mt-2 text-3xl font-bold md:text-4xl">{t.projects_title}</h2>
          <p className="mt-3 text-slate-400">{t.projects_desc}</p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} t={t} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
