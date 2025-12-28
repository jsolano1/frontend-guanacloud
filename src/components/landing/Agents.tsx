import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, BrainCircuit, BarChart3, CalendarClock, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AGENT_DATA, type Agent } from './AgentsData';
import { useContact } from '../../context/ContactContext';


export const Agents: React.FC = () => {
    const { t } = useLanguage();
    const { openContact } = useContact();
    const agents = [
        {
            id: 'support',
            icon: Bot,
            title: 'Support Agent (L0)',
            nickname: 'Cima Guaitil',
            descKey: 'agent_guaitil_desc',
            borderColor: 'group-hover:border-emerald-400',
            iconColor: 'text-emerald-400',
            bgGradient: 'from-emerald-500/10 to-transparent'
        },
        {
            id: 'knowledge',
            icon: BrainCircuit,
            title: 'Knowledge Agent',
            nickname: 'Cima Nicoya',
            descKey: 'agent_nicoya_desc',
            borderColor: 'group-hover:border-[#FFBF00]',
            iconColor: 'text-[#FFBF00]',
            bgGradient: 'from-[#FFBF00]/10 to-transparent'
        },
        {
            id: 'analytics',
            icon: BarChart3,
            title: 'Analytics Agent',
            nickname: 'Cima Santa Cruz',
            descKey: 'agent_santacruz_desc',
            borderColor: 'group-hover:border-cyan-400',
            iconColor: 'text-cyan-400',
            bgGradient: 'from-cyan-500/10 to-transparent'
        },
        {
            id: 'assistant',
            icon: CalendarClock,
            title: 'Personal Assistant',
            nickname: 'Cima Nandayure',
            descKey: 'agent_nandayure_desc',
            borderColor: 'group-hover:border-[#FF1654]',
            iconColor: 'text-[#FF1654]',
            bgGradient: 'from-[#FF1654]/10 to-transparent'
        }
    ];

    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    const openModal = (key: string) => {
        setSelectedAgent(AGENT_DATA[key]);
        document.body.style.overflow = 'hidden'; // Bloquea el scroll
    };

    const closeModal = () => {
        setSelectedAgent(null);
        document.body.style.overflow = ''; // Libera el scroll
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section id="product" className="py-24 relative bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{t('agents_title')}</h2>
                    <p className="text-diria-muted max-w-2xl mx-auto text-lg">{t('agents_subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agents.map((agent) => {
                        const Icon = agent.icon;
                        return (
                            <div key={agent.id} className={`group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 transition-all duration-500`}>
                                {/* Inner Card */}
                                <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-8 overflow-hidden border border-white/5 transition-colors group-hover:border-transparent">

                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${agent.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${agent.iconColor} group-hover:bg-white/10 transition-colors`}>
                                                <Icon size={32} strokeWidth={1.5} />
                                            </div>
                                            <div className={`text-xs font-mono uppercase tracking-wider py-1 px-3 rounded-full border border-white/10 bg-black/50 ${agent.iconColor}`}>
                                                {agent.nickname}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{agent.title}</h3>

                                        <p className="text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-gray-300">
                                            {t(agent.descKey as any)}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <button onClick={() => openModal(agent.id)} > Explorar Agente </button>
                                            <ArrowUpRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedAgent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={closeModal}>
                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border rounded-3xl shadow-2xl"
                        style={{ borderColor: `${selectedAgent.color}40` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* --- HEADER CON BOTÓN Y CIERRE --- */}
                        <div className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-md p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">

                                {/* LLAMADA AL ICONO DINÁMICO */}
                                {selectedAgent.icon && (
                                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10" style={{ color: selectedAgent.color }}>
                                        {/* Creamos una constante con Mayúscula para que React la reconozca */}
                                        {(() => {
                                            const AgentIcon = selectedAgent.icon;
                                            return <AgentIcon size={24} strokeWidth={1.5} />;
                                        })()}
                                    </div>
                                )}
                                <h2 className="font-bold text-2xl tracking-tight" style={{ color: selectedAgent.color }}>
                                    {selectedAgent.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="hidden md:block px-6 py-2 rounded-full font-bold text-sm text-black transition hover:scale-105"
                                    style={{ backgroundColor: selectedAgent.color }}>
                                    Solicitar Demo
                                </button>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                            </div>
                        </div>

                        {/* --- CONTENIDO --- */}
                        <div className="p-6 md:p-8">
                            {/* Descripción más compacta */}
                            <p className="text-base text-gray-300 leading-snug mb-8 border-l-2 pl-4 italic" style={{ borderColor: `${selectedAgent.color}40` }}>
                                {selectedAgent.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                                {/* USOS */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                        Usos Principales
                                    </h3>
                                    <ul className="space-y-2"> {/* Interlineado reducido */}
                                        {selectedAgent.uses.map((use, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: selectedAgent.color }}></span>
                                                <span className="leading-tight">{use}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* SERVICIOS */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                        Servicios
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedAgent.services.map((service, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: selectedAgent.color }}></span>
                                                <span className="leading-tight">{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* DEPARTAMENTOS (Versión compacta) */}
                            <div className="mt-10 pt-6 border-t border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: selectedAgent.color }}>
                                    Departamentos Aplicables
                                </p>
                                <p className="text-gray-500 font-mono text-xs">{selectedAgent.departments}</p>
                            </div>

                            {/* Botón visible solo en móviles al final (opcional) */}
                            <div className="md:hidden mt-8">
                                <button onClick={openContact}
                                    className="w-full py-4 rounded-xl font-bold text-black" style={{ backgroundColor: selectedAgent.color }}>
                                    Solicitar Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>

    );
};


