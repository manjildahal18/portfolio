import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import useFetch from "@/hooks/useFetch";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

const FALLBACK_PROFILE = {
  name: "Manjil Dahal",
  biography:
    "I'm a Computer Science undergraduate with a strong interest in full-stack web development, artificial intelligence, and software engineering. I enjoy turning ideas into practical applications while writing clean, maintainable code.\n\nMy current learning journey includes React, Django REST Framework, machine learning, computer vision, and cybersecurity. I enjoy participating in coding challenges, building personal projects, and continuously improving my technical skills.",
  email: "manjil.creates@gmail.com",
  location: "Nepal | Open to Remote Opportunities",
  interests: "Full Stack Development, Artificial Intelligence, Machine Learning, Open Source, Cyber Security, Computer Vision, Problem Solving"
};

export default function About() {
  const { data } = useFetch("/profile/");
  const profile = data?.results?.[0] || FALLBACK_PROFILE;

  const paragraphs = profile.biography
    ? profile.biography.split("\n\n")
    : [FALLBACK_PROFILE.biography];

  const interestsList = profile.interests
    ? profile.interests.split(",").map((i) => i.trim())
    : FALLBACK_PROFILE.interests.split(",").map((i) => i.trim());

  return (
    <PageFade>
      <SEO {...seoConfig.about} />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="container-custom"
      >
        <div className="space-y-12 text-left">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              About Me
            </h1>
            <p className="text-muted-foreground text-lg">
              A little about who I am, what I build, and what I'm learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Biography Column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6 text-muted-foreground leading-relaxed text-base">
              <div className="space-y-4">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Interests Sub-row inside Biography Column for alignment */}
              <div className="pt-6 border-t border-border/40 space-y-3">
                <h3 className="font-semibold text-foreground text-xs font-mono uppercase tracking-wider">
                  Interests & Domains
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-secondary text-secondary-foreground border border-border/80"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact / Metadata Column - Styled to be a cohesive balanced side card */}
            <div className="md:col-span-5 flex flex-col justify-between bg-card/25 border border-border/60 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-6">
                <h3 className="font-semibold text-foreground text-sm font-mono uppercase tracking-wider pb-2 border-b border-border/30">
                  Quick Details
                </h3>

                <div className="space-y-5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center shrink-0">
                      <MapPin className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-xs uppercase font-mono tracking-wider">
                        Location
                      </h4>
                      <p className="text-sm mt-0.5">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center shrink-0">
                      <Mail className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-xs uppercase font-mono tracking-wider">
                        Email Address
                      </h4>
                      <a href={`mailto:${profile.email}`} className="text-sm mt-0.5 hover:text-accent hover:underline block break-all transition-colors duration-200">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call To Action within the metadata card */}
              <div className="pt-6 border-t border-border/30">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold rounded-xl text-sm shadow-premium-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <Send className="h-4 w-4" />
                  <span>Let's Get in Touch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PageFade>
  );
}