
import React from 'react';
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
import { useState, Suspense } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';

const Index = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Parallax effect for 3D background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -400]); // Moves slower than scroll

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-all duration-1000 bg-transparent ${isDarkMode
      ? 'text-white'
      : 'text-slate-900'
      }`}>

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* GLOBAL FIXED 3D BACKGROUND WITH PARALLAX */}
      {/* Moving the background COLOR here so it sits with the canvas */}
      <motion.div
        style={{ y: backgroundY }}
        className={`fixed inset-0 z-0 pointer-events-auto transition-colors duration-1000 ${isDarkMode
          ? 'bg-[#000B2B]'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50' // Clean Ivory/Tech Light Mode
          }`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <PlanetBackground />
          </Suspense>
        </Canvas>
        {/* Overlay gradient to ensure text readability */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'bg-[#000B2B]/10' : 'bg-white/60'
          }`} />
      </motion.div>

      <Navigation />
      <ScrollProgressBar />

      {/* Main Content Area - z-10 to sit above the fixed background */}
      <main className="relative z-10 w-full pointer-events-none">
        {/* Enable pointer events only for interactive children */}
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
