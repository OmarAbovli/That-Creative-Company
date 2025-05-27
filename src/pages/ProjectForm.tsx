import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Smartphone, Monitor, ShoppingBag, User, Stethoscope, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FloatingCodeBackground } from '@/components/3d/FloatingCode';

const ProjectForm = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    websiteType: '',
    customIdea: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success message
    toast({
      title: "تم إرسال طلبك بنجاح!",
      description: "سيتم التواصل معك في أقرب وقت ممكن من فريقنا المتميز",
    });

    // Create form for FormSubmit
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/omarabovli@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';

    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Add additional FormSubmit configuration
    const subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.name = '_subject';
    subjectInput.value = `مشروع جديد من ${formData.name}`;
    form.appendChild(subjectInput);

    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = '_next';
    nextInput.value = window.location.origin + '/';
    form.appendChild(nextInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      websiteType: '',
      customIdea: '',
      budget: '',
      timeline: '',
      description: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = [
    { value: 'mobile', label: 'تطبيق جوال', icon: Smartphone },
    { value: 'website', label: 'موقع إلكتروني', icon: Monitor }
  ];

  const websiteTypes = [
    { value: 'marketing', label: 'موقع تسويقي', icon: MoreHorizontal },
    { value: 'ecommerce', label: 'متجر إلكتروني', icon: ShoppingBag },
    { value: 'portfolio', label: 'بورتفوليو', icon: User },
    { value: 'medical', label: 'موقع طبي', icon: Stethoscope },
    { value: 'other', label: 'أخرى', icon: MoreHorizontal }
  ];

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20' 
        : 'bg-gradient-to-br from-orange-200 via-yellow-100 to-blue-200'
    }`}>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDarkMode ? 'opacity-100' : 'opacity-20'
      }`}>
        <FloatingCodeBackground />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.a
              href="/"
              whileHover={{ scale: 1.1 }}
              className={`p-3 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <ArrowLeft size={20} />
            </motion.a>
            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${
              isDarkMode 
                ? 'from-purple-400 to-pink-400' 
                : 'from-orange-500 to-red-500'
            } bg-clip-text text-transparent`}>
              ابدأ مشروعك معنا
            </h1>
          </div>

          <form onSubmit={handleSubmit} className={`backdrop-blur-sm rounded-2xl p-8 border ${
            isDarkMode 
              ? 'bg-gray-900/50 border-cyan-500/20' 
              : 'bg-white/80 border-orange-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>الاسم الكامل *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-400'
                  } focus:outline-none`}
                  placeholder="اسمك الكامل"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>البريد الإلكتروني *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-400'
                  } focus:outline-none`}
                  placeholder="your@email.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8"
            >
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>رقم الهاتف *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-400'
                } focus:outline-none`}
                placeholder="رقم هاتفك"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <label className={`block text-sm font-medium mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>نوع المشروع *</label>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <motion.label
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.projectType === type.value
                        ? isDarkMode 
                          ? 'bg-purple-600/20 border-purple-400' 
                          : 'bg-orange-100 border-orange-400'
                        : isDarkMode 
                          ? 'bg-black/20 border-gray-600 hover:border-purple-400' 
                          : 'bg-white border-gray-300 hover:border-orange-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type.value}
                      checked={formData.projectType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <type.icon size={24} className={
                      formData.projectType === type.value
                        ? isDarkMode ? 'text-purple-400' : 'text-orange-500'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } />
                    <span className={
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }>{type.label}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {formData.projectType === 'website' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <label className={`block text-sm font-medium mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>نوع الموقع *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {websiteTypes.map((type) => (
                    <motion.label
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.websiteType === type.value
                          ? isDarkMode 
                            ? 'bg-cyan-600/20 border-cyan-400' 
                            : 'bg-blue-100 border-blue-400'
                          : isDarkMode 
                            ? 'bg-black/20 border-gray-600 hover:border-cyan-400' 
                            : 'bg-white border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="websiteType"
                        value={type.value}
                        checked={formData.websiteType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <type.icon size={24} className={
                        formData.websiteType === type.value
                          ? isDarkMode ? 'text-cyan-400' : 'text-blue-500'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      <span className={`text-sm text-center ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{type.label}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}

            {(formData.websiteType === 'other' || formData.projectType === 'mobile') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>اكتب فكرتك وجميع التفاصيل *</label>
                <textarea
                  name="customIdea"
                  value={formData.customIdea}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 resize-none ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-400'
                  } focus:outline-none`}
                  placeholder="اكتب جميع أفكارك وتفاصيل المشروع هنا..."
                />
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>الميزانية المتوقعة</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-500/30 text-white focus:border-cyan-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400'
                  } focus:outline-none`}
                >
                  <option value="">اختر الميزانية</option>
                  <option value="5000-10000">5,000 - 10,000 جنيه</option>
                  <option value="10000-25000">10,000 - 25,000 جنيه</option>
                  <option value="25000-50000">25,000 - 50,000 جنيه</option>
                  <option value="50000+">أكثر من 50,000 جنيه</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>الإطار الزمني</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-500/30 text-white focus:border-cyan-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-400'
                  } focus:outline-none`}
                >
                  <option value="">اختر الإطار الزمني</option>
                  <option value="1-2-weeks">1-2 أسابيع</option>
                  <option value="1-month">شهر واحد</option>
                  <option value="2-3-months">2-3 أشهر</option>
                  <option value="6-months">6 أشهر أو أكثر</option>
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>تفاصيل إضافية</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 resize-none ${
                  isDarkMode 
                    ? 'bg-black/30 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-400'
                } focus:outline-none`}
                placeholder="أي معلومات إضافية تريد إضافتها..."
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/50'
              } text-white`}
            >
              <Send size={20} />
              إرسال طلب المشروع
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectForm;
