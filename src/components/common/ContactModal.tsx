import React from 'react';
import { Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContact } from '../../context/ContactContext';

export const ContactModal: React.FC = () => {
    const { isContactOpen, closeContact } = useContact();

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
                closeContact();
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
        <AnimatePresence>
            {isContactOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#111] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                    >
                        <button onClick={closeContact} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
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
    );
};