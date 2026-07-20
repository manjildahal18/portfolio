import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";
import PageFade from "@/components/PageFade";
import { seoConfig } from "@/seoConfig";
import api from "@/services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!formData.message.trim()) tempErrors.message = "Message is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      await api.post("/contact/", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFade>
      <SEO {...seoConfig.contact} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="container-custom max-w-6xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Side: Dynamic Info Container */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 tracking-wider font-semibold uppercase bg-neutral-100 dark:bg-white/[0.03] px-3 py-1.5 rounded-md border border-neutral-200 dark:border-white/[0.08] w-fit">
                <Mail className="h-3.5 w-3.5" />
                Connectivity Hub
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Let's Connect
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed font-normal">
                I'm always open to discussing internships, collaborations, interesting projects, or simply connecting with fellow developers.
              </p>
            </div>
            
            <div className="pt-6 border-t border-neutral-200 dark:border-white/[0.06] hidden lg:block">
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                // Form interactions trigger secure asynchronous API endpoints.
              </p>
            </div>
          </div>

          {/* Right Side: Clean, Solid Form Base Layout */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-2xl relative overflow-hidden transition-all duration-300">
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Manjil Dahal"
                    className={`w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-all ${
                      errors.name ? "border-red-500 focus:border-red-500/60" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. manjil.creates@gmail.com"
                    className={`w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-all ${
                      errors.email ? "border-red-500 focus:border-red-500/60" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[11px] font-semibold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can I help you?"
                  className={`w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-all ${
                    errors.subject ? "border-red-500 focus:border-red-500/60" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
                  Message Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell me more about your project goals..."
                  className={`w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-all resize-none ${
                    errors.message ? "border-red-500 focus:border-red-500/60" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Dynamic Theme Interactive Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-all font-semibold rounded-lg text-sm focus:outline-none cursor-pointer group/btn shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Notification Boxes */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 relative z-10"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-sm text-left">
                    <h4 className="font-bold">Message sent successfully!</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                      I'll get back to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 flex items-start gap-3 relative z-10"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-sm text-left">
                    <h4 className="font-bold">Failed to send message</h4>
                    <p className="opacity-80 mt-1">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </PageFade>
  );
}