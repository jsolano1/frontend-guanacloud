import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Team: React.FC = () => {
    const { t } = useLanguage();
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data to a backend.
        // For now, we'll simulate a mailto action or just close the modal.
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        window.location.href = `mailto:info@guanacloud.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${email}`;
        setIsContactOpen(false);
    };

    return (
        <section className="py-24 bg-diria-darker relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-16">{t('team_title')}</h3>

                    <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 mb-24">
                        {/* Jose Solano */}
                        <div className="flex flex-col items-center group">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-diria-neonGreen/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-80"></div>
                                <div className="relative p-1 rounded-full bg-gradient-to-br from-diria-neonGreen to-transparent">
                                    <img
                                        src="/img/jose_solano.png"
                                        alt="Jose Solano"
                                        className="w-56 h-56 rounded-full object-cover object-top border-4 border-diria-darker shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="text-white font-bold text-2xl mb-2">Jose Solano</div>
                            <div className="text-sm text-diria-neonGreen uppercase tracking-widest font-bold mb-6">CEO</div>
                            <p className="text-diria-muted text-sm max-w-md text-center leading-relaxed">
                                {t('team_bio_jose' as any)}
                            </p>
                        </div>

                        {/* Alejandra Restrepo */}
                        <div className="flex flex-col items-center group">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-diria-neonBlue/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-80"></div>
                                <div className="relative p-1 rounded-full bg-gradient-to-br from-diria-neonBlue to-transparent">
                                    <img
                                        src="/img/alejandra_restrepo_new.png"
                                        alt="Alejandra Restrepo"
                                        className="w-56 h-56 rounded-full object-cover object-top border-4 border-diria-darker shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="text-white font-bold text-2xl mb-2">Alejandra Restrepo</div>
                            <div className="text-sm text-diria-neonBlue uppercase tracking-widest font-bold mb-6">Chief of Staff</div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-diria-neonGreen/50 rounded-full transition-all duration-300 flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-diria-neonGreen animate-pulse"></span>
                            <span className="text-white font-medium group-hover:text-diria-neonGreen transition-colors">Contáctanos</span>
                            <Mail className="w-4 h-4 text-diria-muted group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsContactOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-diria-card border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                        >
                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="absolute top-4 right-4 text-diria-muted hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h3 className="text-2xl font-heading font-bold text-white mb-2">Hablemos</h3>
                            <p className="text-diria-muted mb-6">Envíanos un mensaje y nuestro equipo te contactará pronto.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                                    <input type="text" id="name" name="name" required className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-diria-neonGreen focus:ring-1 focus:ring-diria-neonGreen outline-none transition-all" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input type="email" id="email" name="email" required className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-diria-neonGreen focus:ring-1 focus:ring-diria-neonGreen outline-none transition-all" placeholder="tu@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mensaje</label>
                                    <textarea id="message" name="message" rows={4} required className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-diria-neonGreen focus:ring-1 focus:ring-diria-neonGreen outline-none transition-all" placeholder="¿Cómo podemos ayudarte?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-diria-neonGreen text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                                    <span>Enviar Mensaje</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
