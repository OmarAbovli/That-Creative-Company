
import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

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
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'bg-transparent' : 'bg-gray-50'
        }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      {/* Deep Blue Global Tint for consistency */}
      <div className={`absolute inset-0 transition-opacity duration-1000 -z-10 ${isDarkMode ? 'bg-[#000B2B]/80' : 'bg-blue-50/50'
        }`} />

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
          <h2 className={`text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent ${isDarkMode
            ? 'bg-gradient-to-r from-white via-blue-100 to-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
            : 'bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900'
            }`}>
            {t('services.title')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-blue-900/80'
            }`}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
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
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* BRANDED GLASS CARD - No more purple/pink */}
              <div className={`backdrop-blur-md border rounded-2xl p-6 h-full transition-all duration-500 shadow-lg ${isDarkMode
                ? 'bg-[#000B2B]/40 border-[#0082FF]/30 hover:border-[#01ECFF]/60 hover:shadow-[0_0_30px_rgba(0,130,255,0.2)]'
                : 'bg-white/60 border-blue-200 hover:border-blue-400'
                }`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${isDarkMode
                    ? 'bg-gradient-to-r from-[#0082FF] to-[#01ECFF] shadow-[0_0_20px_rgba(0,130,255,0.4)]'
                    : 'bg-blue-100 text-blue-600'
                    }`}>
                    <service.icon size={32} className={isDarkMode ? "text-white" : "text-[#0082FF]"} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#000B2B]'
                    }`}>{service.title}</h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-blue-100/70' : 'text-blue-900/70'
                    }`}>{service.description}</p>
                </div>

                <div className="space-y-2">
                  {service.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.15 + skillIndex * 0.05,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      viewport={{ once: true }}
                      className={`text-xs px-3 py-1 rounded-lg border transition-all duration-300 ${isDarkMode
                        ? 'bg-[#0082FF]/10 border-[#0082FF]/30 text-blue-200'
                        : 'bg-blue-50 border-blue-200 text-blue-800'
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
