import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Layers, BrainCircuit, Sprout } from 'lucide-react';

export const Ecosystem: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-diria-darker relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-12">{t('ecosystem_title')}</h3>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                        {/* Ingeniería - Tono Azul */}
                        <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:to-diria-neonBlue/20 transition-all duration-500">
                            <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-8 overflow-hidden border border-white/5 hover:border-diria-neonBlue/50 transition-colors duration-300 flex flex-col items-center">
                                {/* Gradient Glow Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-diria-neonBlue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="mb-6 p-4 rounded-2xl bg-diria-neonBlue/10 border border-diria-neonBlue/20 text-diria-neonBlue group-hover:scale-110 transition-transform duration-300">
                                        <Layers size={40} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-diria-neonBlue transition-colors">Ingeniería</h4>
                                    <p className="text-diria-muted leading-relaxed text-center group-hover:text-gray-300">Data Engineering, Analytics, Cloud Architecture.</p>
                                </div>
                            </div>
                        </div>

                        {/* Core Platform - Tono Verde (Central) */}
                        <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-diria-neonGreen/20 to-transparent hover:to-diria-neonGreen/30 transition-all duration-500 transform md:-translate-y-4">
                            <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-8 overflow-hidden border border-diria-neonGreen/30 hover:border-diria-neonGreen transition-colors duration-300 flex flex-col items-center shadow-[0_0_30px_rgba(0,255,157,0.1)] hover:shadow-[0_0_40px_rgba(0,255,157,0.2)]">
                                <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-diria-neonGreen text-black text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg z-20">CORE</div>

                                <div className="absolute inset-0 bg-gradient-to-br from-diria-neonGreen/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col items-center pt-4">
                                    <div className="mb-6 p-4 rounded-2xl bg-diria-neonGreen/10 border border-diria-neonGreen/20 text-diria-neonGreen group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        <BrainCircuit size={48} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-diria-neonGreen transition-colors">DirIA Platform</h4>
                                    <p className="text-diria-muted leading-relaxed text-center group-hover:text-white">Orquestación Multi-Agente.</p>
                                </div>
                            </div>
                        </div>

                        {/* Filosofía - Tono Teal/Natural */}
                        <div className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:to-emerald-500/20 transition-all duration-500">
                            <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-8 overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-colors duration-300 flex flex-col items-center">
                                {/* Gradient Glow Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                        <Sprout size={40} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Filosofía</h4>
                                    <p className="text-diria-muted leading-relaxed text-center group-hover:text-gray-300">Blue Zone Thinking.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};