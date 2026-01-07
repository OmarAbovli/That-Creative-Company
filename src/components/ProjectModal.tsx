import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ChevronRight, Layout, Server, Database, Code, Globe, Smartphone, Key, Copy, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ProjectData {
    title: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    problem: string;
    solution: string;
    image: string;
    gallery?: string[];
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
    demoCredentials?: {
        username?: string;
        password?: string;
    };
}

interface ProjectModalProps {
    project: ProjectData | null;
    onClose: () => void;
}

const CredentialRow = ({ label, value, isDarkMode }: { label: string, value: string, isDarkMode: boolean }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-1">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>{label}</span>
            <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200'
                }`}>
                <code className={`text-sm font-mono ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{value}</code>
                <button
                    onClick={handleCopy}
                    className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                        }`}
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
            </div>
        </div>
    );
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const { isDarkMode } = useTheme();
    const { language } = useLanguage();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className={`absolute inset-0 backdrop-blur-md transition-colors duration-500 ${isDarkMode ? 'bg-black/60' : 'bg-white/60'
                            }`}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border transition-all duration-300 ${isDarkMode
                            ? 'bg-[#000B2B]/90 border-[#0082FF]/30 shadow-[0_0_50px_rgba(0,130,255,0.15)] text-white'
                            : 'bg-white/95 border-white/50 shadow-xl text-slate-900'
                            }`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 z-50 p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-slate-900'
                                }`}
                        >
                            <X size={24} />
                        </button>

                        {/* Hero Image */}
                        <div className="relative h-64 md:h-96 w-full overflow-hidden shrink-0">
                            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-[#000B2B] to-transparent' : 'bg-gradient-to-t from-white to-transparent'} z-10 opacity-80`} />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wider uppercase ${isDarkMode ? 'bg-[#0082FF] text-white' : 'bg-blue-600 text-white'
                                    }`}>
                                    {project.category}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{project.title}</h2>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content (Left) */}
                            <div className="lg:col-span-2 space-y-10">

                                {/* Overview */}
                                <div>
                                    <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-[#01ECFF]' : 'text-blue-600'}`}>
                                        <Layout size={24} />
                                        Overview
                                    </h3>
                                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-blue-100/80' : 'text-slate-600'}`}>
                                        {project.fullDescription}
                                    </p>
                                </div>

                                {/* Problem & Solution Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-red-400">
                                            The Challenge
                                        </h4>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                                            {project.problem}
                                        </p>
                                    </div>
                                    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-green-400">
                                            The Solution
                                        </h4>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Gallery (Placeholder for user to fill later) */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6">Gallery</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {project.gallery.map((img, idx) => (
                                                <div key={idx} className="rounded-xl overflow-hidden h-48 bg-gray-500/10">
                                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (Right) */}
                            <div className="space-y-8">
                                {/* Demo Credentials (IF EXIST) */}
                                {project.demoCredentials && (
                                    <div className={`p-6 rounded-2xl border border-dashed relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#0082FF]/10 to-[#000B2B] border-[#0082FF]/40' : 'bg-blue-50 border-blue-300'
                                        }`}>
                                        <div className={`absolute top-0 right-0 p-2 opacity-10 ${isDarkMode ? 'text-white' : 'text-blue-500'}`}>
                                            <Key size={64} />
                                        </div>

                                        <h3 className={`font-bold text-xl mb-4 flex items-center gap-2 ${isDarkMode ? 'text-[#01ECFF]' : 'text-blue-700'}`}>
                                            <Key size={20} /> Demo Access
                                        </h3>
                                        <div className="space-y-3 relative z-10">
                                            {project.demoCredentials.username && (
                                                <CredentialRow label="Username" value={project.demoCredentials.username} isDarkMode={isDarkMode} />
                                            )}
                                            {project.demoCredentials.password && (
                                                <CredentialRow label="Password" value={project.demoCredentials.password} isDarkMode={isDarkMode} />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0082FF]/10 border-[#0082FF]/30' : 'bg-blue-50 border-blue-200'}`}>
                                    <h3 className="font-bold text-xl mb-6">Project Links</h3>
                                    <div className="flex flex-col gap-3">
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-[#0082FF] hover:bg-[#01ECFF] text-white hover:text-black' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}>
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-slate-300 hover:bg-slate-100'
                                            }`}>
                                            <Github size={18} /> Source Code
                                        </a>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h3 className="font-bold text-xl mb-4">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-white/5 border-white/10 text-blue-200' : 'bg-slate-100 border-slate-200 text-slate-700'
                                                }`}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats / Info */}
                                <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                                    <div>
                                        <span className={`text-xs uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client</span>
                                        <p className="font-medium mt-1">Confidential / Self-Initiated</p>
                                    </div>
                                    <div>
                                        <span className={`text-xs uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Timeline</span>
                                        <p className="font-medium mt-1">3 Months</p>
                                    </div>
                                    <div>
                                        <span className={`text-xs uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Role</span>
                                        <p className="font-medium mt-1">Full Stack Development</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
