import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";

export default function NotFound() {
  return (
    <PageFade>
      <SEO {...seoConfig.notfound} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container-custom min-h-[70svh] flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-8xl font-mono font-extrabold text-accent/25 tracking-wider select-none">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Lost in Space
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground hover:opacity-90 font-medium rounded-lg shadow-premium-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </motion.div>
    </PageFade>
  );
}