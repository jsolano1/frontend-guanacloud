import React, { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Send, Bot, User } from 'lucide-react';

export const ConsolePage: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: 'Hola, soy DirIA. ¿En qué puedo ayudarte hoy?' }
    ]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Entendido. Estoy procesando tu solicitud con el agente Cima Guaitil...' }]);
        }, 1000);
        setInput('');
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-diria-neonGreen/10 text-diria-neonGreen border border-diria-neonGreen/20' : 'bg-white/10 text-white'}`}>
                                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'assistant' ? 'bg-diria-card border border-white/5' : 'bg-diria-neonBlue/10 border border-diria-neonBlue/20 text-white'}`}>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe tu consulta a DirIA..."
                        className="w-full bg-diria-card border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder-diria-muted focus:outline-none focus:border-diria-neonGreen/50 transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-2 p-2 bg-diria-neonGreen text-black rounded-xl hover:bg-white transition"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};
