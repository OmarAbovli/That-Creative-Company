import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const AnimatedIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1]} />
      <meshStandardMaterial color="#06b6d4" wireframe />
    </mesh>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'تم إرسال رسالتك بنجاح!',
      description: 'سيتم التواصل معك في أقرب وقت ممكن',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      info: 'omarabovli@gmail.com',
      href: 'mailto:omarabovli@gmail.com'
    },
    {
      icon: Phone,
      title: 'رقم الهاتف',
      info: '+201069466522',
      href: 'tel:+201069466522'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      info: 'مصر - الغربية - طنطا',
      href: '#'
    }
  ];

  const whyChooseItems = [
    'خبرة واسعة في التطوير',
    'فريق متميز ومتخصص',
    'دعم فني مستمر',
    'أسعار تنافسية'
  ];

  return (
    <section 
      id="contact" 
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-cyan-900/10 to-black' 
          : 'bg-gradient-to-b from-orange-50 via-blue-50 to-purple-50'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black via-cyan-900/10 to-black' 
          : 'bg-gradient-to-b from-white/50 via-blue-100/30 to-purple-100/50'
      }`}></div>
      
      <div className={`absolute top-20 ${language === 'ar' ? 'right-10' : 'left-10'} w-64 h-64 transition-opacity duration-1000 ${
        isDarkMode ? 'opacity-30' : 'opacity-20'
      }`}>
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
            <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 1.5} />
            <AnimatedIcosahedron />
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
              ? 'from-cyan-400 to-purple-400' 
              : 'from-orange-500 to-red-500'
          } bg-clip-text text-transparent`}>
            تواصل معنا
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            نحن هنا للإجابة على أسئلتك ومساعدتك في تحقيق مشروعك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-1000 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>معلومات التواصل</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    whileHover={{ x: language === 'ar' ? -10 : 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}>
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className={`font-medium transition-colors duration-1000 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{info.title}</h4>
                      <p className={`text-sm transition-colors duration-1000 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{info.info}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-1000 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-cyan-500/20' 
                : 'bg-gradient-to-br from-orange-100/50 to-blue-100/50 border-orange-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-1000 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>لماذا تختارنا؟</h3>
              <ul className={`space-y-3 transition-colors duration-1000 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {whyChooseItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-cyan-400' :
                      index === 1 ? 'bg-purple-400' :
                      index === 2 ? 'bg-pink-400' : 'bg-green-400'
                    }`}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
           <form
  action="https://formsubmit.co/omarabovli@gmail.com"
  method="POST"
  className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-1000 ${
    isDarkMode 
      ? 'bg-gradient-to-br from-gray-900/50 to-cyan-900/20 border-cyan-500/20' 
      : 'bg-gradient-to-br from-white/80 to-blue-50/50 border-blue-200'
  }`}
>
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_next" value="https://that-creative-company.vercel.app/" />

              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-1000 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{t('contact.form.title')}</h3>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-1000 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{t('contact.form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-500 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400'
                    }`}
                    placeholder={t('contact.form.name.placeholder')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-1000 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{t('contact.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-500 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400'
                    }`}
                    placeholder={t('contact.form.email.placeholder')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-1000 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-500 resize-none focus:outline-none ${
                      isDarkMode 
                        ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400'
                    }`}
                    placeholder={t('contact.form.message.placeholder')}
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-500 flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/50'
                  } text-white`}
                >
                  <Send size={20} />
                  {t('contact.form.send')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`relative z-10 mt-20 border-t pt-8 transition-all duration-1000 ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`transition-colors duration-1000 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t('footer.copyright')}
          </p>
        </div>
      </motion.footer>
    </section>
  );
};

export default ContactSection;
