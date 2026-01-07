import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme, isTransitioning } = useTheme();

  const navItems = [
    { name: 'nav.home', href: '#home' },
    { name: 'nav.services', href: '#services' },
    { name: 'nav.projects', href: '#projects' },
    { name: 'nav.team', href: '#team' },
    { name: 'nav.contact', href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        // FIXED: 'left-0 right-0 mx-auto' centers the element relative to the viewport width.
        // We explicitly set 'dir="ltr"' to prevent the flux-layout from flipping under RTL body.
        className="fixed top-6 left-0 right-0 mx-auto z-50 w-[95%] md:w-[85%] max-w-7xl h-20 rounded-2xl transition-all duration-500"
        dir="ltr"
      >
        {/* Deep Blue Glass Background - More Transparent */}
        <div className={`absolute inset-0 rounded-2xl backdrop-blur-md border shadow-[0_0_30px_rgba(0,11,43,0.3)] ${isDarkMode
            ? 'bg-[#000B2B]/50 border-[#0082FF]/30'
            : 'bg-white/90 border-slate-200'
          }`} />

        <div className="relative z-10 flex justify-between items-center w-full h-full px-6 md:px-8">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          {/* Inner container handles RTL/LTR switching for the menu items themselves */}
          <div className="hidden md:flex items-center gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${isDarkMode ? 'text-gray-300 hover:text-[#0082FF]' : 'text-gray-600 hover:text-[#0082FF]'
                  }`}
              >
                {t(item.name)}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#0082FF] group-hover:w-full transition-all duration-300" />
                {/* Glow effect on hover */}
                <span className="absolute inset-0 bg-[#0082FF]/0 group-hover:bg-[#0082FF]/5 blur-md transition-all duration-300 rounded-lg -z-10" />
              </a>
            ))}

            {/* Controls */}
            <div className="flex items-center gap-3 px-4 border-l border-white/10 mx-2">
              <button
                onClick={toggleTheme}
                disabled={isTransitioning}
                className="p-2 rounded-full bg-white/5 hover:bg-[#0082FF]/20 text-[#0082FF] transition-all hover:scale-110"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-full bg-[#0082FF] hover:bg-[#01ECFF] text-white text-xs font-black transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,130,255,0.4)]"
              >
                {language.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-28 left-4 right-4 z-40 md:hidden"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="bg-[#000B2B]/95 backdrop-blur-xl border border-[#0082FF]/30 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-[#0082FF]/10 text-gray-200 hover:text-[#0082FF] transition-all"
                  >
                    <span className="font-bold text-lg">{t(item.name)}</span>
                    <ArrowRight size={16} className={`text-[#0082FF] ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </a>
                ))}

                <div className="h-px bg-white/10 my-2" />

                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm text-gray-400">{t('nav.settings')}</div>
                  <div className="flex gap-3">
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg bg-white/5 text-[#0082FF]"
                    >
                      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                      onClick={toggleLanguage}
                      className="px-4 py-2 rounded-lg bg-[#0082FF] text-white font-bold text-xs"
                    >
                      {language === 'en' ? 'العربية' : 'English'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
