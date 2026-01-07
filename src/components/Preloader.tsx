
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
            <div className="relative flex flex-col items-center">
                {/* Animated Logo SVG */}
                <div className="w-24 h-24 md:w-32 md:h-32 mb-6">
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        {/* 1. Circle Drawing */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="48"
                            stroke={isDarkMode ? "white" : "#0082FF"}
                            strokeWidth="2"
                            fill={isDarkMode ? "white" : "#0082FF"}
                            initial={{ pathLength: 0, fillOpacity: 0 }}
                            animate={{ pathLength: 1, fillOpacity: 0.1 }}
                            transition={{
                                pathLength: { duration: 1, ease: "easeInOut" },
                                fillOpacity: { duration: 0.5, delay: 1 }
                            }}
                        />

                        {/* 2. G-Shape Drawing */}
                        <motion.path
                            d="M75 35 L60 50 L80 50 C80 65 65 80 50 80 C35 80 25 65 25 50 C25 35 35 25 50 25 L55 25 L65 15 L50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 L75 50 L75 35 Z"
                            stroke={isDarkMode ? "#0082FF" : "white"}
                            strokeWidth="2"
                            fill={isDarkMode ? "#0082FF" : "white"}
                            initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
                            animate={{ pathLength: 1, fillOpacity: 1, opacity: 1 }}
                            transition={{
                                default: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
                                fillOpacity: { duration: 0.5, delay: 1.8 }
                            }}
                        />

                        {/* 3. Small Shard Drawing */}
                        <motion.path
                            d="M50 50 L80 20 L65 20 L45 40 L50 50 Z"
                            stroke={isDarkMode ? "#0082FF" : "white"}
                            strokeWidth="2"
                            fill={isDarkMode ? "#0082FF" : "white"}
                            initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
                            animate={{ pathLength: 1, fillOpacity: 1, opacity: 1 }}
                            transition={{
                                default: { duration: 1, ease: "easeInOut", delay: 1 },
                                fillOpacity: { duration: 0.5, delay: 1.8 }
                            }}
                        />
                    </svg>
                </div>

                {/* Text Reveal */}
                <div className="overflow-hidden h-12">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                        className={`text-3xl md:text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        Ivory Studio
                    </motion.h1>
                </div>

                {/* Loading Bar / Progress line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 100, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className={`h-1 mt-4 rounded-full ${isDarkMode ? 'bg-[#0082FF]' : 'bg-blue-600'}`}
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
