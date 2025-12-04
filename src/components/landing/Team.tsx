import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail } from 'lucide-react';
import { useContact } from '../../context/ContactContext';

export const Team: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();

    return (
        <section className="py-24 bg-diria-darker relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-16">{t('team_title')}</h3>

                    <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 mb-24">
                        {/* Jose Solano */}
                        <div className="flex flex-col items-center group max-w-lg">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative">
                                    <img
                                        src="/img/jose_solano.png"
                                        alt="Jose Solano"
                                        className="w-56 h-56 rounded-full object-cover object-top shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            border: '4px solid #00ff9d',
                                            boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="text-white font-bold text-2xl mb-2">Jose Solano</div>
                            <div className="text-sm uppercase tracking-widest font-bold mb-6" style={{ color: '#00ff9d' }}>Founder & CEO</div>
                            <p
                                className="text-gray-400 text-sm text-center leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('team_bio_jose' as any) }}
                            />
                        </div>

                        {/* Alejandra Restrepo */}
                        <div className="flex flex-col items-center group max-w-lg">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative">
                                    <img
                                        src="/img/alejandra_restrepo_new.png"
                                        alt="Alejandra Restrepo"
                                        className="w-56 h-56 rounded-full object-cover object-top shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            border: '4px solid #00ccff',
                                            boxShadow: '0 0 20px rgba(0, 204, 255, 0.3)'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="text-white font-bold text-2xl mb-2">Alejandra Restrepo</div>
                            <div className="text-sm uppercase tracking-widest font-bold mb-6" style={{ color: '#00ccff' }}>Founder & Chief of Staff</div>
                            <p
                                className="text-gray-400 text-sm text-center leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('team_bio_alejandra' as any) }}
                            />
                        </div>
                    </div>

                    {/* Contact CTA - Ahora abre el modal global */}
                    <div className="flex justify-center">
                        <button
                            onClick={openContact}
                            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-full transition-all duration-300 flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">{t('contact_cta')}</span>
                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};