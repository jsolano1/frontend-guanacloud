import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';
import { ArrowRight, Mail } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const Hero: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();
    const { lang } = useParams();
    const l = (path: string) => `/${lang}/${path}`;
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-12 overflow-hidden">

            {/* BACKGROUND IMAGE & LAYERS */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src={`/img/hero_drone_ai_diria.png`}
                    alt="Cerro Diria AI Network"
                    className="w-full h-full object-cover opacity-90"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1, x: '-2%', y: '-2%' }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                {/* Glow orbs - ELIMINADO EL VERDE CENTRAL, mantenemos el azul lateral para profundidad */}
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '6s' }} />

                {/* Particles */}
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-diria-neonGreen/50 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* BADGE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8"
                >
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-diria-neonGreen opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-diria-neonGreen" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-diria-neonGreen">
                        DirIA Core v1.2 Live
                    </span>
                </motion.div>

                {/* TITLE */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter mb-6 leading-[1.1]"
                >
                    <span className="block mb-2 opacity-90 font-light italic">
                        {t('hero_title_1')}
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-diria-neonBlue via-diria-neonGreen to-diria-neonBlue animate-gradient-x">
                        {t('hero_title_2')}
                    </span>
                </motion.h1>

                {/* SUBTITLE - Balanceado con ancho máximo mayor */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8 max-w-3xl mx-auto px-4"
                >
                    <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed tracking-wide">
                        {/* Usamos un span para resaltar la parte técnica sin saturar */}
                        <span dangerouslySetInnerHTML={{ __html: t('hero_subtitle') }} />
                    </p>
                </motion.div>
                {/* MAIN CTA BUTTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    {/* BOTÓN EXPLORAR */}
                    <a
                        href={l(`#ecosystem`)}
                        className="group relative px-10 py-5 rounded-full bg-diria-neonGreen text-black font-black uppercase tracking-widest text-sm transition-all duration-500 hover:scale-105 overflow-visible"
                    >
                        {/* EFECTO HALO DE RESPIRACIÓN */}
                        <div className="absolute inset-0 rounded-full bg-diria-neonBlue/100 animate-pulse-slow blur-md pointer-events-none" />

                        {/* GLOW DE HOVER */}
                        <div className="absolute inset-0 rounded-full bg-diria-neonGreen opacity-0 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-700 ease-in-out -z-10" />

                        {/* CONTENIDO */}
                        <span className="relative z-10 flex items-center gap-3">
                            {t('explore_cta')}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </a>

                    {/* BOTÓN CONTACTAR (ESTILO CONSOLA AJUSTADO) */}
                    <button
                        onClick={openContact}
                        className="group relative px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:border-diria-neonGreen/50 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <Mail size={18} className="text-gray-400 group-hover:text-diria-neonGreen transition-colors" />
                        <span>{t('contact_cta')}</span>
                        <div className="absolute bottom-2 left-6 right-6 h-[1px] bg-diria-neonGreen scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                </motion.div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        .animate-float { animation: float ease-in-out infinite; }
        @keyframes pulse-slow {
      0%, 100% {
        transform: scale(1);
        opacity: 0.15;
      }
      50% {
        transform: scale(1.15);
        opacity: 0.35;
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
      ` }} />
        </section>
    );
}
