
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2800); // Total duration before fading out
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-[#000B2B]' : 'bg-white'
                }`}
        >
            <div className="relative flex items-center gap-6 md:gap-8">
                {/* Logo Image */}
                {/* Optimized SVG Filter: Maps Blue to White and White to Transparent */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <filter id="remove-white-preloader" colorInterpolationFilters="sRGB">
                        <feColorMatrix 
                            type="matrix" 
                            values="0 0 0 0 1
                                    0 0 0 0 1
                                    0 0 0 0 1
                                    -1.5 0 0 1.5 0" 
                        />
                    </filter>
                </svg>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0, x: -30 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center overflow-hidden"
                >
                    <img
                        src="/logo/logo.png"
                        alt="Ivory Tech Logo"
                        className="w-full h-full object-contain"
                        style={{ 
                            filter: isDarkMode ? 'url(#remove-white-preloader)' : 'none',
                        }}
                    />
                </motion.div>

                {/* Text Section */}
                <div className="flex flex-col items-start relative">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col"
                    >
                        <span className={`text-4xl md:text-7xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Ivory
                        </span>
                        <span className={`text-4xl md:text-7xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Tech
                        </span>
                    </motion.div>
                    
                    {/* Underline */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className={`h-1.5 md:h-2 mt-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-900'}`}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
