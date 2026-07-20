import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppRoutes from '@/routes';
import Layout from '@/components/Layout';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Layout theme={theme}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main" className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Layout>
    </BrowserRouter>
  );
}