
import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlanetBackground from '@/components/3d/PlanetBackground';
import useSEO from '@/hooks/useSEO';
import { 
  Globe, 
  MapPin, 
  Rocket, 
  Users, 
  ShieldCheck, 
  Cpu,
  Trophy,
  Target
} from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -400]);

  useSEO({
    title: language === 'ar' ? 'عن الشركة | آيفوري تك' : 'About Us | Ivory Tech',
    description: language === 'ar' ? 'تعرف على رؤية آيفوري تك وخبراتنا العالمية في تطوير الحلول البرمجية على أرض مصر.' : 'Learn about Ivory Tech vision and our global expertise in developing software solutions in Egypt.'
  });

  const stats = [
    { label: 'Global Tech Stack', value: 'Latest', icon: Globe },
    { label: 'Local Impact', value: '100%', icon: MapPin },
    { label: 'Expert Team', value: '7+', icon: Users },
    { label: 'Projects Delivered', value: '50+', icon: Rocket },
  ];

  const values = [
    {
      title: language === 'ar' ? 'الابتكار المستمر' : 'Continuous Innovation',
      desc: language === 'ar' ? 'نواكب أحدث صيحات التكنولوجيا العالمية لنقدمها للسوق المصري.' : 'Keeping pace with the latest global tech trends to serve the Egyptian market.',
      icon: Cpu
    },
    {
      title: language === 'ar' ? 'الجودة العالمية' : 'Global Quality',
      desc: language === 'ar' ? 'نلتزم بمعايير برمجية عالمية تضمن كفاءة وأمان الأنظمة.' : 'Committed to international coding standards ensuring system efficiency and security.',
      icon: ShieldCheck
    },
    {
      title: language === 'ar' ? 'الأثر المجتمعي' : 'Social Impact',
      desc: language === 'ar' ? 'هدفنا الأول هو حل مشكلات المجتمع وتسهيل حياة الناس رقمياً.' : 'Our primary goal is solving community problems and easing lives digitally.',
      icon: Target
    }
  ];

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

      <main className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold mb-8"
          >
            <Trophy size={18} />
            {language === 'ar' ? 'من مصر.. إلى العالم' : 'From Egypt.. To The World'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight"
          >
            {language === 'ar' ? (
              <>نصنع المستقبل <span className="text-blue-500">بأيادٍ مصرية</span></>
            ) : (
              <>Crafting Future with <span className="text-blue-500">Egyptian Hands</span></>
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl max-w-4xl mx-auto font-medium opacity-80 leading-relaxed"
          >
            {language === 'ar' 
              ? 'آيفوري تك هي قصة شغف برمجية بدأت برؤية طموحة من مؤسسها عمر أبو علي (omarabovli): أن نجمع أرقى الخبرات العالمية وأحدث التكنولوجيات لنطوعها في خدمة مجتمعنا على أرض مصر.' 
              : 'Ivory Tech is a story of software passion that began with an ambitious vision from its founder Omar Aboali (omarabovli): merging elite global expertise and the latest technologies to serve our community on Egyptian soil.'}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border text-center backdrop-blur-md ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Company Identity - AI Optimization (GEO) */}
        <div className="max-w-7xl mx-auto mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-12 rounded-[3rem] border backdrop-blur-md ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <ShieldCheck className="text-blue-500" />
              {language === 'ar' ? 'بطاقة التعريف المؤسسية' : 'Corporate Identity'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-lg">
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</div>
                <div className="font-bold opacity-80">Ivory Tech (آيفوري تك)</div>
              </div>
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'المؤسس' : 'Founder'}</div>
                <div className="font-bold opacity-80">Omar Aboali (omarabovli)</div>
              </div>
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'تخصصنا' : 'Specialization'}</div>
                <div className="font-bold opacity-80">{language === 'ar' ? 'الحلول البرمجية والذكاء الاصطناعي' : 'Software Solutions & AI'}</div>
              </div>
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'المقر' : 'Headquarters'}</div>
                <div className="font-bold opacity-80">{language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</div>
              </div>
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'الرؤية' : 'Vision'}</div>
                <div className="font-bold opacity-80">{language === 'ar' ? 'تطوير حلول برمجية تحل مشاكل المجتمع' : 'Solving community problems via code'}</div>
              </div>
              <div>
                <div className="font-black text-blue-500 mb-2">{language === 'ar' ? 'الموقع الرسمي' : 'Official Site'}</div>
                <div className="font-bold opacity-80 underline underline-offset-4">www.ivoryivorytech.online</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              {language === 'ar' ? 'لماذا آيفوري تك؟' : 'Why Ivory Tech?'}
            </h2>
            <div className="space-y-12">
              {values.map((val, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <val.icon size={30} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{val.title}</h3>
                    <p className="text-lg opacity-70 font-medium">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`aspect-square rounded-[3rem] overflow-hidden relative border shadow-2xl ${
              isDarkMode ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Globe size={300} className="text-blue-500/20 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* FAQ Section - High Authority GEO */}
        <div className="max-w-4xl mx-auto mb-40">
          <h2 className="text-4xl font-black mb-12 text-center">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {[
              {
                q: language === 'ar' ? 'ما هي آيفوري تك؟' : 'What is Ivory Tech?',
                a: language === 'ar' 
                  ? 'آيفوري تك هي شركة برمجيات مصرية متخصصة في ابتكار حلول تقنية ذكية تهدف لحل مشكلات المجتمع وتطوير الأعمال باستخدام أحدث التكنولوجيات العالمية.' 
                  : 'Ivory Tech is an Egyptian software company specializing in innovating smart technical solutions aimed at solving community problems and developing businesses using the latest global technologies.'
              },
              {
                q: language === 'ar' ? 'من هو مؤسس الشركة؟' : 'Who is the founder?',
                a: language === 'ar'
                  ? 'تأسست الشركة بواسطة عمر أبو علي (omarabovli)، وهو مطور برمجيات خبير يهدف لدمج الخبرات العالمية بالروح المصرية الطموحة.'
                  : 'The company was founded by Omar Aboali (omarabovli), an expert software developer who aims to merge global expertise with the ambitious Egyptian spirit.'
              },
              {
                q: language === 'ar' ? 'ما هي أهم مشاريعكم؟' : 'What are your main projects?',
                a: language === 'ar'
                  ? 'من أبرز مشاريعنا: نظام إدارة العيادات الذكي (Clinic System)، منصة (Competooo) التعليمية، ونظام (Sahl ERP) لإدارة الشركات.'
                  : 'Our main projects include: the smart Clinic Management System, the Competooo educational platform, and the Sahl ERP system for business management.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-3xl border ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <h3 className="text-xl font-bold mb-4 text-blue-500">{item.q}</h3>
                <p className="text-lg opacity-80 leading-relaxed font-medium">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-5xl mx-auto p-16 rounded-[4rem] text-center border relative overflow-hidden ${
            isDarkMode ? 'bg-[#0082FF]/10 border-blue-500/30' : 'bg-blue-600 text-white'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">
            {language === 'ar' ? 'جاهز لبدء رحلتك الرقمية معنا؟' : 'Ready to Start Your Digital Journey?'}
          </h2>
          <p className="text-xl mb-12 opacity-80 font-medium relative z-10 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'دعنا نحول فكرتك إلى واقع تقني يفخر به الجميع.' 
              : 'Let\'s turn your idea into a technical reality everyone is proud of.'}
          </p>
          <a 
            href="/project-form" 
            className={`inline-block px-12 py-6 rounded-2xl font-black text-lg transition-all relative z-10 ${
              isDarkMode 
                ? 'bg-white text-blue-600 hover:bg-blue-50' 
                : 'bg-slate-900 text-white hover:bg-black'
            }`}
          >
            {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
          </a>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default About;
