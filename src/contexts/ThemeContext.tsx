
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Add transition animation class
    document.body.classList.add('theme-transitioning');
    
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove('theme-transitioning');
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    const bodyClass = isDarkMode ? 'dark-theme' : 'light-theme';
    document.body.className = bodyClass;
    
    // Add direction for Arabic support
    document.documentElement.dir = 'auto';
    
    // Apply theme transition animation
    if (isTransitioning) {
      document.body.classList.add('theme-transitioning');
    }
  }, [isDarkMode, isTransitioning]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
