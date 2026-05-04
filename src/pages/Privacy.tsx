
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import useSEO from '@/hooks/useSEO';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  useSEO({
    title: language === 'ar' ? 'سياسة الخصوصية | آيفوري تك' : 'Privacy Policy | Ivory Tech',
    description: language === 'ar' ? 'التزامنا بحماية بياناتكم وخصوصيتكم في آيفوري تك.' : 'Our commitment to protecting your data and privacy at Ivory Tech.'
  });

  const sections = [
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'حماية البيانات' : 'Data Protection',
      content: language === 'ar' 
        ? 'نحن نأخذ خصوصيتك على محمل الجد. يتم تشفير جميع البيانات الشخصية وتخزينها بشكل آمن وفقاً للمعايير العالمية.'
        : 'We take your privacy seriously. All personal data is encrypted and stored securely according to international standards.'
    },
    {
      icon: Lock,
      title: language === 'ar' ? 'الأمن التقني' : 'Technical Security',
      content: language === 'ar'
        ? 'نستخدم أحدث تقنيات الأمان لحماية أنظمتنا ومشاريع عملائنا من أي وصول غير مصرح به.'
        : 'We use the latest security technologies to protect our systems and our clients\' projects from unauthorized access.'
    },
    {
      icon: Eye,
      title: language === 'ar' ? 'الشفافية' : 'Transparency',
      content: language === 'ar'
        ? 'نحن شفافون بشأن البيانات التي نجمعها وكيفية استخدامها. نحن لا نشارك بياناتك أبداً مع أطراف ثالثة.'
        : 'We are transparent about the data we collect and how it is used. We never share your data with third parties.'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDarkMode ? 'bg-[#000B2B] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navigation />

      <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 rounded-3xl bg-blue-500/10 text-blue-400 mb-6">
            <FileText size={48} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-xl opacity-70 font-medium">
            {language === 'ar' 
              ? 'في آيفوري تك، نؤمن بأن الخصوصية حق أساسي.' 
              : 'At Ivory Tech, we believe privacy is a fundamental right.'}
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border backdrop-blur-md ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
              }`}
            >
              <div className="flex items-center gap-4 mb-4 text-blue-500">
                <section.icon size={28} />
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-lg opacity-80 leading-relaxed font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-dashed border-blue-500/30 text-center"
        >
          <p className="opacity-60 italic">
            {language === 'ar'
              ? 'تم تحديث هذه السياسة في 4 مايو 2026. نحن نحتفظ بالحق في تحديثها لضمان أفضل حماية لبياناتكم.'
              : 'This policy was last updated on May 4, 2026. We reserve the right to update it to ensure the best protection for your data.'}
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
