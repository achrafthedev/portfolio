import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

// Compact, always-visible contact CTA that replaces the old full-width
// footer section — content now lives in the 3D scene, so this stays small
// and out of the way instead of competing for screen space.
export default function ContactDock({ t }) {
  return (
    <motion.div
      className="pointer-events-auto fixed bottom-6 right-6 z-40 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <a
        href="https://linkedin.com/in/achrafchardoudi"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="glass-panel hidden h-10 w-10 items-center justify-center text-slate-300 hover:text-neon-cyan sm:flex"
      >
        <Linkedin size={17} />
      </a>
      <a
        href="https://github.com/achrafthedev"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="glass-panel hidden h-10 w-10 items-center justify-center text-slate-300 hover:text-neon-cyan sm:flex"
      >
        <Github size={17} />
      </a>
      <a href="mailto:chardoudiachraf@gmail.com" className="btn btn-primary !py-2.5">
        <Mail size={16} />
        {t.contact_me}
      </a>
    </motion.div>
  );
}
