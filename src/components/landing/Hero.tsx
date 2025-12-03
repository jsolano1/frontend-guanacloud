import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Drone AI Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src="/img/hero_drone_ai_diria.png"
                    alt="Cerro Diria AI Network"
                    className="w-full h-full object-cover opacity-60"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1, x: '-2%', y: '-2%' }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
                <div className="absolute inset-0 hero-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-diria-neonGreen animate-pulse mr-2"></span>
                    <span className="text-xs font-medium text-diria-neonGreen tracking-wide uppercase">DirIA Core v1.2 Live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-heading font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-2xl"
                >
                    <span>{t('hero_title_1')}</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen to-diria-neonBlue">
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
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <a href="#demo" className="px-8 py-4 bg-diria-neonGreen text-black rounded-full font-bold text-lg hover:bg-white transition shadow-[0_0_20px_rgba(0,255,157,0.4)] flex items-center justify-center gap-2 group">
                        <span>{t('hero_cta_demo')}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link to="/console" className="px-8 py-4 bg-black/30 border border-white/20 text-white rounded-full font-bold text-lg hover:border-white hover:bg-white/10 transition flex items-center justify-center backdrop-blur-md">
                        {t('hero_cta_console')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
