import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { categoryMeta } from "../data";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProjectCard({ project, lang, t }) {
  const meta = categoryMeta[project.category] || {
    color: "#22d3ee",
    en: project.category,
    fr: project.category,
  };

  return (
    <motion.article
      variants={cardVariant}
      whileHover={{ y: -6 }}
      className="project-card glass-card"
      style={{ "--project-color": meta.color }}
    >
      <div className="project-card-header">
        <span className="project-category" style={{ color: meta.color }}>
          {lang === "fr" ? meta.fr : meta.en}
        </span>
        <h3 className="project-title">{project.title}</h3>
        <span className="project-role">
          {lang === "fr" ? project.role_fr : project.role_en}
        </span>
      </div>

      <p className="project-desc">
        {lang === "fr" ? project.desc_fr : project.desc_en}
      </p>

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>

      <div className="project-actions">
        {project.isPublic && project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            {t.view_project} <ExternalLink size={14} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            {t.github_repo} <ExternalLink size={14} />
          </a>
        )}
        {!project.isPublic && !project.link && !project.repo && (
          <span className="project-private">
            <Lock size={14} /> {t.private_project}
          </span>
        )}
      </div>
    </motion.article>
  );
}
