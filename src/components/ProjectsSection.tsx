
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';
import ProjectModal, { ProjectData } from './ProjectModal';

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
      <meshStandardMaterial color="#0082FF" wireframe />
    </mesh>
  );
};

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      title: "Competooo",
      category: "EdTech Platform",
      shortDescription: "Interactive English learning platform for high school students with live sessions and gamification.",
      fullDescription: "Competooo is a comprehensive educational platform designed for 1st, 2nd, and 3rd secondary high school students. It transforms English learning into an engaging experience through gamified lessons, daily streaks, exams, and live interactive sessions with teachers.",
      problem: "Traditional learning methods often fail to engage high school students, leading to low retention and motivation. Students needed a platform that speaks their language—fun, competitive, and accessible anywhere.",
      solution: "We built a React-based platform featuring a vibrant dark mode UI, real-time quizzes, and a comprehensive dashboard for tracking progress. The system supports video lessons, PDF materials, and live streaming integration.",
      image: "/projects/competooo-landing.png",
      gallery: [
        "/projects/competooo-dashboard.png",
        "/projects/competooo-landing.png"
      ],
      technologies: ['React', 'Vercel', 'Tailwind CSS', 'Interactive UI'],
      demoUrl: 'https://competooo.vercel.app/',
      githubUrl: 'https://github.com/OmarAbovli/EL-helal',
      demoCredentials: {
        username: 'omarabovli',
        password: '123123'
      }
    },
    {
      title: "Sahl ERP",
      category: "Enterprise System",
      shortDescription: "Comprehensive ERP system for company management, accounting, and CRM.",
      fullDescription: "Sahl ERP is a powerful business management suite that streamlines operations for companies. It integrates accounting, HR, CRM, and inventory management into a single, unified dashboard with real-time analytics.",
      problem: "Managing disconnected systems for accounting, customer relations, and HR leads to data silos and inefficiency. Companies needed a unified 'Source of Truth'.",
      solution: "We developed a modular ERP system with a dashboard-first approach. Key features include automated financial reporting, employee management, and a robust CRM for tracking sales pipelines.",
      image: "/projects/sahl-dashboard.png",
      gallery: [
        "/projects/sahl-dashboard.png"
      ],
      technologies: ['React', 'ERP Architecture', 'CRM', 'Data Visualization'],
      demoUrl: 'https://sahl-demo.vercel.app/',
      githubUrl: 'https://github.com/OmarAbovli/Sahl-v3',
      demoCredentials: {
        username: 'abdelazizmahmoudadmin280',
        password: '321321'
      }
    },
    {
      title: "Bee Group",
      category: "Corporate Website",
      shortDescription: "Modern corporate presence for a leading pharmaceutical company.",
      fullDescription: "A professional corporate website for Bee Group, a pharmaceutical company active in the Egyptian market since 2018. The site showcases their medical products, vision, and market presence with a clean, trustworthy aesthetic.",
      problem: "The company needed a digital presence that reflected their innovative approach to medicine and established trust with partners and patients.",
      solution: "We designed a clean, medical-themed website with golden touches to reflect quality. It features detailed product catalogs, company history, and easy contact channels.",
      image: "/projects/bee-group-landing.png",
      gallery: [
        "/projects/bee-group-landing.png"
      ],
      technologies: ['React', 'Corporate Design', 'Responsive Web'],
      demoUrl: 'https://bee-group.vercel.app/',
      githubUrl: 'https://github.com/OmarAbovli/BEE-GROUP'
    },
    {
      title: "Center Man Sys",
      category: "Management System",
      shortDescription: "Attendance and grading system for educational centers with WhatsApp reporting.",
      fullDescription: "A specialized management system for educational centers to track student attendance, grades, and performance. It automates administrative tasks and keeps parents informed through automated reporting.",
      problem: "Manual attendance taking and reporting is time-consuming and error-prone for busy educational centers.",
      solution: "We built an automated system that tracks attendance via unique IDs, records quiz grades, and automatically sends performance reports to parents via WhatsApp, ensuring seamless communication.",
      image: "/projects/center-man-sys.png",
      gallery: [
        "/projects/center-man-sys.png"
      ],
      technologies: ['Attendance Tracking', 'WhatsApp Integration', 'Grading System'],
      demoUrl: '#',
      githubUrl: 'https://github.com/OmarAbovli/center-man-sys'
    }
  ];

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
            <motion.div
              key={index}
              layoutId={`project-card-${index}`}
              onClick={() => setSelectedProject(project)}
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
                  alt={project.title}
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
          ))}
        </div>
      </div>

      {/* MODAL */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;
