import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const Logo = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Optimized SVG Filter: Maps Blue to White and White to Transparent */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="remove-white" colorInterpolationFilters="sRGB">
                    <feColorMatrix 
                        type="matrix" 
                        values="0 0 0 0 1
                                0 0 0 0 1
                                0 0 0 0 1
                                -1.5 0 0 1.5 0" 
                    />
                </filter>
            </svg>
            
            <div className="relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                    src="/logo/logo.png" 
                    alt="Ivory Tech Logo" 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    style={{ 
                        filter: isDarkMode ? 'url(#remove-white)' : 'none',
                    }}
                />
            </div>
            
            <div className="flex flex-col items-start leading-none -space-y-1">
                <span className={`font-black text-xl md:text-3xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Ivory
                </span>
                <div className="relative">
                    <span className={`font-black text-xl md:text-3xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Tech
                    </span>
                    <div className={`absolute -bottom-1 left-0 w-full h-1 md:h-1.5 ${isDarkMode ? 'bg-white' : 'bg-slate-900'}`} />
                </div>
            </div>
        </div>
    );
};
