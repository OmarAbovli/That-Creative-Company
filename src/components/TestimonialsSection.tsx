import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
}

const TestimonialsSection = () => {
    const { isDarkMode } = useTheme();
    const { language } = useLanguage();

    const testimonials: Testimonial[] = [
        {
            quote: "Ivory Studio transformed our outdated platform into a modern, scalable solution. The results exceeded our expectations!",
            name: "Ahmed Hassan",
            role: "CTO",
            company: "TechCorp Egypt"
        },
        {
            quote: "Working with Ivory Studio was a game-changer. Their attention to detail and innovative approach delivered exceptional results.",
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "Global Solutions"
        },
        {
            quote: "The team's expertise in both design and development made our vision come to life. Highly recommended!",
            name: "Mohammed Al-Sayed",
            role: "CEO",
            company: "Digital Ventures"
        },
        {
            quote: "From concept to deployment, Ivory Studio demonstrated professionalism and technical excellence at every step.",
            name: "Emily Chen",
            role: "Operations Director",
            company: "Innovation Labs"
        },
        {
            quote: "Their ability to understand our business needs and translate them into a beautiful, functional product was impressive.",
            name: "Khaled Mansour",
            role: "Founder",
            company: "StartupHub"
        }
    ];

    // Duplicate for seamless infinite scroll
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section
            id="testimonials"
            className={`py-20 relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'bg-transparent' : 'bg-gradient-to-b from-white to-slate-50'
                }`}
            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-[#000B2B]/40' : 'bg-white/60'
                    }`}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center"
                >
                    <h2
                        className={`text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r ${isDarkMode
                            ? 'from-white via-blue-100 to-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                            : 'from-blue-900 via-slate-800 to-blue-900'
                            } bg-clip-text text-transparent`}
                    >
                        What Our Clients Say
                    </h2>
                    <p
                        className={`text-xl max-w-3xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-blue-200/80' : 'text-gray-700'
                            }`}
                    >
                        Don't just take our word for it — hear from the clients we've helped succeed.
                    </p>
                </motion.div>
            </div>

            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: [0, -1920], // Adjust based on total width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-[400px] p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 ${isDarkMode
                                ? 'bg-[#000B2B]/40 border-[#0082FF]/30 hover:border-[#01ECFF]/60 hover:shadow-[0_0_30px_rgba(0,130,255,0.15)]'
                                : 'bg-white/80 border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl'
                                }`}
                        >
                            {/* Quote Icon */}
                            <div className="mb-4">
                                <Quote
                                    size={32}
                                    className={`${isDarkMode ? 'text-[#01ECFF]' : 'text-blue-600'
                                        } opacity-50`}
                                />
                            </div>

                            {/* Quote Text */}
                            <p
                                className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-blue-100/80' : 'text-slate-700'
                                    }`}
                            >
                                "{testimonial.quote}"
                            </p>

                            {/* Client Info */}
                            <div className={`border-t pt-4 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                                <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {testimonial.name}
                                </p>
                                <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    {testimonial.role} at {testimonial.company}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient Fade Effect on Edges */}
            <div
                className={`absolute inset-y-0 left-0 w-32 ${isDarkMode
                    ? 'bg-gradient-to-r from-[#000B2B] to-transparent'
                    : 'bg-gradient-to-r from-white to-transparent'
                    } pointer-events-none z-10`}
            ></div>
            <div
                className={`absolute inset-y-0 right-0 w-32 ${isDarkMode
                    ? 'bg-gradient-to-l from-[#000B2B] to-transparent'
                    : 'bg-gradient-to-l from-white to-transparent'
                    } pointer-events-none z-10`}
            ></div>
        </section>
    );
};

export default TestimonialsSection;
