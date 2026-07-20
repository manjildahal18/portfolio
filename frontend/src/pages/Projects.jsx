import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import useFetch from "@/hooks/useFetch";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Face Recognition Attendance System",
    description:
      "A smart attendance management system that uses OpenCV and face recognition to automatically identify students and record attendance, eliminating manual entry.",
    technologies: "Python, OpenCV, SQLite, Tkinter",
    tech_list: [
      "Python",
      "OpenCV",
      "SQLite",
      "Tkinter",
      "Computer Vision"
    ],
    github_url: "https://github.com/yourusername/face-attendance-system",
    demo_url: null,
    is_featured: true,
    image: null,
  },
  {
    id: 2,
    title: "Student Management System",
    description:
      "A full-stack Django application for managing students, courses, and attendance with secure authentication, role-based access, and CRUD operations.",
    technologies: "Django, SQLite, Bootstrap, Python",
    tech_list: [
      "Python",
      "Django",
      "SQLite",
      "Bootstrap",
      "Authentication"
    ],
    github_url: "https://github.com/yourusername/student-management-system",
    demo_url: null,
    is_featured: true,
    image: null,
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "A responsive portfolio website showcasing my projects, skills, and achievements with React frontend and Django REST API backend.",
    technologies: "React, Django REST Framework, Tailwind CSS",
    tech_list: [
      "React",
      "Tailwind CSS",
      "Django",
      "REST API",
      "Responsive Design"
    ],
    github_url: "https://github.com/yourusername/portfolio",
    demo_url: "",
    is_featured: true,
    image: null,
  },
  {
    id: 4,
    title: "AI Chat Assistant",
    description:
      "An AI-powered chatbot capable of answering user queries with a clean chat interface, conversation history, and API integration.",
    technologies: "React, Python, OpenAI API",
    tech_list: [
      "React",
      "Python",
      "REST API",
      "Tailwind CSS",
      "AI"
    ],
    github_url: "https://github.com/yourusername/ai-chat-assistant",
    demo_url: null,
    is_featured: false,
    image: null,
  },
  {
    id: 5,
    title: "E-Commerce Web Application",
    description:
      "A complete online shopping platform featuring user authentication, product catalog, shopping cart, order management, and responsive design.",
    technologies: "React, Django, PostgreSQL",
    tech_list: [
      "React",
      "Django",
      "PostgreSQL",
      "JWT",
      "REST API"
    ],
    github_url: "https://github.com",
    demo_url: null,
    is_featured: false,
    image: null,
  },
  {
    id: 6,
    title: "Movie Recommendation System",
    description:
      "A recommendation engine that suggests movies based on user preferences using content-based filtering and machine learning techniques.",
    technologies: "Python, Pandas, Scikit-Learn",
    tech_list: [
      "Python",
      "Machine Learning",
      "Pandas",
      "Scikit-Learn",
      "Data Analysis"
    ],
    github_url: "https://github.com/yourusername/movie-recommender",
    demo_url: null,
    is_featured: false,
    image: null,
  },
];

export default function Projects() {
  const { data } = useFetch("/projects/");
  const projectsList =
    data?.results && data.results.length > 0 ? data.results : FALLBACK_PROJECTS;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");

  const allTechs = [
    "All",
    ...new Set(
      projectsList
        .flatMap((p) => p.tech_list || (p.technologies ? p.technologies.split(",").map((t) => t.trim()) : []))
        .filter((t) => t && t.length > 0)
    ),
  ];

  const filteredProjects = projectsList.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const projectTechs = project.tech_list || (project.technologies ? project.technologies.split(",").map((t) => t.trim()) : []);
    const matchesTech = selectedTech === "All" || projectTechs.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  return (
    <PageFade>
      <SEO {...seoConfig.projects} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="container-custom max-w-6xl mx-auto px-4 py-16"
      >
        <div className="space-y-14 text-left">
          
          {/* Section Header with Multi-Theme Contrast */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100 font-sans">
              Projects
            </h1>
            <p className="text-neutral-600 dark:text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
              A curated showcase of applications, tools, and open source work.
            </p>
          </div>

          {/* Controls Utility Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-zinc-800/80">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-0 top-2.5 h-4 w-4 text-neutral-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 pr-4 py-1.5 text-sm bg-transparent text-neutral-800 dark:text-zinc-200 placeholder-neutral-400 dark:placeholder-zinc-500 border-b border-transparent focus:border-neutral-400 dark:focus:border-zinc-400 focus:outline-none transition-colors duration-200"
              />
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {allTechs.slice(0, 10).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`text-xs font-mono uppercase tracking-wider relative py-1 transition-colors duration-200 ${
                    selectedTech === tech
                      ? "text-neutral-900 dark:text-zinc-100 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-neutral-800 dark:after:bg-zinc-200"
                      : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Systematic Feed Grid Layout */}
          <motion.div layout className="divide-y divide-neutral-200 dark:divide-zinc-800/60">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const techTags =
                  project.tech_list ||
                  (project.technologies ? project.technologies.split(",").map((t) => t.trim()) : []);

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group py-12 flex flex-col lg:flex-row gap-6 lg:gap-12 justify-between items-start"
                  >
                    
                    {/* Architectural Metadata Column */}
                    <div className="w-full lg:w-1/4 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-medium text-neutral-400 dark:text-zinc-500 tracking-wider">
                          [ 0{project.id} ]
                        </span>
                        {project.is_featured && (
                          <span className="text-[9px] font-mono tracking-widest uppercase bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1 lg:max-w-[200px]">
                        {techTags.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] text-neutral-500 dark:text-zinc-500 font-mono tracking-tight"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-3/4 space-y-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100 group-hover:text-neutral-700 dark:group-hover:text-zinc-300 transition-colors duration-200">
                          {project.title}
                        </h2>
                        
                        {/* Direct Interaction Endpoints */}
                        <div className="flex items-center gap-5 text-xs font-mono tracking-wider uppercase">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-neutral-400 dark:text-zinc-500 hover:text-neutral-800 dark:hover:text-zinc-200 transition-colors duration-200"
                              aria-label={`View ${project.title} source`}
                            >
                              <GithubIcon className="h-4 w-4" />
                              <span className="hidden sm:inline">Code</span>
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-0.5 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 border-b border-neutral-300 dark:border-zinc-700 hover:border-neutral-800 dark:hover:border-zinc-300 transition-all duration-200"
                              aria-label={`Launch ${project.title} deployment`}
                            >
                              <span>Deployment</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-neutral-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                        {project.description}
                      </p>
                    </div>

                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-24 border border-neutral-200 dark:border-zinc-900 rounded-xl bg-neutral-50/50 dark:bg-zinc-950/20">
              <p className="text-neutral-400 dark:text-zinc-500 text-sm font-mono tracking-wider uppercase">
                Null set returned. No projects match the selected parameters.
              </p>
            </div>
          )}
          
        </div>
      </motion.div>
    </PageFade>
  );
}