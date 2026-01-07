
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const TeamSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();

  const teamMembers = [
    {
      name: 'OMAR ABOALI',
      role: 'Full Stack Developer',
      expertise: 'React, Node.js, Database Design, flutter, react native, laravel php, Python',
      image: '/team/omarabovli.jpg',
      social: {
        github: 'https://github.com/OmarAbovli',
        linkedin: 'https://www.linkedin.com/in/omar-abovli-3652b1263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        twitter: 'https://portofolio-five-green.vercel.app/'
      }
    },
    {
      name: 'ABDULLAH AFIFI',
      role: 'Backend Developer',
      expertise: 'React, nextjs, nodejs, angularjs',
      image: '/team/ABDULLAH-AFIFI.jpg',
      social: {
        github: 'https://github.com/Abdalloafifi',
        linkedin: '#',
        twitter: 'https://portfolio-ee95e.web.app/'
      }
    },
    {
      name: 'MOHAMED SELEM',
      role: 'Frontend Developer',
      expertise: 'UI/UX Design, graphic designer',
      image: '/team/MOHAMED-SELEM.jpg',
      social: {
        github: 'https://github.com/selim-hm',
        linkedin: 'https://www.linkedin.com/in/mohamed-selim-31a118331',
        twitter: 'https://portfolio-selims-projects-c65def77.vercel.app/#'
      }
    },
    {
      name: 'MOHAMED HANAFI',
      role: 'Full Stack Developer',
      expertise: 'React, Next.js, Node.js',
      image: '/team/MOHAMED-HANAFI.jpg',
      social: {
        github: '',
        linkedin: '#',
        twitter: 'https://www.princehamo.com/'
      }
    },
    {
      name: 'ABDELAZIZ MAHMOUD',
      role: 'Professional Graphic Designer',
      expertise: 'Branding, UI/UX, Visual Identity, Motion Graphics',
      image: '/team/ABDELAZIZ-MAHMOUD.png',
      social: {
        twitter: 'https://Behance.net/ezzdat'
      }
    }
  ];

  return (
    <section
      id="team"
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode
        ? 'bg-transparent'
        : 'bg-gray-50'
        }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 -z-10 ${isDarkMode ? 'bg-[#000B2B]/60' : 'bg-white/50'
        }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r ${isDarkMode
            ? 'from-white via-blue-100 to-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
            : 'from-blue-900 via-slate-800 to-blue-900'
            } bg-clip-text text-transparent`}>
            {t('nav.team')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-gray-600'
            }`}>
            Experts turning your ideas into digital reality
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
              <div className={`backdrop-blur-md border rounded-2xl p-6 text-center transition-all duration-300 ${isDarkMode
                ? 'bg-[#000B2B]/40 border-[#0082FF]/30 hover:border-[#01ECFF]/60 hover:shadow-[0_0_30px_rgba(0,130,255,0.2)]'
                : 'bg-white border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-xl'
                }`}>
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className={`w-full h-full rounded-full overflow-hidden border-2 transition-all duration-300 ${isDarkMode
                    ? 'border-[#0082FF] group-hover:border-[#01ECFF] group-hover:shadow-[0_0_20px_rgba(1,236,255,0.3)]'
                    : 'border-blue-200 group-hover:border-blue-400 group-hover:shadow-xl'
                    }`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode
                  ? 'text-white group-hover:text-[#01ECFF]'
                  : 'text-gray-900 group-hover:text-blue-700'
                  }`}>
                  {member.name}
                </h3>
                <p className={`font-medium mb-2 ${isDarkMode ? 'text-[#0082FF]' : 'text-blue-600'
                  }`}>
                  {member.role}
                </p>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-blue-200/60' : 'text-gray-500'
                  }`}>
                  {member.expertise}
                </p>

                <div className="flex gap-4 justify-center">
                  {Object.entries(member.social).map(([platform, url]) => {
                    const icons = {
                      github: Github,
                      linkedin: Linkedin,
                      twitter: Globe,
                    };
                    const Icon = icons[platform as keyof typeof icons];

                    if (!url || url === '#' || !Icon) return null;

                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                          ? 'bg-[#0082FF]/20 hover:bg-[#0082FF]/40 text-[#01ECFF]'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                          }`}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
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
