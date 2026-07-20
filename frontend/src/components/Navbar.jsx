import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'About', target: 'about' },
  { name: 'Skills', target: 'skills' },
  { name: 'Projects', target: 'projects' },
  { name: 'Education', target: 'education' },
  { name: 'Experience', target: 'experience' },
  { name: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Monitor scroll for glassmorphism header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor active section via IntersectionObserver when on the home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = NAV_LINKS.map(link => document.getElementById(link.target)).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is around middle of viewport
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
      sections.forEach(section => observer.unobserve(section));
    };
  }, [location.pathname]);

  // Close mobile nav when clicking a link
  const closeMenu = () => setIsOpen(false);

  const handleNavLinkClick = (e, target) => {
    closeMenu();

    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, null, `#${target}`);
        setActiveSection(target);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-premium-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavLinkClick(e, 'home')}
          className="font-bold text-lg tracking-tight hover:opacity-85 transition-opacity flex items-center gap-2"
          aria-label="Developer Portfolio Home"
        >
          <span className="text-accent font-semibold">MANJIL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Desktop navigation">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === '/' && activeSection === link.target;
            return (
              <a
                key={link.target}
                href={`/#${link.target}`}
                onClick={(e) => handleNavLinkClick(e, link.target)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1 relative ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Standalone Resume Page
          <Link
            to="/resume"
            className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
          >
            Resume
          </Link> */}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted text-foreground rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle light and dark theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted text-foreground rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle light and dark theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-muted text-foreground rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === '/' && activeSection === link.target;
                return (
                  <a
                    key={link.target}
                    href={`/#${link.target}`}
                    onClick={(e) => handleNavLinkClick(e, link.target)}
                    className={`text-base font-medium transition-colors duration-200 hover:text-accent py-2 ${
                      isActive ? 'text-accent border-l-2 border-accent pl-2' : 'text-muted-foreground'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              {/* Standalone Resume Page */}
              {/* <Link
                to="/resume"
                onClick={closeMenu}
                className="text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-accent py-2"
              >
                Resume
              </Link> */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
