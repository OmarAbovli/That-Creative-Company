
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const FloatingBox = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.2;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const ServicesSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  const services = [
    {
      icon: Globe,
      title: t('services.web.title'),
      description: t('services.web.description'),
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      icon: Smartphone,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      skills: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      icon: Server,
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL']
    },
    {
      icon: Palette,
      title: t('services.3d.title'),
      description: t('services.3d.description'),
      skills: ['Three.js', 'WebGL', 'Blender', 'Unity']
    }
  ];

  return (
    <section 
      id="services" 
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-purple-900/10 to-black'
          : 'bg-gradient-to-b from-orange-50 via-yellow-50 to-blue-50'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-purple-900/10 to-black' 
          : 'bg-gradient-to-b from-white/50 via-yellow-100/30 to-blue-100/50'
      }`}></div>
      
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDarkMode ? 'opacity-30' : 'opacity-20'
      }`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
            <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 1.5} />
            <FloatingBox position={[-4, 2, 0]} color={isDarkMode ? "#8b5cf6" : "#f59e0b"} />
            <FloatingBox position={[4, -2, 0]} color={isDarkMode ? "#ec4899" : "#ef4444"} />
            <FloatingBox position={[-2, -3, 0]} color={isDarkMode ? "#06b6d4" : "#3b82f6"} />
            <FloatingBox position={[3, 3, 0]} color={isDarkMode ? "#10b981" : "#10b981"} />
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
              ? 'from-purple-400 to-pink-400' 
              : 'from-orange-500 to-red-500'
          } bg-clip-text text-transparent`}>
            {t('services.title')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative card-hover"
            >
              <div className={`backdrop-blur-sm border rounded-2xl p-6 h-full transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 hover:border-purple-400/40'
                  : 'bg-gradient-to-br from-white/80 to-orange-50/50 border-orange-200 hover:border-orange-400/60'
              }`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    <service.icon size={32} className="text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{service.title}</h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{service.description}</p>
                </div>
                
                <div className="space-y-2">
                  {service.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                      className={`rounded-lg px-3 py-1 text-sm border transition-all duration-500 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-gray-200 border-purple-500/10'
                          : 'bg-gradient-to-r from-orange-100/80 to-red-100/80 text-gray-700 border-orange-300/30'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
