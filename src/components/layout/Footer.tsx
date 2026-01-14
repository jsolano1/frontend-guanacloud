import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';
import { Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();

    return (
        <footer className="relative bg-[#030303] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/5 z-50">
            {/* EFECTO DE LUZ DE FONDO */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-diria-neonGreen/5 blur-[80px] md:blur-[120px] pointer-events-none" />

            {/* LÍNEA DE FLUJO ANIMADA */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-diria-neonGreen/40 to-transparent shadow-[0_0_10px_rgba(0,255,157,0.2)]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">

                    {/* BRAND & PHILOSOPHY */}
                    <div className="w-full lg:max-w-sm space-y-6 md:space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 group">
                                <img
                                    src="/img/logo-guanacloud-arbol.png"
                                    alt="Logo"
                                    className="h-12 md:h-16 w-auto filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500"
                                />
                                <div className="flex flex-col">
                                    <span className="font-heading font-black text-xl md:text-2xl text-white tracking-tighter uppercase">
                                        Guana Cloud
                                    </span>
                                    <span className="text-[9px] md:text-[10px] text-diria-neonGreen font-mono tracking-[0.3em] uppercase opacity-70">
                                        Engineering Future
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed font-light max-w-md">
                                {t('footer_statement')}
                            </p>
                        </div>

                        {/* Badge de Sostenibilidad */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-diria-neonGreen/40 transition-colors duration-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-diria-neonGreen animate-pulse shadow-[0_0_8px_rgba(0,255,157,0.8)]" />
                            <span className="text-gray-300 text-[9px] md:text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                {t('footer_sustainability')}
                            </span>
                        </div>
                    </div>

                    {/* NAVIGATION GRID - Ajustado a 2 columnas en mobile real */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 lg:gap-24 w-full lg:w-auto">
                        {/* Compañía */}
                        <div className="space-y-5">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-30">{t('nav_ecosystem')}</h4>
                            <ul className="space-y-3">
                                {[t('nav_about'), t('nav_careers'), t('nav_contact')].map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={item === t('nav_contact') ? openContact : undefined}
                                            className="text-gray-500 hover:text-diria-neonGreen text-sm transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group whitespace-nowrap"
                                        >
                                            <span className="w-0 h-[1px] bg-diria-neonGreen group-hover:w-3 transition-all duration-300" />
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal & Compliance */}
                        <div className="space-y-5">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-30">{t('nav_legal')}</h4>
                            <ul className="space-y-3">
                                <li><Link to="/legal/privacy" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">{t('nav_privacy')}</Link></li>
                                <li><Link to="/legal/terms" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">{t('nav_terms')}</Link></li>
                                <li className="pt-1">
                                    <span className="px-2 py-0.5 rounded border border-white/10 text-[8px] md:text-[9px] text-gray-600 font-mono uppercase">SOC 2 Type II</span>
                                </li>
                            </ul>
                        </div>

                        {/* Ubicación - Visible en mobile también para llenar espacio */}
                        <div className="space-y-5 col-span-2 sm:col-span-1">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-30">{t('nav_location')}</h4>
                            <p className="text-gray-500 text-xs md:text-sm font-light">
                                San José, Costa Rica
                            </p>
                        </div>
                    </div>
                </div>

                {/* BARRA DE CIERRE */}
                <div className="mt-16 md:mt-20 pt-3 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Redes Sociales - Primero en mobile para mejor acceso */}
                    <div className="flex items-center gap-4 order-1 md:order-2">
                        <span className="text-white/20 text-[9px] uppercase tracking-widest font-bold hidden sm:block">Conectar //</span>

                        <a href="https://linkedin.com/company/guana-cloud" target="_blank" rel="noopener noreferrer"
                            className="group relative p-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-diria-neonGreen/50 transition-all duration-500">
                            <Linkedin size={18} className="text-gray-500 group-hover:text-diria-neonGreen transition-all" />
                        </a>

                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                            className="group relative p-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-diria-neonBlue/50 transition-all duration-500">
                            <Github size={18} className="text-gray-500 group-hover:text-diria-neonBlue transition-all" />
                        </a>
                    </div>

                    {/* Autoría y Copyright */}
                    <div className="flex flex-col gap-2 order-2 md:order-1 text-center md:text-left">
                        <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium">
                            &copy; 2026 Guana Cloud. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.15em] opacity-60">
                            Website designed and hosted by <span className="text-diria-neonGreen font-bold italic">Guana Cloud</span>
                        </p>
                    </div>

                    {/* Status Indicators - Simplificado para Mobile */}
                    <div className="flex items-center gap-4 order-3 text-[9px] md:text-[10px] uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-diria-neonGreen opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-diria-neonGreen"></span>
                            </span>
                            <span className="text-gray-600">Operational</span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/10" />
                        <span className="text-gray-700 font-mono">v2.4.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};