import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';
import { ArrowRight, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* ... Background (sin cambios) ... */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src="/img/hero_drone_ai_diria.png"
                    alt="Cerro Diria AI Network"
                    className="w-full h-full object-cover opacity-100"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1, x: '-2%', y: '-2%' }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
                <div className="absolute inset-0 hero-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge (sin cambios) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8 shadow-lg"
                >
                    <span className="relative flex h-1.5 w-1.5 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#00ff9d' }}></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: '#00ff9d' }}></span>
                    </span>
                    <span className="text-xs font-bold tracking-wide uppercase" style={{ color: '#00ff9d' }}>DirIA Core v1.2 Live</span>
                </motion.div>

                {/* Título (sin cambios) */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-heading font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-2xl"
                >
                    <span>{t('hero_title_1')}</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00ccff]">
                        {t('hero_title_2')}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 max-w-2xl mx-auto text-xl text-gray-200 font-light leading-relaxed drop-shadow-md"
                    dangerouslySetInnerHTML={{ __html: t('hero_subtitle') }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 flex flex-col items-center gap-6"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#demo" className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-[#00ff9d] transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] flex items-center justify-center gap-2 group">
                            <span>{t('hero_cta_demo')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link to="/console" className="px-8 py-4 bg-black/30 border border-white/20 text-white rounded-full font-bold text-lg hover:border-white hover:bg-white/10 transition flex items-center justify-center backdrop-blur-md">
                            {t('hero_cta_console')}
                        </Link>
                    </div>

                    {/* BOTÓN NUEVO: Contáctanos */}
                    <button
                        onClick={openContact}
                        className="text-diria-muted hover:text-white flex items-center gap-2 transition-colors text-sm font-medium border-b border-transparent hover:border-diria-neonGreen pb-1"
                    >
                        <Mail className="w-4 h-4" />
                        {t('contact_cta')}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};