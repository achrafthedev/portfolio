import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer({ t }) {
  return (
    <footer id="contact" className="pointer-events-none relative px-6 pb-16 pt-32" role="contentinfo">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="pointer-events-auto"
        >
          <h2 className="heading-gradient text-3xl font-bold md:text-4xl">{t.footer_cta}</h2>
          <p className="mt-3 text-slate-400">{t.footer_cta_desc}</p>
          <a href="mailto:chardoudiachraf@gmail.com" className="btn btn-primary mt-8 !px-7 !py-3.5 text-base">
            <Mail size={20} />
            {t.contact_me}
            <ArrowRight size={20} />
          </a>
        </motion.div>

        <div className="pointer-events-auto mt-16 flex flex-col items-center gap-6 border-t border-white/5 pt-8">
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/achrafchardoudi" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-neon-cyan">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/achrafthedev" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-neon-cyan">
              <Github size={20} />
            </a>
            <a href="tel:+33667064077" aria-label="Phone" className="text-slate-400 hover:text-neon-cyan">
              <Phone size={20} />
            </a>
          </div>
          <p className="text-xs text-slate-500">{t.footer_text}</p>
        </div>
      </div>
    </footer>
  );
}
