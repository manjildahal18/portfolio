import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

const FALLBACK_EXPERIENCE = [
  {
    id: 1,
    company: "GoretoX",
    position: "Software Developer & QA Engineer",
    location: "Virginia, USA. Nepal(Remote/Contract)",
    start_date: "2026-06-01",
    end_date: null,
    description:
      "Performed manual and semi-automated testing of web applications to ensure product quality and reliability. \n Developed and maintained Playwright automation scripts for end-to-end testing and regression testing.\n Reported, tracked, and verified software defects using Jira while collaborating with developers on timely resolutions.\n Contributed to software development tasks and quality assurance processes in a remote contract-based engineering team.",
    order: 1,
  },
];

export default function Experience() {
  const { data } = useFetch("/experience/");
  const experienceList =
    data?.results && data.results.length > 0 ? data.results : FALLBACK_EXPERIENCE;

  // Formatting date strings into human‑readable versions
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <PageFade>
      <SEO {...seoConfig.experience} />
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
              Experience
            </h1>
            <p className="text-muted-foreground text-lg">
              My professional journey and career highlights in engineering.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-border pl-6 ml-2 space-y-10">
            {experienceList
              .sort((a, b) => a.order - b.order)
              .map((exp, idx) => {
                const bullets = exp.description ? exp.description.split("\n") : [];

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Timeline point indicator */}
                    <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border border-border bg-background flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-accent transition-colors duration-200" />
                    </span>

                    <div className="space-y-3">
                      {/* Position and Company */}
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">
                          {exp.position}
                        </h2>
                        <div className="text-accent font-semibold font-mono text-sm">
                          {exp.company}
                        </div>
                      </div>

                      {/* Metadata: Dates and Location */}
                      <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Bullet Points description */}
                      <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </PageFade>
  );
}