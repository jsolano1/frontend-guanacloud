import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Send, Bot, User, Loader2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const ConsolePage: React.FC = () => {
    const { t, language, toggleLanguage } = useLanguage();

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: 'assistant', content: t('console_welcome') }]);
        } else if (messages.length === 1 && messages[0].role === 'assistant') {
            setMessages([{ role: 'assistant', content: t('console_welcome') }]);
        }
    }, [language, t]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setIsLoading(true);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const response = await fetch(`${API_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'MESSAGE',
                    source: 'web_console',
                    user: { email: 'invitado_web@guanacloud.com' },
                    message: { text: userMessage }
                }),
            });

            if (!response.ok) throw new Error('Error en el servidor');

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.text || 'Lo siento, no pude procesar esa solicitud.'
            }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '⚠️ Error de conexión con el núcleo de DirIA.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col relative">

                {/* --- BOTÓN DE IDIOMA AGREGADO --- */}
                <div className="absolute -top-12 right-0 flex items-center gap-2 z-10">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-diria-neonGreen text-xs font-bold text-white transition-all"
                    >
                        <Globe size={14} className="text-diria-neonGreen" />
                        {language === 'es' ? 'ES' : 'EN'}
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-diria-neonGreen/10 text-diria-neonGreen border border-diria-neonGreen/20' : 'bg-white/10 text-white'}`}>
                                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'assistant' ? 'bg-diria-card border border-white/5' : 'bg-diria-neonBlue/10 border border-diria-neonBlue/20 text-white'}`}>
                                {/* Soporte básico para Markdown/Saltos de línea */}
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-diria-neonGreen/10 text-diria-neonGreen border border-diria-neonGreen/20 flex items-center justify-center">
                                <Bot size={20} />
                            </div>
                            <div className="bg-diria-card border border-white/5 p-4 rounded-2xl">
                                <Loader2 className="w-5 h-5 animate-spin text-diria-neonGreen" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('console_placeholder')}
                        disabled={isLoading}
                        className="w-full bg-diria-card border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder-diria-muted focus:outline-none focus:border-diria-neonGreen/50 transition-colors disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        title={t('console_send')}
                        className="absolute right-2 top-2 p-2 bg-diria-neonGreen text-black rounded-xl hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};