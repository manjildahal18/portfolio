import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Printer, Mail, MapPin, Globe } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";
import Education from "./Education";

const FALLBACK_PROFILE = {
  name: "Manjil Dahal",
  title: "Computer Engineering Student & Full Stack Developer",
  email: "manjil.creates@gmail.com",
  location: "Nepal | Open to Remote Opportunities",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  resume_pdf: null,
};

const FALLBACK_EXP = [
  {
    company: "GoretoX",
    position: "Software Developer & QA Engineer",
    dates: "Jun 2026 - Present",
  },
];

export default function Resume() {
  const { data: profileData } = useFetch("/profile/");
  const { data: expData } = useFetch("/experience/");
  const { data: eduData } = useFetch("/education/");
  const { data: skillsData } = useFetch("/skills/");

  const profile = profileData?.results?.[0] || FALLBACK_PROFILE;
  const experiences = expData?.results || [];
  const educations = eduData?.results || [];
  const skills = skillsData?.results || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageFade>
      <SEO {...seoConfig.resume} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="container-custom"
      >
        <div className="space-y-8 text-left">
          {/* Header with Print/Download Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
                Curriculum Vitae
              </h1>
              <p className="text-neutral-400 text-sm">
                Download or print the official resume.
              </p>
            </div>

            <div className="flex items-center gap-3">
             <button
                 onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-neutral-200 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              >
              <Printer className="h-4 w-4 text-neutral-300" />
                <span className="text-neutral-200">Print CV</span>
              </button>
              
              {profile.resume_pdf && (
                <a
                  href={profile.resume_pdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-95 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring shadow-premium-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* CV Printable Sheet Container */}
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-premium print:shadow-none print:border-none print:bg-transparent print:p-0 space-y-10">
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-border/60 pb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                  {profile.name}
                </h2>
                <p className="text-base text-accent font-medium tracking-wide font-mono uppercase">
                  {profile.title}
                </p>
              </div>

              <div className="space-y-1.5 text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                {(profile.github_url || profile.linkedin_url) && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <div className="flex gap-2">
                      {profile.github_url && (
                        <a
                          href={profile.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-foreground"
                        >
                          GitHub
                        </a>
                      )}
                      {profile.linkedin_url && (
                        <a
                          href={profile.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-foreground"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print:grid-cols-12">
              {/* Left Side: Work Experience & Education */}
              <div className="md:col-span-8 print:col-span-8 space-y-8">
                {/* Work Experience */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground font-mono pb-1.5 border-b border-border/40">
                    Work Experience
                  </h3>

                  {experiences.length > 0 ? (
                    <div className="space-y-6">
                      {experiences
                        .sort((a, b) => a.order - b.order)
                        .map((exp) => (
                          <div key={exp.id} className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-bold text-foreground">
                                  {exp.position}
                                </h4>
                                <div className="text-sm font-medium text-muted-foreground">
                                  {exp.company} &bull; {exp.location}
                                </div>
                              </div>
                              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap pt-1">
                                {new Date(exp.start_date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })}{" "}
                                –{" "}
                                {exp.end_date
                                  ? new Date(exp.end_date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                    })
                                  : "Present"}
                              </span>
                            </div>
                            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                              {exp.description
                                ? exp.description.split("\n").map((bullet, idx) => (
                                    <li key={idx}>{bullet}</li>
                                  ))
                                : null}
                            </ul>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {FALLBACK_EXP.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <h4 className="font-bold text-foreground">{exp.position}</h4>
                          <div className="text-sm text-muted-foreground flex justify-between">
                            <span>{exp.company}</span>
                            <span className="font-mono text-xs">{exp.dates}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground font-mono pb-1.5 border-b border-border/40">
                    Education
                  </h3>

                  {educations.length > 0 ? (
                    <div className="space-y-6">
                      {educations
                        .sort((a, b) => a.order - b.order)
                        .map((edu) => (
                          <div key={edu.id} className="space-y-1.5">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-bold text-foreground">{edu.degree}</h4>
                                <div className="text-sm text-muted-foreground">{edu.institution}</div>
                              </div>
                              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap pt-1">
                                {new Date(edu.start_date).getFullYear()} –{" "}
                                {edu.end_date
                                  ? new Date(edu.end_date).getFullYear()
                                  : "Present"}
                              </span>
                            </div>
                            {edu.grade && (
                              <div className="text-xs font-mono text-accent">{edu.grade}</div>
                            )}
                            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                              {edu.description
                                ? edu.description.split("\n").map((bullet, idx) => (
                                    <li key={idx}>{bullet}</li>
                                  ))
                                : null}
                            </ul>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground italic">
                      No education history added yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Skills Summary */}
              <div className="md:col-span-4 print:col-span-4 space-y-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-foreground font-mono pb-1.5 border-b border-border/40">
                  Skills
                </h3>

                {skills.length > 0 ? (
                  <div className="space-y-4">
                    {/* Grouped view */}
                    {Object.entries(
                      skills.reduce((acc, curr) => {
                        if (!acc[curr.category]) acc[curr.category] = [];
                        acc[curr.category].push(curr.name);
                        return acc;
                      }, {})
                    ).map(([category, names]) => (
                      <div key={category} className="space-y-1">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wide font-mono">
                          {category}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {names.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground italic">
                    No skills added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PageFade>
  );
}