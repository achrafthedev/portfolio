import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { diplomas } from '../../data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Education({ t, lang }) {
  return (
    <section
      id="education"
      className="pointer-events-none relative mx-auto max-w-6xl px-6 py-32"
      aria-label="Education and certifications"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="pointer-events-auto mb-12 max-w-xl">
          <span className="section-label">{t.nav_education}</span>
          <h2 className="heading-gradient mt-2 text-3xl font-bold md:text-4xl">{t.education_title}</h2>
          <p className="mt-3 text-slate-400">{t.education_desc}</p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {diplomas.map((diploma) => (
            <motion.div key={diploma.id} variants={fadeInUp} className="glass-panel pointer-events-auto p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Award size={20} className="text-neon-cyan" />
                    {lang === 'fr' ? diploma.title_fr : diploma.title_en}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{diploma.school}</p>
                </div>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    diploma.status === 'obtained'
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'bg-neon-amber/10 text-neon-amber'
                  }`}
                >
                  {diploma.status === 'obtained' ? <CheckCircle size={14} /> : <Clock size={14} />}
                  {diploma.status === 'obtained' ? t.status_obtained : t.status_preparing}
                </span>
              </div>
              <p className="mt-4 text-slate-400">{lang === 'fr' ? diploma.desc_fr : diploma.desc_en}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {diploma.rncp_link && (
                  <a href={diploma.rncp_link} target="_blank" rel="noreferrer" className="btn btn-outline text-xs">
                    {t.verify_rncp} <ExternalLink size={14} />
                  </a>
                )}
                {diploma.linkedin_link && (
                  <a href={diploma.linkedin_link} target="_blank" rel="noreferrer" className="btn btn-outline text-xs">
                    {t.verify_diploma} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
