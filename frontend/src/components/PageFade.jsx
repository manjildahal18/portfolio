// src/components/PageFade.jsx
// Simple wrapper that applies a fade‑in animation to its children.
// Used across all pages for a premium, subtle entrance effect.

import { motion } from 'framer-motion';

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function PageFade({ children }) {
  return (
    <motion.div
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
