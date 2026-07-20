import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 mt-auto py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-sm text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Manjil.
        </div>

         <div className="text-sm text-muted-foreground font-mono">
           Designed & Developed with ❤️.
        </div>

        {/* Center: Social/Contact Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/manjildahal18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/manjil-dahal-795a96282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
             href="https://www.facebook.com/manjil.dahal.504/"
             target="_blank"
             rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground transition-colors p-1"
             aria-label="Facebook Profile"
>
              <FaFacebook className="h-5 w-5" />
            </a>

            <a
               href="https://www.instagram.com/itsme_mr.dahal/?hl=en"
  target="_blank"
  rel="noopener noreferrer"
  className="text-muted-foreground hover:text-foreground transition-colors p-1"
  aria-label="Instagram Profile"
>
               <FaInstagram className="h-5 w-5" />
            </a>
          <a
            href="mailto:majil.creates@gmail.com"
            target="_blank"
             rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Send Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Right Side: Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Scroll to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
