
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
    const { isDarkMode } = useTheme();
    const { t } = useLanguage();

    return (
        <footer className={`relative z-10 py-8 border-t transition-colors duration-1000 ${isDarkMode
                ? 'bg-[#000B2B] border-[#0082FF]/20 text-blue-200/60'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>© {new Date().getFullYear()} Ivory Studio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
