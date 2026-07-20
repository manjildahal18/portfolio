import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, MapPin, Terminal as TerminalIcon, Sparkles, Cpu, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import useFetch from '@/hooks/useFetch';
import SEO from '@/components/SEO';
import PageFade from '@/components/PageFade';
import { seoConfig } from '@/seoConfig';
import myPhoto from '@/assets/my photo.jpeg'; 

const FALLBACK_PROFILE = {
  name: "Manjil Dahal",
  title: "Computer Engineering Student & Full Stack Developer",
  description: "I enjoy building modern web applications, exploring AI technologies, and solving real-world problems through software. I'm currently focused on full-stack development using React and Django while continuously learning new technologies.",
  biography: "I am a Computer Engineering student specializing in building modern web applications.",
  email: "manjil.creates@gmail.com",
  location: "Nepal | Open to Remote Opportunities",
  github_url: "https://github.com/manjildahal18",
  linkedin_url: "https://www.linkedin.com/in/manjil-dahal-795a96282/",
  resume_pdf: null,
};

const TERMINAL_COMMANDS = {
  help: "Available commands: [about, skills, projects, contact, clear]",
  about: "Manjil Dahal is a Computer Engineering student & developer specializing in React, Django, and AI/ML.",
  skills: "Frontend: HTML, TypeScript, React, Tailwind | Backend: Python, Django, Node.js | Database: PostgreSQL, SQLite",
  projects: "Featured: [1] Face Recognition Attendance System [2] Student Management System [3] Personal Portfolio Website",
  contact: "Email: manjil.creates@gmail.com | LinkedIn: linkedin.com/in/manjil-dahal-795a96282/",
};

export default function Home() {
  const { data } = useFetch('/profile/');
  const profile = data?.results?.[0] || FALLBACK_PROFILE;

  const [inputVal, setInputVal] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'help' },
    { type: 'output', text: TERMINAL_COMMANDS.help }
  ]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...terminalHistory, { type: 'input', text: cmd }];

    if (cmd === 'clear') {
      newHistory = [];
    } else if (TERMINAL_COMMANDS[cmd]) {
      newHistory.push({ type: 'output', text: TERMINAL_COMMANDS[cmd] });
    } else {
      newHistory.push({ type: 'output', text: `Command not found: "${cmd}". Type "help" for a list of commands.` });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <PageFade>
      <SEO {...seoConfig.home} pathname="/" />

      <div className="min-h-[85vh] flex items-center py-12 md:py-20 relative overflow-hidden">
        {/* Futuristic Background grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Side: Typography and CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-8 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-mono text-accent shadow-[0_2px_12px_rgba(96,165,250,0.05)]"
            >
              <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '5s' }} />
              <span>Open for work & Opportunities</span>
            </motion.div>

            {/* Heading & Intro */}
            <div className="space-y-3">
              <motion.h3
                variants={itemVariants}
                className="text-sm md:text-base font-mono text-accent tracking-widest uppercase"
              >
                &lt;Hello World, my name is /&gt;
              </motion.h3>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
              >
                {profile.name}
              </motion.h1>
              
              <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-semibold flex items-center gap-2"
              >
                <span>{profile.title}</span>
              </motion.h2>
            </div>

            {/* Syntactic Code Snippet Card */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-xs text-muted-foreground bg-card/45 border border-border/80 rounded-xl p-4 space-y-1.5 shadow-premium-sm relative overflow-hidden group"
            >
              <div className="absolute top-2 right-2 text-[8px] uppercase tracking-widest text-accent/40 select-none">Developer Profile.json</div>
              <p><span className="text-pink-500">const</span> developerObject = &#123;</p>
              <p>&nbsp;&nbsp;location: <span className="text-emerald-500">"{profile.location.split('|')[0].trim()}"</span>,</p>
              <p>&nbsp;&nbsp;coreStack: [<span className="text-orange-400">"React"</span>, <span className="text-orange-400">"Django"</span>, <span className="text-orange-400">"Python"</span>],</p>
              <p>&nbsp;&nbsp;interests: [<span className="text-sky-400">"AI/ML"</span>, <span className="text-sky-400">"Full Stack Web"</span>]</p>
              <p>&#125;;</p>
            </motion.div>

            {/* Short Bio Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {profile.description}
            </motion.p>

            {/* CTA Controls */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, null, '#projects');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium rounded-xl shadow-premium hover:shadow-accent/5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <span>Explore Code Work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              {profile.resume_pdf ? (
                <a
                  href={profile.resume_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-all font-medium rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <FileText className="h-4.5 w-4.5" />
                  <span>Download Curriculum</span>
                </a>
              ) : (
                <Link
                  to="/resume"
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border/80 hover:bg-muted transition-all font-medium rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <FileText className="h-4.5 w-4.5" />
                  <span>View Resume Sheet</span>
                </Link>
              )}
            </motion.div>

            {/* Quick Socials */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-5 border-t border-border/50 max-w-xs"
            >
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-5.5 w-5.5" />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-5.5 w-5.5" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side: Interactive IDE/VS-Code Mockup Frame enclosing Photo & Terminal */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Editor Window Mockup Container */}
            <div className="w-full max-w-[360px] rounded-2xl border border-border/70 bg-[#07070b]/90 overflow-hidden shadow-2xl relative group flex flex-col aspect-[4/5] border-t-accent/15">
              {/* Window Controls Panel */}
              <div className="h-9 bg-[#0b0b12] border-b border-border/40 px-4 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                  <span>manjil.jpeg</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Photo Area */}
              <div className="flex-grow overflow-hidden relative group">
                <img 
                  src={myPhoto} 
                  alt="Manjil Dahal" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-103 group-hover:grayscale-0 transition-all duration-500" 
                />
                
                {/* HUD Tech Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent flex flex-col justify-end p-4 opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                  <div className="flex justify-between items-center text-[10px] font-mono text-accent">
                    <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5" /> NEURAL_GRID: ON</span>
                    <span> Nepal | 2026</span>
                  </div>
                </div>
              </div>

              {/* Mini Recruiter Interactive Console (IDE Terminal Tab) */}
              <div className="h-28 bg-[#040408] border-t border-border/50 flex flex-col justify-between p-3 font-mono shrink-0">
                <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground pb-1.5 border-b border-border/20">
                  <span className="flex items-center gap-1"><TerminalIcon className="h-3 w-3 text-accent" /> Recruiter Console</span>
                  <span className="text-[8px] text-accent/60">Type 'skills' or 'projects'</span>
                </div>
                
                {/* Scrollable history logs */}
                <div className="flex-grow overflow-y-auto text-[9px] py-1.5 space-y-1 scrollbar-none h-14">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className={item.type === 'input' ? 'text-accent' : 'text-muted-foreground/80'}>
                      {item.type === 'input' ? `manjil@portfolio ~ % ${item.text}` : item.text}
                    </div>
                  ))}
                </div>

                {/* Input command box */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 border-t border-border/10 pt-1.5">
                  <span className="text-[9px] text-accent font-bold">~ %</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type help..."
                    className="flex-grow bg-transparent border-none text-[9px] text-foreground font-mono focus:outline-none p-0 focus:ring-0 placeholder:text-muted-foreground/40 leading-none h-3"
                  />
                  <button type="submit" className="sr-only">Submit</button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </PageFade>
  );
}