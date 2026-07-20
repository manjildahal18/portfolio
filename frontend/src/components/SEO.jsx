import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_SEO = {
  title: "Developer Portfolio | Full Stack Engineer",
  description: "Senior Full Stack Engineer specializing in high-performance web applications using React, Django, and PostgreSQL.",
  siteUrl: "https://myportfolio.vercel.app", // Fallback URL, update during actual deploy
  defaultImage: "/favicon.svg",
  twitterUsername: "", 
};

export default function SEO({ title, description, image, pathname }) {
  
  const seoTitle = title || DEFAULT_SEO.title; 
  const seoDescription = description || DEFAULT_SEO.description;
  const seoImage = image ? `${DEFAULT_SEO.siteUrl}${image}` : `${DEFAULT_SEO.siteUrl}${DEFAULT_SEO.defaultImage}`;
  const seoUrl = pathname ? `${DEFAULT_SEO.siteUrl}${pathname}` : DEFAULT_SEO.siteUrl;

  return (
    <Helmet>
      {/* General Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="image" content={seoImage} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {DEFAULT_SEO.twitterUsername && <meta name="twitter:creator" content={DEFAULT_SEO.twitterUsername} />}
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
}