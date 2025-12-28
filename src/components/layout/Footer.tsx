import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContact } from '../../context/ContactContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();

    return (
        <footer className="bg-black border-t border-white/10 py-16 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            {/* CAMBIO: Logo aún más grande (h-32) */}
                            <img src="/img/guana_logo_dark.png" alt="Logo" className="h-32 w-auto" />
                            <span className="font-heading font-bold text-2xl text-white">Guana Cloud</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30 w-fit">
                            <span className="text-xl">🌿</span>
                            <span className="text-green-400 text-xs font-medium uppercase tracking-wide">
                                {t('footer_sustainability')}
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-12 text-sm">
                        <div>
                            <h4 className="font-bold text-white mb-4">Compañía</h4>
                            <ul className="space-y-3 text-diria-muted">
                                <li><a href="/#about" className="hover:text-diria-neonGreen transition">Filosofía</a></li>
                                <li><Link to="/careers" className="hover:text-diria-neonGreen transition">Carreras</Link></li>
                                {/* CAMBIO: Contacto ahora abre el modal */}
                                <li><button onClick={openContact} className="hover:text-diria-neonGreen transition text-left">Contacto</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-3 text-diria-muted">
                                <li><Link to="/legal/privacy" className="hover:text-white transition">Privacidad</Link></li>
                                <li><Link to="/legal/terms" className="hover:text-white transition">Términos</Link></li>
                                <li><span className="opacity-50">SOC 2 Type II</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 text-diria-muted text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2025 Guana Cloud. San José, Costa Rica.</p>
                    <p className="mt-2 md:mt-0 opacity-50">Carbon Neutral Hosting</p>
                </div>
            </div>
        </footer>
    );
};