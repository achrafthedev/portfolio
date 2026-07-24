import { projects, diplomas, skillCategories, stats } from '../../data';

// The 3D canvas (see components/canvas/*) is the visual content now — hero
// copy, career stats/diplomas, project cards and skills are all rendered as
// real objects inside the scene. This scaffold exists purely to:
//   1) give the page enough scrollable height for CameraRig's ScrollTrigger
//      to map its 4 phases against (hero 0-20%, education 20-50%,
//      projects 50-80%, skills 80-100%), matched here via vh proportions.
//   2) expose the exact same data as real, crawlable/screen-reader-visible
//      HTML (sr-only) so nothing is lost for SEO, no-JS or a11y.
// A small low-opacity "phase kicker" label sits in the visible corner of
// each section purely for scroll wayfinding.

function PhaseKicker({ index, label }) {
  return (
    <div
      className="sticky top-24 pointer-events-none select-none px-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600"
      aria-hidden="true"
    >
      {index} — {label}
    </div>
  );
}

export default function ScrollScaffold({ t, lang }) {
  return (
    <>
      <section id="hero" className="min-h-[120vh]">
        <PhaseKicker index="01" label={t.hero_role} />
        <div className="sr-only">
          <h1>Achraf Chardoudi — {t.hero_role}</h1>
          <p>{t.hero_subtitle}</p>
          <p>{t.hero_desc}</p>
          <a href="mailto:chardoudiachraf@gmail.com">{t.contact_me}</a>
          <a href="https://linkedin.com/in/achrafchardoudi">LinkedIn</a>
          <a href="https://github.com/achrafthedev">GitHub</a>
        </div>
      </section>

      <section id="education" className="min-h-[180vh]">
        <PhaseKicker index="02" label={t.nav_education} />
        <div className="sr-only">
          <h2>{t.education_title}</h2>
          <p>{t.education_desc}</p>
          <ul>
            {stats.map((s) => (
              <li key={s.key}>
                {s.value} {t[s.key]}
              </li>
            ))}
          </ul>
          <ul>
            {diplomas.map((d) => (
              <li key={d.id}>
                <h3>{lang === 'fr' ? d.title_fr : d.title_en}</h3>
                <p>{d.school}</p>
                <p>{d.status === 'obtained' ? t.status_obtained : t.status_preparing}</p>
                <p>{lang === 'fr' ? d.desc_fr : d.desc_en}</p>
                {d.rncp_link && <a href={d.rncp_link}>{t.verify_rncp}</a>}
                {d.linkedin_link && <a href={d.linkedin_link}>{t.verify_diploma}</a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="min-h-[180vh]">
        <PhaseKicker index="03" label={t.nav_projects} />
        <div className="sr-only">
          <h2>{t.projects_title}</h2>
          <p>{t.projects_desc}</p>
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <h3>{p.title}</h3>
                <p>{lang === 'fr' ? p.role_fr : p.role_en}</p>
                <p>{lang === 'fr' ? p.desc_fr : p.desc_en}</p>
                <p>{p.tags.join(', ')}</p>
                {p.isPublic && p.link && <a href={p.link}>{t.view_project}</a>}
                {p.repo && <a href={p.repo}>{t.github_repo}</a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="skills" className="min-h-[120vh]">
        <PhaseKicker index="04" label={t.skills_title} />
        <div className="sr-only">
          <h2>{t.skills_title}</h2>
          <p>{t.skills_desc}</p>
          <ul>
            {skillCategories.map((c) => (
              <li key={c.id}>
                <h3>{lang === 'fr' ? c.title_fr : c.title_en}</h3>
                <p>{c.skills.join(', ')}</p>
              </li>
            ))}
          </ul>
          <h2>{t.footer_cta}</h2>
          <p>{t.footer_cta_desc}</p>
          <a href="mailto:chardoudiachraf@gmail.com">{t.contact_me}</a>
          <p>{t.footer_text}</p>
        </div>
      </section>
    </>
  );
}
