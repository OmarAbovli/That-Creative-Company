
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PlanetBackground from '@/components/3d/PlanetBackground';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="home" 
      className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-black to-blue-900' 
          : 'bg-gradient-to-br from-blue-200 via-yellow-100 to-orange-200'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <PlanetBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-400 via-purple-400 to-pink-600' 
              : 'from-orange-500 via-red-500 to-pink-500'
          } bg-clip-text text-transparent`}
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`text-xl md:text-2xl mb-8 leading-relaxed transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/project-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50'
            }`}
          >
            {t('hero.startProject')}
          </motion.a>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode 
                ? 'border border-blue-500 text-white hover:bg-blue-500/10' 
                : 'border border-orange-500 text-gray-700 hover:bg-orange-500/10'
            }`}
          >
            {t('hero.exploreWork')}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-1000 ${
            isDarkMode ? 'border-white/30' : 'border-gray-600/30'
          }`}
        >
          <div className={`w-1 h-3 rounded-full mt-2 transition-colors duration-1000 ${
            isDarkMode ? 'bg-white/60' : 'bg-gray-600/60'
          }`}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
