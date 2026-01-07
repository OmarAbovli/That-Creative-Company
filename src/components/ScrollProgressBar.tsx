import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ScrollProgressBar = () => {
    const { isDarkMode } = useTheme();
    const { scrollYProgress } = useScroll();

    // Spring animation for smoother progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-1 z-[200] origin-left ${isDarkMode
                    ? 'bg-gradient-to-r from-[#0082FF] via-[#01ECFF] to-[#0082FF]'
                    : 'bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600'
                }`}
            style={{ scaleX }}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 blur-sm ${isDarkMode ? 'bg-[#01ECFF]/50' : 'bg-blue-400/50'
                }`} />
        </motion.div>
    );
};

export default ScrollProgressBar;
