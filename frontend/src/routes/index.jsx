import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainScrollView from '@/pages/MainScrollView';
import Resume from '@/pages/Resume';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainScrollView />} />
      <Route path="/resume" element={<Resume />} />
      
      {/* Redirect old individual routes to section anchors on the home page */}
      <Route path="/about" element={<Navigate to="/#about" replace />} />
      <Route path="/skills" element={<Navigate to="/#skills" replace />} />
      <Route path="/projects" element={<Navigate to="/#projects" replace />} />
      <Route path="/experience" element={<Navigate to="/#experience" replace />} />
      <Route path="/education" element={<Navigate to="/#education" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
