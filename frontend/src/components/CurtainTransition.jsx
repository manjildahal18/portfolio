import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NUM_PANELS = 5;

const TERMINAL_LOGS_DARK = [
  "SYSTEM: INITIALIZING CORE INFRASTRUCTURE...",
  "THEME: UNLOADING LIGHT_AMBIENT_GRID...",
  "MODULE: MOUNTING GRAPHITE_DARK_ENGINE...",
  "COSMOS: CALCULATING ZODIAC_ARRAY_DISTRIBUTION...",
  "AUDIO: BALANCING VACUUM_ATMOSPHERE_GLOW...",
  "STATUS: DARK_ENVIRONMENT_READY."
];

const TERMINAL_LOGS_LIGHT = [
  "SYSTEM: RESTORING REFLECTIVE THEME ARCHITECTURE...",
  "THEME: UNLOADING DEEP_SPACE_RENDERER...",
  "MODULE: MOUNTING SOLAR_AMBIENT_LIGHTING...",
  "ATMOSPHERE: SYNCHRONIZING DAYTIME_GLOW...",
  "ACCENT: RESTORING HIGH_CONTRAST_SELECTIONS...",
  "STATUS: LIGHT_ENVIRONMENT_READY."
];

export default function CurtainTransition({ state }) {
  const [logIndex, setLogIndex] = useState(0);
  const isDark = state === 'to-dark';

  // Accelerated terminal logging interval to match the high-speed animation
  useEffect(() => {
    if (!state) {
      setLogIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLogIndex((prev) => Math.min(prev + 1, TERMINAL_LOGS_DARK.length - 1));
    }, 60); // Faster printing rate
    return () => clearInterval(interval);
  }, [state]);

  // High-performance entry/exit vectors sweeping seamlessly from right to left
  const panelVariants = {
    initial: {
      x: '100%',
    },
    animate: (i) => ({
      x: '0%',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Ultra-fast, responsive custom cubic-bezier
        delay: i * 0.025, // Micro-stagger for a razor-sharp wave effect
      }
    }),
    exit: (i) => ({
      x: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.7, 0, 0.84, 0], // Quick, snapping acceleration out of view
        delay: i * 0.02,
      }
    })
  };

  const hudVariants = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut", delay: 0.1 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.96,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state && (
        <div className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-auto overflow-hidden">
          
          {/* Staggered Spatial Layout Panels */}
          <div className="absolute inset-0 w-full h-full flex pointer-events-none z-0">
            {Array.from({ length: NUM_PANELS }).map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`h-full flex-grow border-l border-r -ml-[1px] -mr-[1px] relative ${
                  isDark 
                    ? 'bg-gradient-to-b from-neutral-950 to-neutral-900 border-neutral-800/20' 
                    : 'bg-gradient-to-b from-neutral-50 to-neutral-100 border-neutral-200/30'
                }`}
                style={{ width: `${100 / NUM_PANELS}%` }}
              >
                {/* Structural Grid Mesh Backdrops */}
                <div 
                  className={`absolute inset-0 opacity-[0.015] ${
                    isDark 
                      ? 'bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]' 
                      : 'bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]'
                  } bg-[size:14px_24px]`}
                />
              </motion.div>
            ))}
          </div>

          {/* Central Terminal Console Log HUD Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-10">
            <motion.div 
              variants={hudVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`p-6 rounded-xl border font-mono text-xs w-full max-w-md shadow-2xl backdrop-blur-md ${
                isDark 
                  ? 'bg-neutral-950/90 border-neutral-800 text-neutral-200 shadow-black/80'
                  : 'bg-white/90 border-neutral-200 text-neutral-800 shadow-neutral-400/20'
              }`}
            >
              {/* Terminal Title Header Grid */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isDark ? 'bg-neutral-400' : 'bg-neutral-600'}`} />
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                    Theme Engine Compiler
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider opacity-40 font-semibold px-1.5 py-0.5 rounded bg-neutral-200/50 dark:bg-neutral-800/60">
                  v2.0.4
                </span>
              </div>

              {/* Incremental Text Log Pipeline Feed */}
              <div className="space-y-2 text-[10px] leading-relaxed text-left min-h-[110px]">
                {Array.from({ length: logIndex + 1 }).map((_, idx) => {
                  const currentLog = isDark ? TERMINAL_LOGS_DARK[idx] : TERMINAL_LOGS_LIGHT[idx];
                  const isSuccess = idx === TERMINAL_LOGS_DARK.length - 1;

                  return (
                    <p 
                      key={idx} 
                      className={`font-mono transition-all duration-75 ${
                        isSuccess 
                          ? 'text-neutral-900 dark:text-white font-semibold' 
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      <span className="text-neutral-400 dark:text-neutral-600 mr-1.5">&gt;</span>
                      {currentLog}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}