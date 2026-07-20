import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Cloud, Wrench, Code2, Code, Computer, Laptop } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

const FALLBACK_SKILLS = [
  { name: "HTML", category: "Frontend", order: 1 },
  { name: "TypeScript", category: "Frontend", order: 2 },
  { name: "JavaScript", category: "Frontend", order: 3 },
  { name: "Tailwind CSS", category: "Frontend", order: 4 },
  { name: "Bootstrap", category: "Frontend", order: 5 },
  { name: "Next.js", category: "Frontend", order: 6 },

  { name: "Python", category: "Backend", order: 1 },
  { name: "Django", category: "Backend", order: 2 },
  { name: "Django REST Framework", category: "Backend", order: 3 },
  { name: "Node.js & Express", category: "Backend", order: 4 },
  { name: "REST API", category: "Backend", order: 5 },

  { name: "PostgreSQL", category: "Database", order: 1 },
  { name: "SQLite", category: "Database", order: 2 },
  { name: "MySQL", category: "Database", order: 3 },
  { name: "MongoDB", category: "Database", order: 4 },

  { name: "Docker", category: "DevOps", order: 1 },
  { name: "GitHub Actions (CI/CD)", category: "DevOps", order: 2 },
  { name: "Vercel", category: "DevOps", order: 3 },
  { name: "Render", category: "DevOps", order: 4 },

  { name: "Git & GitHub", category: "Tools", order: 1 },
  { name: "VS Code", category: "Tools", order: 2 },
  { name: "LINUX", category: "Tools", order: 3 },
  { name: "Dev tools", category: "Tools", order: 4 },
  { name: "Jira", category: "Tools", order: 5 },

  { name: "OpenCV", category: "AI/ML", order: 1 },
  { name: "NumPy", category: "AI/ML", order: 2 },
  { name: "Pandas", category: "AI/ML", order: 3 },
  { name: "Scikit-learn", category: "AI/ML", order: 4 },
  { name: "Tensor Flow(Basic)", category: "AI/ML", order: 5 }
];

const CATEGORY_ICONS = {
  Frontend: <Layout className="h-5 w-5 text-accent" />,
  Backend: <Server className="h-5 w-5 text-accent" />,
  Database: <Database className="h-5 w-5 text-accent" />,
  DevOps: <Cloud className="h-5 w-5 text-accent" />,
  Tools: <Wrench className="h-5 w-5 text-accent" />,
  "AI/ML": <Laptop className="h-5 w-5 text-accent" />,
};

export default function Skills() {
  const { data } = useFetch("/skills/");
  const skillsList =
    data?.results && data.results.length > 0 ? data.results : FALLBACK_SKILLS;

  // Group skills by category
  const groupedSkills = skillsList.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoriesOrder = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
    "AI/ML",
  ];

  // Motion variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <PageFade>
      <SEO {...seoConfig.skills} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="container-custom"
      >
        <div className="space-y-12 text-left">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Skills
            </h1>
            <p className="text-muted-foreground text-lg">
              My technical stack and developer tools mapped by layer.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="space-y-10">
            {categoriesOrder.map((category) => {
              const categorySkills = groupedSkills[category] || [];
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    {CATEGORY_ICONS[category] || <Code2 className="h-5 w-5 text-accent" />}
                    <h2 className="text-lg font-semibold tracking-wide text-foreground">
                      {category}
                    </h2>
                  </div>

                  {/* Skills Cards Grid */}
                  <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  >
                    {categorySkills
                      .sort((a, b) => a.order - b.order)
                      .map((skill) => (
                        <motion.div
                          key={skill.name}
                          variants={cardVariants}
                          className="px-4 py-3 rounded-xl border border-border bg-card/40 flex items-center justify-between transition-all duration-300 hover:border-accent/40 hover:bg-card group cursor-default"
                        >
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-accent transition-colors duration-200" />
                        </motion.div>
                      ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </PageFade>
  );
}