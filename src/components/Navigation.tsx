
import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme, isTransitioning } = useTheme();

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.team'), href: '#team' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-black/80 border-purple-500/20' 
          : 'bg-white/90 border-orange-200 text-gray-800'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className={`text-2xl font-bold bg-gradient-to-r ${
              isDarkMode 
                ? 'from-purple-400 to-pink-400' 
                : 'from-orange-500 to-red-500'
            } bg-clip-text text-transparent`}
            whileHover={{ scale: 1.05 }}
          >
            {t('hero.title')}
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`transition-all duration-500 relative group ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-orange-500 to-red-500'
                } group-hover:w-full transition-all duration-300`}></span>
              </motion.a>
            ))}
            
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                disabled={isTransitioning}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-500 relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white ${isTransitioning ? 'animate-pulse' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-cyan-600 hover:bg-cyan-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white flex items-center gap-1`}
              >
                <Globe size={16} />
                <span className="text-sm">{language.toUpperCase()}</span>
              </motion.button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              disabled={isTransitioning}
              className={`p-2 ${isTransitioning ? 'animate-pulse' : ''}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLanguage} className="p-2">
              <Globe size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-md transition-all duration-500 ${
              isDarkMode ? 'bg-black/90' : 'bg-white/90'
            }`}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-2 transition-all duration-500 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
