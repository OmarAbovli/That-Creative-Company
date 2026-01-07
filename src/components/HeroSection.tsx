
import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
// Note: Canvas is now global in Index.tsx, so we don't import it here to avoid duplication/overhead

const HeroSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Parallax for hero content (slightly faster than background)
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <motion.div
        style={{ y: heroY }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          // ULTRA TRANSPARENT GLASS CARD to show Earth behind as requested
          className="rounded-3xl p-12 md:p-24 relative overflow-hidden group border border-white/10 shadow-[0_0_50px_rgba(0,149,255,0.05)] bg-[#000B2B]/10 backdrop-blur-[2px]"
        >
          {/* Subtle Internal Glow Effect */}
          <div className="absolute -inset-24 bg-blue-500/5 blur-[120px] rounded-full group-hover:bg-blue-400/10 transition-all duration-1000" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`text-7xl md:text-9xl font-black mb-8 tracking-tighter bg-clip-text text-transparent leading-relaxed py-6 filter ${isDarkMode
              ? 'bg-gradient-to-b from-white via-blue-50 to-blue-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]'
              : 'bg-gradient-to-b from-blue-950 via-blue-800 to-slate-900 drop-shadow-lg'
              }`}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium tracking-wide transition-colors duration-1000 ${isDarkMode ? 'text-blue-100/90' : 'text-slate-700 font-semibold'
              }`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center relative z-20"
          >
            <motion.a
              href="/project-form"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,149,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-2xl font-black transition-all duration-300 bg-[#0082FF] text-white shadow-lg shadow-[#0082FF]/30 uppercase tracking-widest text-sm hover:bg-[#01ECFF] hover:text-[#000B2B]"
            >
              {t('hero.startProject')}
            </motion.a>
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`px-12 py-6 rounded-2xl font-black transition-all duration-300 border-2 uppercase tracking-widest text-sm ${isDarkMode
                ? 'border-blue-500/30 text-blue-100 hover:bg-blue-500/10 hover:border-blue-400'
                : 'border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-400'
                }`}
            >
              {t('hero.exploreWork')}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 select-none pointer-events-none z-20">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className={`flex flex-col items-center gap-4 opacity-90 ${isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
        >
          <span className="text-xs uppercase font-bold tracking-[0.3em] drop-shadow-md">Scroll to Discover</span>
          <div className={`w-px h-24 ${isDarkMode ? 'bg-gradient-to-b from-[#0082FF] to-transparent' : 'bg-gradient-to-b from-slate-900 to-transparent'}`} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
