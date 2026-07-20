import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DotNavigation from '@/components/DotNavigation';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Education from './Education';
import Experience from './Experience';
import Contact from './Contact';

export default function MainScrollView() {
  const { hash } = useLocation();

  // Handle hash scrolling if a user navigates directly with a hash like /#about
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="flex flex-col w-full relative">
      {/* Floating Right-Side Dot HUD */}
      <DotNavigation />

      {/* Home Section */}
      <section id="home" className="w-full min-h-[90vh] flex items-center justify-center">
        <Home />
      </section>

      {/* About Section - Removed border-t border-border/25 */}
      <section id="about" className="w-full py-16 md:py-24">
        <About />
      </section>

      {/* Skills Section - Removed border-t border-border/25 */}
      <section id="skills" className="w-full py-16 md:py-24">
        <Skills />
      </section>

      {/* Projects Section - Removed border-t border-border/25 */}
      <section id="projects" className="w-full py-16 md:py-24">
        <Projects />
      </section>

      {/* Education Section - Removed border-t border-border/25 */}
      <section id="education" className="w-full py-16 md:py-24">
        <Education />
      </section>

      {/* Experience Section - Removed border-t border-border/25 */}
      <section id="experience" className="w-full py-16 md:py-24">
        <Experience />
      </section>

      {/* Contact Section - Removed border-t border-border/25 */}
      <section id="contact" className="w-full py-16 md:py-24">
        <Contact />
      </section>
    </div>
  );
}