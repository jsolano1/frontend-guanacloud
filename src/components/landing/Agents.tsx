import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, BrainCircuit, BarChart3, CalendarClock, ArrowUpRight, X } from 'lucide-react';
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
                                            className="relative flex items-center justify-between px-6 py-3 rounded-xl border backdrop-blur-md font-medium transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 overflow-hidden hover:brightness-110"
                                            style={{
                                                borderColor: `${agent.color}40`,
                                                backgroundColor: `${agent.color}10`,
                                                color: agent.color
                                            }}
                                        >
                                            <span className="relative z-10">Explorar Agente</span>
                                            <ArrowUpRight size={18} className="relative z-10 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    onClick={closeModal}
                >
                    {/* Glow orb */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-pulse"
                        style={{ backgroundColor: selectedAgent.color }}
                    />

                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                        style={{
                            borderColor: `${selectedAgent.color}40`,
                            backgroundColor: 'rgba(10, 10, 10, 0.95)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal Header */}
                        <div
                            className="sticky top-0 z-20 backdrop-blur-xl p-6 border-b flex justify-between items-center"
                            style={{
                                borderColor: `${selectedAgent.color}20`,
                                backgroundColor: 'rgba(10, 10, 10, 0.9)'
                            }}
                        >
                            <div className="flex items-center gap-4">

                                {/* Icon */}
                                {selectedAgent.icon && (
                                    <div
                                        className="relative p-3 rounded-xl border backdrop-blur-md"
                                        style={{
                                            borderColor: `${selectedAgent.color}40`,
                                            backgroundColor: `${selectedAgent.color}10`
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl blur-lg opacity-50"
                                            style={{ backgroundColor: selectedAgent.color }}
                                        />
                                        {(() => {
                                            const AgentIcon = selectedAgent.icon;
                                            return (
                                                <AgentIcon
                                                    size={24}
                                                    strokeWidth={1.5}
                                                    style={{ color: selectedAgent.color }}
                                                    className="relative z-10"
                                                />
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Title */}
                                <h2
                                    className="font-bold text-2xl tracking-tight"
                                    style={{ color: selectedAgent.color }}
                                >
                                    {selectedAgent.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4">

                                {/* Demo Button */}
                                <button
                                    onClick={openContact}
                                    className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-black border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                                    style={{
                                        backgroundColor: selectedAgent.color,
                                        borderColor: selectedAgent.color
                                    }}
                                >
                                    <span>Solicitar Demo</span>
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center text-2xl"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8">

                            {/* Description */}
                            <p
                                className="text-base text-gray-300 leading-snug mb-8 border-l-2 pl-4 italic"
                                style={{ borderColor: `${selectedAgent.color}40` }}
                            >
                                {selectedAgent.description}
                            </p>

                            {/* Grid Content */}
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">

                                {/* Uses */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                        Usos Principales
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedAgent.uses.map((use, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                <span
                                                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: selectedAgent.color }}
                                                />
                                                <span className="leading-tight">{use}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Services */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                        Servicios
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedAgent.services.map((service, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                <span
                                                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: selectedAgent.color }}
                                                />
                                                <span className="leading-tight">{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Departments */}
                            <div className="mt-10 pt-6 border-t border-white/5">
                                <p
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                                    style={{ color: selectedAgent.color }}
                                >
                                    Departamentos Aplicables
                                </p>
                                <p className="text-gray-500 font-mono text-xs">
                                    {selectedAgent.departments}
                                </p>
                            </div>

                            {/* Mobile CTA */}
                            <div className="md:hidden mt-8">
                                <button
                                    onClick={openContact}
                                    className="w-full py-4 rounded-xl font-bold text-black"
                                    style={{ backgroundColor: selectedAgent.color }}
                                >
                                    Solicitar Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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