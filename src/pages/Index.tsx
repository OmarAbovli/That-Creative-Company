
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen overflow-x-hidden transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-orange-50 to-blue-50 text-gray-900'
    }`}>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
};

export default Index;
