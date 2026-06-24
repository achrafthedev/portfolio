import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ProjectCard({ project, lang, t }) {
  return (
    <motion.div 
      variants={cardVariant}
      whileHover={{ y: -10, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', borderColor: 'rgba(56, 189, 248, 0.4)' }}
      className="glass-card"
    >
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{project.title}</h3>
      <h4 style={{ color: '#38bdf8', marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
        {lang === 'fr' ? project.role_fr : project.role_en}
      </h4>
      <p style={{ fontSize: '0.95rem', flex: 1 }}>
        {lang === 'fr' ? project.desc_fr : project.desc_en}
      </p>
      
      <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
        {project.tags.map(tag => (
          <span key={tag} className="badge">{tag}</span>
        ))}
      </div>

      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {project.isPublic && project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            {t.view_project} <ExternalLink size={16} />
          </a>
        )}
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            {t.github_repo} <ExternalLink size={16} />
          </a>
        ) : (!project.isPublic && !project.link && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', padding: '0.5rem 0' }}>
            <Lock size={16} /> {t.private_project}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
