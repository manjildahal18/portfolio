import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

const FALLBACK_EDUCATION = [
  {
    id: 1,
    institution: "IOE Purwanchal Campus, Tribhuvan University",
    degree: "B.E in Computer Engineering",
    field_of_study: "Computer Engineering",
    grade: "Null",
    start_date: "2023-05",
    end_date: "2027-05",
    description:
      "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks.\nProjects: Developed full-stack web applications and AI-based projects using React, Django, Python, and OpenCV.\nActivities: Active learner focused on software engineering, competitive programming, and modern web technologies.",
    order: 1,
  },

  {
    id: 2,
    institution: "Kanchanjunga Secondary School, Jhapa, Nepal",
    degree: "Higher Secondary Education",
    field_of_study: "Science",
    grade: "A",
    start_date: "2019-08",
    end_date: "2021-09",
    description:
      "Relevant Coursework: Physics, Chemistry, Biology, Mathematics.\nProjects: Participated in science fairs and competitions.\nActivities: Engaged in extracurricular activities including science clubs and community service.",
    order: 2,
  },
  {
    id: 3,
    institution: "Karnali Education Foundation, Jhapa, Nepal",
    degree: "Secondary Education",
    field_of_study: "Academic",
    grade: "A",
    start_date: "Null",
    end_date: "2019-05",
    description:
      "Relevant Coursework: Mathematics, Science, English, Social Studies.\nProjects: Participated in school-level academic competitions.\nActivities: Active member of the student council and various school clubs.",
    order: 3,
  },
];

export default function Education() {
  const { data } = useFetch("/education/");
  const educationList =
    data?.results && data.results.length > 0 ? data.results : FALLBACK_EDUCATION;

  // Formatting date strings into human‑readable versions
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <PageFade>
      <SEO {...seoConfig.education} />
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
              Education
            </h1>
            <p className="text-muted-foreground text-lg">
              My academic background, certifications, and educational credentials.
            </p>
          </div>

          {/* List Layout */}
          <div className="space-y-8 max-w-3xl">
            {educationList
              .sort((a, b) => a.order - b.order)
              .map((edu) => {
                const details = edu.description ? edu.description.split("\n") : [];

                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: edu.order * 0.1 }}
                    className="flex gap-4 p-6 rounded-2xl border border-border bg-card/20 hover:border-accent/30 hover:bg-card/40 transition-all group"
                  >
                    {/* Icon */}
                    <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300 shrink-0">
                      <GraduationCap className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h2 className="text-lg font-bold tracking-tight text-foreground">
                            {edu.degree}
                          </h2>
                          <p className="text-sm font-medium text-accent font-mono">
                            {edu.institution}
                          </p>
                        </div>

                        {edu.grade && (
                          <div className="inline-flex items-center gap-1 self-start sm:self-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Award className="h-3.5 w-3.5" />
                            <span>{edu.grade}</span>
                          </div>
                        )}
                      </div>

                      {/* Timeline date metadata */}
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {formatDate(edu.start_date)} – {formatDate(edu.end_date)}
                        </span>
                      </div>

                      {/* Course details */}
                      {details.length > 0 && (
                        <ul className="list-disc list-outside pl-4 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                          {details.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
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