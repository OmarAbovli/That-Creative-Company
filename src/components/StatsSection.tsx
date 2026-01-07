import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, Users, Award, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatItem {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
}

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 100, damping: 30 });
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest) + suffix;
            }
        });
    }, [rounded, suffix]);

    return <span ref={ref}>0{suffix}</span>;
};

const StatsSection = () => {
    const { isDarkMode } = useTheme();
    const { language } = useLanguage();

    const stats: StatItem[] = [
        {
            icon: TrendingUp,
            value: 10,
            suffix: '+',
            label: 'Projects Delivered'
        },
        {
            icon: Users,
            value: 10,
            suffix: '+',
            label: 'Happy Clients'
        },
        {
            icon: Award,
            value: 6,
            suffix: '+',
            label: 'Years Experience'
        },
        {
            icon: Globe,
            value: 4,
            suffix: '+',
            label: 'Countries Served'
        }
    ];

    return (
        <section
            className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'bg-transparent' : 'bg-white'
                }`}
            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-[#000B2B]/50' : 'bg-blue-50/30'
                    }`}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 40,
                                scale: 0.9
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${isDarkMode
                                    ? 'bg-gradient-to-br from-[#0082FF] to-[#01ECFF] shadow-[0_0_30px_rgba(0,130,255,0.3)]'
                                    : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg'
                                    }`}
                            >
                                <stat.icon size={28} className="text-white" />
                            </motion.div>

                            <div
                                className={`text-5xl md:text-6xl font-black mb-2 ${isDarkMode
                                    ? 'bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                    : 'text-blue-900'
                                    }`}
                            >
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>

                            <p
                                className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-blue-200/80' : 'text-slate-600'
                                    }`}
                            >
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
