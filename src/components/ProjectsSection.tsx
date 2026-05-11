
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';
import ProjectModal from './ProjectModal';
import { projects, ProjectData } from '@/data/projects';
import { useNavigate, Link } from 'react-router-dom';

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
      <torusGeometry args={[1, 0.4, 8, 48]} />
      <meshStandardMaterial color="#0082FF" wireframe />
    </mesh>
  );
};

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode
        ? 'bg-transparent'
        : 'bg-white'
        }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode
        ? 'bg-[#000B2B]/60'
        : 'bg-white/80'
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
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r ${isDarkMode
            ? 'from-white via-blue-100 to-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
            : 'from-blue-900 via-slate-800 to-blue-900'
            } bg-clip-text text-transparent`}>
            {t('projects.title')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-gray-700'
            }`}>
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${project.id}`}
              className="block no-underline"
            >
              <motion.div
                layoutId={`project-card-${project.id}`}
                initial={{
                  opacity: 0,
                  y: 60,
                  filter: "blur(8px)",
                  scale: 0.95
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -10 }}
                className={`group relative backdrop-blur-md border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isDarkMode
                  ? 'bg-[#000B2B]/40 border-[#0082FF]/30 hover:border-[#01ECFF]/60 hover:shadow-[0_0_30px_rgba(0,130,255,0.2)]'
                  : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-xl'
                  }`}
              >
                {/* Image Container */}
                <div className={`aspect-video relative overflow-hidden`}>
                  <div className={`absolute inset-0 z-10 ${isDarkMode
                    ? 'bg-gradient-to-t from-[#000B2B]/90 to-transparent'
                    : 'bg-gradient-to-t from-white/20 to-transparent'
                    }`}></div>

                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} solution by Ivory Tech`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`px-6 py-3 rounded-full flex items-center gap-2 font-bold backdrop-blur-md ${isDarkMode
                      ? 'bg-[#0082FF]/80 text-white'
                      : 'bg-white/90 text-blue-600'
                      }`}>
                      <ZoomIn size={18} />
                      View Details
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-2xl font-bold group-hover:transition-colors duration-300 ${isDarkMode
                      ? 'text-white group-hover:text-[#01ECFF]'
                      : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                      {project.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-blue-500/10 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {project.category}
                    </span>
                  </div>

                  <p className={`text-sm mb-4 leading-relaxed line-clamp-2 transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/60' : 'text-gray-600'
                    }`}>
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`rounded-lg px-2 py-1 text-[10px] uppercase font-bold tracking-wider border transition-colors duration-1000 ${isDarkMode
                          ? 'bg-[#0082FF]/10 text-blue-200 border-[#0082FF]/20'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`text-xs px-1 py-1 ${isDarkMode ? 'text-blue-400' : 'text-slate-500'}`}>+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
      </div>

      {/* MODAL */}
      {/* MODAL (Optional fallback or quick view - disabled for now to favor page) */}
      {/* <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> */}
    </section>
  );
};

export default ProjectsSection;
