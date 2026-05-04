
import React, { useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { projects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlanetBackground from '@/components/3d/PlanetBackground';
import useSEO from '@/hooks/useSEO';
import { 
  ArrowLeft, 
  Code2, 
  Database, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useSEO({
    title: project ? `${project.title} | Ivory Tech Case Study` : 'Project Not Found',
    description: project?.shortDescription,
    keywords: project ? `${project.title}, ${project.category}, Ivory Tech Project, omarabovli` : undefined,
    image: project?.image
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-500 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -400]);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-all duration-1000 ${
      isDarkMode ? 'text-white' : 'text-slate-900'
    }`}>
      
      {/* Background */}
      <motion.div
        style={{ y: backgroundY }}
        className={`fixed inset-0 z-0 pointer-events-auto transition-colors duration-1000 ${
          isDarkMode ? 'bg-[#000B2B]' : 'bg-slate-50'
        }`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <PlanetBackground />
          </Suspense>
        </Canvas>
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isDarkMode ? 'bg-[#000B2B]/20' : 'bg-white/70'
        }`} />
      </motion.div>

      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 mb-8 font-bold transition-colors ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ArrowLeft size={20} />
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`text-sm font-black uppercase tracking-[0.3em] mb-4 block ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              {project.title}
            </h1>
            
            <p className={`text-xl mb-12 leading-relaxed font-medium ${
              isDarkMode ? 'text-blue-100/80' : 'text-slate-700'
            }`}>
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {project.technologies.map((tech, i) => (
                <span key={i} className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                  isDarkMode 
                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-200' 
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}>
                  {tech}
                </span>
              ))}
            </div>

            {project.demoUrl && project.demoUrl !== '#' && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0082FF] text-white font-black hover:bg-[#01ECFF] hover:text-[#000B2B] transition-all duration-300 shadow-xl shadow-blue-500/20"
              >
                Visit Live Project <ExternalLink size={20} />
              </a>
            )}
          </motion.div>

          {/* Right Column: Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className={`rounded-3xl overflow-hidden border shadow-2xl ${
              isDarkMode ? 'border-white/10' : 'border-slate-200'
            }`}>
              <img src={project.image} alt={project.title} className="w-full h-auto" />
            </div>
            
            {/* Abstract floating elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-32 space-y-32">
          
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-10 rounded-3xl border backdrop-blur-md ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4 mb-6 text-red-500">
                <AlertCircle size={32} />
                <h2 className="text-3xl font-black">The Problem</h2>
              </div>
              <p className="text-lg leading-relaxed opacity-80 font-medium">
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-10 rounded-3xl border backdrop-blur-md ${
                isDarkMode ? 'bg-[#0082FF]/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center gap-4 mb-6 text-emerald-500">
                <CheckCircle2 size={32} />
                <h2 className="text-3xl font-black">The Solution</h2>
              </div>
              <p className="text-lg leading-relaxed opacity-80 font-medium">
                {project.solution}
              </p>
            </motion.div>
          </div>

          {/* Technical Deep Dive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`p-12 rounded-[3rem] border relative overflow-hidden ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Cpu size={200} />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400">
                  <Code2 size={40} />
                </div>
                <h2 className="text-4xl font-black">Technical Overview</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-xl leading-relaxed opacity-80 font-medium">
                    {project.technicalDetails}
                  </p>
                  
                  {project.dataStructure && (
                    <div className="pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3 mb-4 text-blue-400">
                        <Database size={24} />
                        <h3 className="text-2xl font-bold">Data Architecture</h3>
                      </div>
                      <p className="opacity-70 font-medium">
                        {project.dataStructure}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers size={24} className="text-blue-400" />
                    <h3 className="text-2xl font-bold">Key Features</h3>
                  </div>
                  <ul className="space-y-4">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
                        <span className="opacity-80 font-bold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`rounded-3xl overflow-hidden border ${
                      isDarkMode ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt={`${project.title} screenshot ${i+1}`} className="w-full h-auto hover:scale-105 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
