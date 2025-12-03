import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-black border-t border-white/10 py-16 scroll-zoom relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Logo Guana Cloud */}
                    <div className="flex items-center gap-3">
                        {/* Asegúrate que esta imagen exista en tu carpeta public/img */}
                        <img src="/img/guana_logo_dark.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-heading font-bold text-xl text-white">Guana Cloud</span>
                    </div>

                    {/* Sustainability Badge - Usa la traducción 'footer_sustainability' */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30">
                        <span className="text-xl">🌿</span>
                        <span className="text-green-400 text-xs font-medium uppercase tracking-wide">
                            {t('footer_sustainability')}
                        </span>
                    </div>

                    {/* Información Copyright y Certificaciones SOLICITADAS */}
                    <div className="text-diria-muted text-sm text-center md:text-right">
                        <p>&copy; 2025 Guana Cloud. San José, Costa Rica.</p>
                        <p className="mt-2 text-xs opacity-50">Carbon Neutral Hosting • SOC 2 Type II</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};