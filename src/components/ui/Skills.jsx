import { motion } from 'framer-motion';
import { skillCategories } from '../../data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Skills({ t, lang }) {
  return (
    <section
      id="skills"
      className="pointer-events-none relative mx-auto max-w-6xl px-6 py-32"
      aria-label="Technical skills"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="pointer-events-auto mb-12 max-w-xl">
          <span className="section-label">{t.nav_skills}</span>
          <h2 className="heading-gradient mt-2 text-3xl font-bold md:text-4xl">{t.skills_title}</h2>
          <p className="mt-3 text-slate-400">{t.skills_desc}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeInUp}
              className="glass-panel pointer-events-auto p-6"
              style={{ boxShadow: `0 0 30px -12px ${category.color}66` }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-white">
                  {lang === 'fr' ? category.title_fr : category.title_en}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
