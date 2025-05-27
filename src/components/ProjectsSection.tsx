
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const AnimatedTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="#ec4899" wireframe />
    </mesh>
  );
};

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  const projects = [
    {
      titleKey: 'projects.ecommerce.title',
      descriptionKey: 'projects.ecommerce.description',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      titleKey: 'projects.project-management.title',
      descriptionKey: 'projects.project-management.description',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      titleKey: 'projects.cms.title',
      descriptionKey: 'projects.cms.description',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      titleKey: 'projects.3d-experience.title',
      descriptionKey: 'projects.3d-experience.description',
      image: '/api/placeholder/400/300',
      technologies: ['Three.js', 'WebGL', 'GSAP'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section 
      id="projects" 
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-blue-900/10 to-black' 
          : 'bg-gradient-to-b from-orange-50 via-yellow-50 to-blue-50'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-blue-900/10 to-black' 
          : 'bg-gradient-to-b from-orange-100/50 via-yellow-100/50 to-blue-100/50'
      }`}></div>
      
      <div className="absolute top-20 right-10 w-64 h-64 opacity-20">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedTorus />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-400 to-purple-400' 
              : 'from-orange-500 to-red-500'
          } bg-clip-text text-transparent`}>
            {t('projects.title')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`group relative backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-900/50 to-purple-900/20 border-purple-500/20 hover:border-purple-400/40' 
                  : 'bg-gradient-to-br from-white/80 to-orange-100/50 border-orange-200 hover:border-orange-400/60'
              }`}
            >
              <div className={`aspect-video relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' 
                  : 'bg-gradient-to-br from-orange-300/30 to-yellow-300/30'
              }`}>
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-t from-black/60 to-transparent' 
                    : 'bg-gradient-to-t from-white/40 to-transparent'
                }`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-80 transition-opacity duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    <ExternalLink size={32} className="text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 group-hover:transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-purple-300' 
                    : 'text-gray-900 group-hover:text-orange-600'
                }`}>
                  {t(project.titleKey)}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed transition-colors duration-1000 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t(project.descriptionKey)}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`rounded-lg px-3 py-1 text-xs border transition-colors duration-1000 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-gray-200 border-purple-500/10' 
                          : 'bg-gradient-to-r from-orange-100/50 to-yellow-100/50 text-gray-700 border-orange-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.a
                    href={project.demoUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/50'
                    }`}
                  >
                    <ExternalLink size={16} />
                    {t('projects.view')}
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDarkMode 
                        ? 'border border-purple-500 text-purple-300 hover:bg-purple-500/10' 
                        : 'border border-orange-500 text-orange-600 hover:bg-orange-500/10'
                    }`}
                  >
                    <Github size={16} />
                    {t('projects.code')}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
