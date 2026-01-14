import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, BrainCircuit, BarChart3, CalendarClock, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AGENT_DATA, type Agent } from './AgentsData';

export const Agents: React.FC = () => {
    const { t } = useLanguage();

    const agents = [
        {
            id: 'support',
            icon: Bot,
            title: 'Support Agent (L0)',
            nickname: 'Cima Guaitil',
            descKey: 'agent_guaitil_desc',
            color: '#10b981', // emerald-500
        },
        {
            id: 'knowledge',
            icon: BrainCircuit,
            title: 'Knowledge Agent',
            nickname: 'Cima Nicoya',
            descKey: 'agent_nicoya_desc',
            color: '#FFBF00',
        },
        {
            id: 'analytics',
            icon: BarChart3,
            title: 'Analytics Agent',
            nickname: 'Cima Santa Cruz',
            descKey: 'agent_santacruz_desc',
            color: '#22d3ee', // cyan-400
        },
        {
            id: 'assistant',
            icon: CalendarClock,
            title: 'Personal Assistant',
            nickname: 'Cima Nandayure',
            descKey: 'agent_nandayure_desc',
            color: '#FF1654',
        }
    ];

    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    const openModal = (key: string) => {
        setSelectedAgent(AGENT_DATA[key]);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedAgent(null);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section id="agents" className="py-48 relative bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ========== HEADER ========== */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                        <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                            {t('agents_badge')}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        <span className="inline-block text-white">
                            {t('agents_title')}
                        </span>{' '}
                        <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                {t('agents_title_1')}
                            </span>
                        </span>
                    </h2>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t('agents_subtitle')}
                    </p>
                </div>
            </div>

            {/* ========== AGENTS GRID ========== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {agents.map((agent) => {
                        const Icon = agent.icon;
                        return (
                            <div key={agent.id} className="group relative">

                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
                                    style={{
                                        background: `radial-gradient(circle at center, ${agent.color}20, transparent 70%)`
                                    }}
                                />

                                {/* Main Card */}
                                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]">

                                    {/* Gradient overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(135deg, ${agent.color}40 0%, transparent 60%)`
                                        }}
                                    />

                                    {/* Corner accents */}
                                    <div
                                        className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl opacity-20 group-hover:opacity-60 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                                        style={{ borderColor: agent.color }}
                                    />
                                    <div
                                        className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl opacity-20 group-hover:opacity-60 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                                        style={{ borderColor: agent.color }}
                                    />

                                    {/* Card Content */}
                                    <div className="relative z-10 p-8 flex flex-col h-full">

                                        {/* Header: Icon + Badge */}
                                        <div className="flex justify-between items-start mb-6">

                                            {/* Icon */}
                                            <div className="relative group/icon">
                                                <div
                                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                                                    style={{ backgroundColor: agent.color }}
                                                />
                                                <div
                                                    className="relative p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-110"
                                                    style={{
                                                        borderColor: `${agent.color}40`,
                                                        backgroundColor: `${agent.color}10`
                                                    }}
                                                >
                                                    <Icon
                                                        size={32}
                                                        strokeWidth={1.5}
                                                        style={{ color: agent.color }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Nickname Badge */}
                                            <div
                                                className="px-4 py-2 rounded-full border backdrop-blur-md text-xs font-mono uppercase tracking-wider transition-all duration-300 group-hover:scale-105"
                                                style={{
                                                    borderColor: `${agent.color}30`,
                                                    backgroundColor: `${agent.color}10`,
                                                    color: agent.color
                                                }}
                                            >
                                                {agent.nickname}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white mb-4 transition-colors">
                                            {agent.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                                            {t(agent.descKey as any)}
                                        </p>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => openModal(agent.id)}
                                            className={`
                mt-auto w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500
                /* MOBILE: Sólido y visible */
                bg-white/10 text-white border border-white/10
                /* DESKTOP: Se oculta y aparece con el color del agente */
                md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
            `}
                                            style={{
                                                // En hover de desktop usamos el color del agente
                                                borderColor: `${agent.color}40`,
                                                backgroundColor: `${agent.color}10`,
                                                color: agent.color
                                            }}
                                        >
                                            Explorar Agente
                                        </button>

                                        {/* Decorative dots */}
                                        <div className="absolute top-4 left-4 flex gap-1.5">
                                            <div
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{
                                                    backgroundColor: agent.color,
                                                    opacity: 0.6
                                                }}
                                            />
                                            <div
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{
                                                    backgroundColor: agent.color,
                                                    opacity: 0.4,
                                                    animationDelay: '0.5s'
                                                }}
                                            />
                                            <div
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{
                                                    backgroundColor: agent.color,
                                                    opacity: 0.2,
                                                    animationDelay: '1s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ========== MODAL ========== */}
            {selectedAgent && (
                <div
                    className="fixed inset-0 z-[10000] flex items-start md:items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-hidden"
                    onClick={closeModal}
                >
                    {/* Glow ambiental */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                        style={{ backgroundColor: selectedAgent.color }}
                    />

                    {/* CONTENEDOR - Añadido mt-20 en mobile para bajarlo del Navbar */}
                    <div
                        className="relative w-full max-w-4xl mt-20 md:mt-0 max-h-[75vh] md:max-h-[90vh] overflow-hidden rounded-[2rem] border backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col"
                        style={{
                            borderColor: `${selectedAgent.color}40`,
                            backgroundColor: 'rgba(10, 10, 10, 0.98)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Sticky */}
                        <div className="sticky top-0 z-50 p-6 border-b flex justify-between items-center"
                            style={{ borderColor: `${selectedAgent.color}20`, backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>

                            <div className="flex items-center gap-3 md:gap-4">
                                {/* Icono del Agente */}
                                {selectedAgent.icon && (
                                    <div
                                        className="relative p-2.5 md:p-3 rounded-xl border backdrop-blur-md"
                                        style={{
                                            borderColor: `${selectedAgent.color}40`,
                                            backgroundColor: `${selectedAgent.color}10`
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl blur-md opacity-30"
                                            style={{ backgroundColor: selectedAgent.color }}
                                        />
                                        {(() => {
                                            const AgentIcon = selectedAgent.icon;
                                            return (
                                                <AgentIcon
                                                    size={22}
                                                    strokeWidth={1.5}
                                                    style={{ color: selectedAgent.color }}
                                                    className="relative z-10"
                                                />
                                            );
                                        })()}
                                    </div>
                                )}
                                <h2 className="font-black text-xl md:text-2xl tracking-tighter uppercase" style={{ color: selectedAgent.color }}>
                                    {selectedAgent.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Botón Demo con Texto Persuasivo */}
                                <button
                                    onClick={() => {
                                        const subject = encodeURIComponent(`Solicitud de Implementación: ${selectedAgent.title}`);
                                        const body = encodeURIComponent(
                                            `Hola equipo de Guana Cloud,\n\nHe estado analizando el potencial de su agente "${selectedAgent.title}" y estoy muy interesado en entender cómo esta tecnología puede optimizar nuestra infraestructura actual.\n\nMe gustaría agendar una breve sesión para discutir:\n1. Integración con nuestros sistemas.\n2. Escalabilidad del agente en nuestro flujo de trabajo.\n3. Modelos de implementación.\n\nQuedo atento a su disponibilidad.\n\nSaludos,\n[Nombre / Empresa]`
                                        );
                                        window.location.href = `mailto:info@guanacloud.com?subject=${subject}&body=${body}`;
                                    }}
                                    className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95"
                                    style={{ backgroundColor: selectedAgent.color }}
                                >
                                    Solicitar Demo
                                    <ArrowUpRight size={14} />
                                </button>

                                <button onClick={closeModal} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* CONTENIDO SCROLLABLE */}
                        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                            {/* Descripción */}
                            <p
                                className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 border-l-2 pl-6 italic"
                                style={{ borderColor: `${selectedAgent.color}60` }}
                            >
                                {selectedAgent.description}
                            </p>

                            {/* Grid Content */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Usos Principales */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                                        <span className="w-4 h-[1px]" style={{ backgroundColor: selectedAgent.color }} />
                                        Usos Principales
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedAgent.uses.map((use, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400 group">
                                                <span
                                                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,255,157,0.5)]"
                                                    style={{ backgroundColor: selectedAgent.color }}
                                                />
                                                <span className="leading-snug group-hover:text-gray-200 transition-colors">{use}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Servicios */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                                        <span className="w-4 h-[1px]" style={{ backgroundColor: selectedAgent.color }} />
                                        Servicios
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedAgent.services.map((service, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400 group">
                                                <span
                                                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: selectedAgent.color }}
                                                />
                                                <span className="leading-snug group-hover:text-gray-200 transition-colors">{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Departments */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <p
                                        className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                                        style={{ color: selectedAgent.color }}
                                    >
                                        Departamentos Aplicables
                                    </p>
                                    <p className="text-gray-500 font-mono text-[11px] uppercase tracking-wider">
                                        {selectedAgent.departments}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Demo CTA */}
                            <div className="md:hidden mt-6 pb-4">
                                <button
                                    onClick={() => {
                                        const subject = encodeURIComponent(`Interés en Agente: ${selectedAgent.title}`);
                                        const body = encodeURIComponent(`Hola Guana Cloud, me interesa implementar ${selectedAgent.title}. ¿Podemos agendar una demo?`);
                                        window.location.href = `mailto:info@guanacloud.com?subject=${subject}&body=${body}`;
                                    }}
                                    className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-black"
                                    style={{ backgroundColor: selectedAgent.color }}
                                >
                                    Solicitar Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .custom-scrollbar::-webkit-scrollbar-thumb { 
        background: rgba(255,255,255,0.1); 
        border-radius: 10px; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
    @media (max-width: 768px) {

  /* Forzamos que la tarjeta siempre tenga el borde iluminado */
  .agent-card {
    border-color: rgba(255, 255, 255, 0.2) !important;
    background: rgba(255, 255, 255, 0.04) !important;
  }

  /* Hacemos que el botón "Explorar" sea siempre visible en mobile */
  .explore-button {
    opacity: 1 !important;
    transform: translateY(0) !important;
    background-color: var(--agent-color) !important;
    color: black !important;
  }

  /* El icono del agente siempre con brillo */
  .agent-icon-container {
    transform: scale(1.05) !important;
    box-shadow: 0 0 20px var(--agent-glow-color) !important;
  }
}

`}} />

            {/* Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }
                `
            }} />
        </section>
    );
};