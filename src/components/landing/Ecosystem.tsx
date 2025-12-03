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
                        {/* Ingeniería */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 flex flex-col items-center">
                            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
                                <Layers size={40} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Ingeniería</h4>
                            <p className="text-diria-muted leading-relaxed text-center">Data Engineering, Analytics, Cloud Architecture.</p>
                        </div>

                        {/* Core Platform */}
                        <div className="p-8 rounded-3xl border border-diria-neonGreen/30 bg-diria-neonGreen/5 relative hover:bg-diria-neonGreen/10 transition-colors duration-300 flex flex-col items-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-diria-neonGreen text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-diria-neonGreen/20">CORE</div>
                            <div className="mb-6 p-4 rounded-2xl bg-diria-neonGreen/10 border border-diria-neonGreen/20 text-diria-neonGreen">
                                <BrainCircuit size={40} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">DirIA Platform</h4>
                            <p className="text-diria-muted leading-relaxed text-center">Orquestación Multi-Agente.</p>
                        </div>

                        {/* Filosofía */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 flex flex-col items-center">
                            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
                                <Sprout size={40} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Filosofía</h4>
                            <p className="text-diria-muted leading-relaxed text-center">Blue Zone Thinking.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};