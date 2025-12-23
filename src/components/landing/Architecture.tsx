import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export const Architecture: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="architecture" className="py-24 bg-diria-darker/80 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{t('arch_title')}</h2>
                <p className="text-diria-muted max-w-2xl mx-auto">{t('arch_subtitle')}</p>
            </div>

            {/* Dynamic Architecture Diagram */}
            <div className="w-full h-[600px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-diria-neonGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                <ArchitectureDiagram />
            </div>
        </section>
    );
};
