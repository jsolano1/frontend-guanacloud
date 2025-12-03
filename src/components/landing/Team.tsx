import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Team: React.FC = () => {
    const { t } = useLanguage();
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/xdkqzrdw', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert("¡Mensaje enviado con éxito! El equipo de GuanaCloud te contactará pronto.");
                form.reset();
                setIsContactOpen(false);
            } else {
                alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escribe a info@guanacloud.com");
            }
        } catch (error) {
            alert("Error de conexión.");
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    };

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

                    {/* Botón que abre el Modal */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-full transition-all duration-300 flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">Contáctanos</span>
                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal con Formulario */}
            <AnimatePresence>
                {isContactOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[#111] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                        >
                            <button onClick={() => setIsContactOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-2">Hablemos</h3>
                            <p className="text-gray-400 mb-6">Envíanos un mensaje y nuestro equipo te contactará pronto.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Nombre"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                />
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="Mensaje"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                ></textarea>

                                <button type="submit" className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                                    Enviar <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};