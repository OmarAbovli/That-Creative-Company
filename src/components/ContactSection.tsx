
import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
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
      <meshStandardMaterial color="#01ECFF" wireframe />
    </mesh>
  );
};

const ContactSection = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields', {
        description: 'All fields are required to send your message.',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (FormSubmit will handle the actual submission)
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Message Sent Successfully! 🎉', {
        description: 'Thank you for reaching out. We\'ll get back to you soon!',
        duration: 5000,
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Oops! Something went wrong', {
        description: 'Please try again or contact us directly via email.',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      title: 'Email',
      info: 'omarabovli@gmail.com',
      href: 'mailto:omarabovli@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+201069466522',
      href: 'tel:+201069466522'
    },
    {
      icon: MapPin,
      title: 'Address',
      info: 'Tanta, Gharbia, Egypt',
      href: '#'
    }
  ];

  return (
    <section
      id="contact"
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode
        ? 'bg-transparent'
        : 'bg-white'
        }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 -z-10 ${isDarkMode ? 'bg-[#000B2B]/60' : 'bg-white/50'
        }`} />

      <div className={`absolute top-20 ${language === 'ar' ? 'right-10' : 'left-10'} w-64 h-64 transition-opacity duration-1000 ${isDarkMode ? 'opacity-30' : 'opacity-20'
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
          <h2 className={`text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r ${isDarkMode
            ? 'from-white via-blue-100 to-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
            : 'from-blue-900 via-slate-800 to-blue-900'
            } bg-clip-text text-transparent`}>
            {t('nav.contact')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-gray-700'
            }`}>
            We are here to answer your questions
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
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    whileHover={{ x: language === 'ar' ? -10 : 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${isDarkMode
                      ? 'bg-gradient-to-r from-[#0082FF] to-[#01ECFF]'
                      : 'bg-blue-500'
                      }`}>
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className={`font-medium transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{info.title}</h4>
                      <p className={`text-sm transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/70' : 'text-gray-600'
                        }`}>{info.info}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className={`backdrop-blur-md border rounded-2xl p-6 transition-all duration-1000 ${isDarkMode
              ? 'bg-[#000B2B]/40 border-[#0082FF]/30'
              : 'bg-white/80 border-gray-200'
              }`}>
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Why Choose Us?</h3>
              <ul className={`space-y-3 transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-gray-700'
                }`}>
                <li className="flex items-center gap-2">Experience</li>
                <li className="flex items-center gap-2">Quality</li>
                <li className="flex items-center gap-2">Support</li>
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
              className={`backdrop-blur-md border rounded-2xl p-8 transition-all duration-1000 ${isDarkMode
                ? 'bg-[#000B2B]/40 border-[#0082FF]/30'
                : 'bg-white border-gray-200'
                }`}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://that-creative-company.vercel.app/" />

              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t('contact.form.title')}</h3>

              <div className="space-y-6">
                <motion.div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-gray-700'}`}>{t('contact.form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${isDarkMode ? 'bg-[#000B2B]/60 border-[#0082FF]/30 text-white focus:border-[#01ECFF]' : 'bg-gray-50'
                      }`}
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-gray-700'}`}>{t('contact.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${isDarkMode ? 'bg-[#000B2B]/60 border-[#0082FF]/30 text-white focus:border-[#01ECFF]' : 'bg-gray-50'
                      }`}
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-blue-200' : 'text-gray-700'}`}>{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${isDarkMode ? 'bg-[#000B2B]/60 border-[#0082FF]/30 text-white focus:border-[#01ECFF]' : 'bg-gray-50'
                      }`}
                  />
                </motion.div>


                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isDarkMode
                    ? 'bg-gradient-to-r from-[#0082FF] to-[#01ECFF] text-white hover:shadow-[0_0_30px_rgba(0,130,255,0.5)]'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('contact.send')}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
