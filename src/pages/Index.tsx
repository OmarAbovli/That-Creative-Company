
import React, { useState, Suspense, useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/contexts/ThemeContext';
import PlanetBackground from '@/components/3d/PlanetBackground';
import { Canvas } from '@react-three/fiber';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import useSEO from '@/hooks/useSEO';


const Index = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isLoading, location.hash]);

  // Parallax effect for 3D background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -400]);

  useSEO({});

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-all duration-1000 bg-transparent ${isDarkMode
      ? 'text-white'
      : 'text-slate-900'
      }`}>

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* GLOBAL FIXED 3D BACKGROUND WITH PARALLAX */}
      <motion.div
        style={{ y: backgroundY }}
        className={`fixed inset-0 z-0 pointer-events-auto transition-colors duration-1000 ${isDarkMode
          ? 'bg-[#000B2B]'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
          }`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <PlanetBackground />
          </Suspense>
        </Canvas>
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'bg-[#000B2B]/10' : 'bg-white/60'
          }`} />
      </motion.div>

      <Navigation />
      <ScrollProgressBar />

      {/* Main Content Area */}
      <main className="relative z-10 w-full pointer-events-none">
        <div className="pointer-events-auto">
          <HeroSection />

          <ServicesSection />
          <ProjectsSection />
          <TestimonialsSection />
          <StatsSection />
          <TeamSection />
          <ContactSection />
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
