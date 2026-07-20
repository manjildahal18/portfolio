import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Education', target: 'education' },
  { label: 'Experience', target: 'experience' },
  { label: 'Contact', target: 'contact' },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSideNav, setShowSideNav] = useState(false); // Track side nav visibility

  useEffect(() => {
    // 1. Scroll listener to reveal Side Nav when Top Nav disappears
    const handleScroll = () => {
      if (window.scrollY > 100) { 
        setShowSideNav(true);
      } else {
        setShowSideNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 2. Intersection Observer for active sections
    const sections = SECTIONS.map(s => document.getElementById(s.target)).filter(Boolean);
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleClick = (e, target) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, `#${target}`);
      setActiveSection(target);
    }
  };

  return (
    <div 
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 items-center bg-background/35 backdrop-blur-md border border-border/40 py-6 px-3 rounded-full shadow-premium-sm transition-all duration-500 ease-in-out ${
        showSideNav 
          ? 'opacity-100 translate-x-0 pointer-events-auto visible' 
          : 'opacity-0 translate-x-8 pointer-events-none invisible'
      }`}
    >
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.target;

        return (
          <a
            key={section.target}
            href={`/#${section.target}`}
            onClick={(e) => handleClick(e, section.target)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Label text to the left: Permanently visible but clean styling */}
            <span 
              className={`absolute right-8 px-2.5 py-1 rounded-md bg-card border text-[10px] font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 shadow-premium-sm ${
                isActive 
                  ? 'opacity-100 translate-x-0 text-accent font-semibold border-accent/20' 
                  : 'opacity-60 translate-x-0 text-muted-foreground border-border/80 group-hover:opacity-100 group-hover:text-foreground'
              }`}
            >
              {section.label}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center h-4 w-4">
              {isActive && (
                <motion.div 
                  layoutId="activeDotOutline"
                  className="absolute inset-0 rounded-full border border-accent/60"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <div 
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent scale-125' 
                    : 'bg-muted-foreground/45 group-hover:bg-accent/70 group-hover:scale-110'
                }`}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}