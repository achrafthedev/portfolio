import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronDown } from 'lucide-react';
import { stats } from '../../data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Hero({ t }) {
  return (
    <section
      id="hero"
      className="pointer-events-none relative flex min-h-[100vh] flex-col justify-center px-6"
      aria-label="Introduction"
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="pointer-events-auto">
          <motion.p variants={fadeInUp} className="section-label mb-3">
            {t.hero_greeting}
          </motion.p>
          <motion.h1 variants={fadeInUp} className="heading-gradient text-5xl font-extrabold leading-tight md:text-6xl">
            Achraf Chardoudi
          </motion.h1>
          <motion.div variants={fadeInUp} className="mt-4 flex flex-wrap items-center gap-3 text-lg text-slate-300">
            <span className="font-semibold text-neon-cyan">{t.hero_role}</span>
            <span className="text-white/20">|</span>
            <span>{t.hero_subtitle}</span>
          </motion.div>
          <motion.p variants={fadeInUp} className="mt-5 max-w-xl text-slate-400">
            {t.hero_desc}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="mailto:chardoudiachraf@gmail.com" className="btn btn-primary">
              <Mail size={18} />
              {t.contact_me}
            </a>
            <div className="flex gap-2">
              <a
                href="https://linkedin.com/in/achrafchardoudi"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn btn-outline !px-3"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/achrafthedev"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="btn btn-outline !px-3"
              >
                <Github size={18} />
              </a>
              <a href="tel:+33667064077" aria-label="Phone" className="btn btn-outline !px-3">
                <Phone size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none relative mx-auto"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div
            className="absolute inset-0 -z-10 rounded-full bg-neon-cyan/30 blur-3xl"
            aria-hidden="true"
          />
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Achraf Chardoudi — CTO & Full-Stack Software Architect"
            className="relative h-64 w-64 rounded-full border border-white/10 object-cover shadow-glow md:h-80 md:w-80"
            width="320"
            height="320"
            loading="eager"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 px-6 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div key={i} className="pointer-events-auto text-center">
            <span className="block text-3xl font-extrabold text-white">{stat.value}</span>
            <span className="text-xs uppercase tracking-wide text-slate-400">{t[stat.key]}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
        aria-hidden="true"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
