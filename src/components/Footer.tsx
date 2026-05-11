
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Music, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const { isDarkMode } = useTheme();
    const { t, language } = useLanguage();

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61589480705918', label: 'Facebook' },
        { icon: Instagram, href: 'https://www.instagram.com/ivorytech.eg/', label: 'Instagram' },
        { icon: Music, href: 'https://www.tiktok.com/@ivory.tech.eg?lang=en-GB', label: 'TikTok' },
    ];

    return (
        <footer className={`relative z-10 pt-16 pb-8 border-t transition-colors duration-1000 ${isDarkMode
            ? 'bg-[#000B2B] border-[#0082FF]/20 text-blue-100'
            : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className={`text-2xl font-black bg-gradient-to-r ${isDarkMode ? 'from-[#0082FF] to-[#01ECFF]' : 'from-blue-600 to-cyan-500'} bg-clip-text text-transparent`}>
                            Ivory Tech
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-blue-200/60' : 'text-gray-600'}`}>
                            {t('seo.description')}
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">{t('contact.info.title')}</h4>
                        <div className="space-y-3">
                            <a href={`mailto:${t('contact.email.value')}`} className="flex items-center gap-3 group">
                                <div className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                                    <Mail size={18} className={isDarkMode ? 'text-[#01ECFF]' : 'text-blue-600'} />
                                </div>
                                <span className={`text-sm ${isDarkMode ? 'text-blue-200/80 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                                    {t('contact.email.value')}
                                </span>
                            </a>
                            <a href={`tel:${t('contact.phone.value')}`} className="flex items-center gap-3 group">
                                <div className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                                    <Phone size={18} className={isDarkMode ? 'text-[#01ECFF]' : 'text-blue-600'} />
                                </div>
                                <span className={`text-sm ${isDarkMode ? 'text-blue-200/80 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                                    {t('contact.phone.value')}
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">Follow Us</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode
                                        ? 'bg-[#0082FF]/10 hover:bg-[#0082FF]/20 text-[#01ECFF]'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                        }`}
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`pt-8 border-t text-center ${isDarkMode ? 'border-[#0082FF]/10' : 'border-gray-200'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-blue-200/40' : 'text-gray-500'}`}>
                        © {new Date().getFullYear()} Ivory Tech. {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
