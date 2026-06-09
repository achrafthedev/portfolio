import React from 'react';
import { ExternalLink, Lock } from 'lucide-react';

export default function ProjectCard({ project, lang, t }) {
  return (
    <div className="glass-card animate-fade-in">
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{project.title}</h3>
      <h4 style={{ color: '#38bdf8', marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
        {lang === 'fr' ? project.role_fr : project.role_en}
      </h4>
      <p style={{ fontSize: '0.95rem' }}>
        {lang === 'fr' ? project.desc_fr : project.desc_en}
      </p>
      
      <div style={{ marginBottom: '1.5rem' }}>
        {project.tags.map(tag => (
          <span key={tag} className="badge">{tag}</span>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
    </div>
  );
}
