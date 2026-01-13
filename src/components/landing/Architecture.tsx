import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ArchitectureDiagram from './ArchitectureDiagram';

export const Architecture: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="architecture" className="py-12 bg-diria-darker/80 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ========== HEADER ========== */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                        <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                            {t('arch_badge')}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        <span className="inline-block text-white">
                            {t('arch_title')}
                        </span>{' '}
                        <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonBlue via-emerald-400 to-cyan-400 animate-gradient">
                                {t('arch_title_1')}
                            </span>
                        </span>
                    </h2>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t('arch_subtitle')}
                    </p>
                </div>
            </div>

            {/* Dynamic Architecture Diagram */}
            <div className="w-full h-[800px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-diria-neonGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                <ArchitectureDiagram />
            </div>
        </section>
    );
};
