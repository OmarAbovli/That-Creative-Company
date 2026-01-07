import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const Logo = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex items-center gap-3 group">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"
            >
                {/* Container circle - White in Dark, Blue in Light */}
                <circle cx="50" cy="50" r="50" fill={isDarkMode ? "white" : "#0082FF"} />

                {/* The 'G' / Lightning Bolt Shape - Blue in Dark, White in Light */}
                <path
                    d="M75 35 L60 50 L80 50 C80 65 65 80 50 80 C35 80 25 65 25 50 C25 35 35 25 50 25 L55 25 L65 15 L50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 L75 50 L75 35 Z"
                    fill={isDarkMode ? "#0082FF" : "white"}
                />
                <path
                    d="M50 50 L80 20 L65 20 L45 40 L50 50 Z"
                    fill={isDarkMode ? "#0082FF" : "white"}
                />
            </svg>
            <span className={`font-black text-2xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ivory</span>
        </div>
    );
};
