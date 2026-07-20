import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check local storage or default directly to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Defaulting to dark as the ultimate base system architecture fallback
    return 'dark';
  });

  const [transitionState, setTransitionState] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 2. Synchronize with the swapped global CSS layers
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (transitionState) return; // Prevent layout calculation collisions
    
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTransitionState(nextTheme === 'dark' ? 'to-dark' : 'to-light');
    
    // Toggle theme state precisely at the curtain's peak mid-fold overlap (550ms)
    setTimeout(() => {
      setTheme(nextTheme);
    }, 550);

    // Reset transition flag completely when the layout clears view (1300ms)
    setTimeout(() => {
      setTransitionState(null);
    }, 1300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', transitionState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}