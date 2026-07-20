import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Stars from './Stars'; 
import CurtainTransition from './CurtainTransition';

export default function Layout({ theme, children }) {
  const { transitionState } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Dynamic theme switch curtain transition */}
      <CurtainTransition state={transitionState} />

      {/* Immersive space sky when in dark mode */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <Stars />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content layer, animating its structural style on theme switch */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.1 
              }
            }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
            className={`min-h-screen transition-all duration-500 ease-out ${
              isDark 
                ? 'theme-dark-layout px-0 py-0 tracking-wide font-sans'
                : 'theme-light-layout px-2 sm:px-4 py-1'
            }`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}