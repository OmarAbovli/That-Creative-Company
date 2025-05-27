
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Github, Linkedin, compass } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const FloatingCylinder = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

const TeamSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  const teamMembers = [
    {
      name: 'OMAR ABOALI',
      role: 'Full Stack Developer&Mobile Developer',
      expertise: 'React, Node.js, Database Design, flutter, react native, laravel php, , Python',
      social: {
        github: 'https://github.com/OmarAbovli',
        linkedin: 'https://www.linkedin.com/in/omar-abovli-3652b1263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        compass: 'https://portofolio-five-green.vercel.app/'
      }
    },
    {
      name: 'ABDULLAH AFIFI',
      role: 'Backend Developer',
      expertise: 'React, nextjs, nodejs,angularjs 1 ',
      social: {
        github: 'https://github.com/Abdalloafifi',
        linkedin: '#',
        compass: 'https://portfolio-ee95e.web.app/'
      }
    },
    {
      name: 'MOHAMED SELEM',
      role: 'Frontend Developer',
      expertise: 'Creative , UI/UX Design, graphic designer',
      social: {
        github: 'https://github.com/selim-hm',
        linkedin: 'https://www.linkedin.com/in/mohamed-selim-31a118331',
        compass: 'https://portfolio-selims-projects-c65def77.vercel.app/#'
      }
    },
    {
      name: 'MOHAMED HANAFI',
      role: 'Full Stack Developer',
      expertise: 'React, Next.js, node.js',
      social: {
        github: '',
        linkedin: '#',
        compass: 'https://www.princehamo.com/'
      }
    }
  ];

  return (
    <section 
      id="team" 
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-green-900/10 to-black' 
          : 'bg-gradient-to-b from-orange-50 via-yellow-100 to-blue-50'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
            <pointLight position={[10, 10, 10]} color={isDarkMode ? "#10b981" : "#f97316"} />
            <FloatingCylinder position={[-5, 3, 0]} color={isDarkMode ? "#10b981" : "#f97316"} />
            <FloatingCylinder position={[5, -2, 0]} color={isDarkMode ? "#06b6d4" : "#ef4444"} />
            <FloatingCylinder position={[-3, -4, 0]} color={isDarkMode ? "#8b5cf6" : "#8b5cf6"} />
            <FloatingCylinder position={[4, 4, 0]} color={isDarkMode ? "#ec4899" : "#ec4899"} />
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
              ? 'from-green-400 to-blue-400' 
              : 'from-orange-500 to-red-500'
          } bg-clip-text text-transparent`}>
            فريقنا المتميز
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            نجتمع معًا لتحويل أفكارك إلى واقع رقمي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className={`backdrop-blur-sm border rounded-2xl p-6 text-center transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-900/50 to-green-900/20 border-green-500/20 hover:border-green-400/40'
                  : 'bg-gradient-to-br from-white/80 to-orange-100/30 border-orange-200/40 hover:border-orange-300/60'
              }`}>
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className={`w-full h-full rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/30 group-hover:border-green-400/60'
                      : 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 group-hover:border-orange-400/60'
                  }`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-green-400 to-blue-400'
                        : 'bg-gradient-to-br from-orange-400 to-red-400'
                    }`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-t from-green-500/20 to-transparent'
                      : 'bg-gradient-to-t from-orange-500/20 to-transparent'
                  }`}></div>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-green-300'
                    : 'text-gray-900 group-hover:text-orange-600'
                }`}>
                  {member.name}
                </h3>
                <p className={`font-medium mb-2 ${
                  isDarkMode ? 'text-green-300' : 'text-orange-600'
                }`}>
                  {member.role}
                </p>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {member.expertise}
                </p>
                
                <div className="flex justify-center gap-4">
                  <motion.a
                    href={member.social.github}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-300'
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                  >
                    <Twitter size={20} />
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

export default TeamSection;
