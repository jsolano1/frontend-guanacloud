import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, BrainCircuit, BarChart3, CalendarClock, ArrowUpRight } from 'lucide-react';

export const Agents: React.FC = () => {
    const { t } = useLanguage();

    const agents = [
        {
            id: 'guaitil',
            icon: Bot,
            title: 'Support Agent (L0)',
            nickname: 'Cima Guaitil',
            descKey: 'agent_guaitil_desc',
            borderColor: 'group-hover:border-emerald-400',
            iconColor: 'text-emerald-400',
            bgGradient: 'from-emerald-500/10 to-transparent'
        },
        {
            id: 'nicoya',
            icon: BrainCircuit,
            title: 'Knowledge Agent',
            nickname: 'Cima Nicoya',
            descKey: 'agent_nicoya_desc',
            borderColor: 'group-hover:border-yellow-400',
            iconColor: 'text-yellow-400',
            bgGradient: 'from-yellow-500/10 to-transparent'
        },
        {
            id: 'santacruz',
            icon: BarChart3,
            title: 'Analytics Agent',
            nickname: 'Cima Santa Cruz',
            descKey: 'agent_santacruz_desc',
            borderColor: 'group-hover:border-cyan-400',
            iconColor: 'text-cyan-400',
            bgGradient: 'from-cyan-500/10 to-transparent'
        },
        {
            id: 'nandayure',
            icon: CalendarClock,
            title: 'Personal Assistant',
            nickname: 'Cima Nandayure',
            descKey: 'agent_nandayure_desc',
            borderColor: 'group-hover:border-rose-400',
            iconColor: 'text-rose-400',
            bgGradient: 'from-rose-500/10 to-transparent'
        }
    ];

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
                                            <span>Explorar capacidad</span>
                                            <ArrowUpRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};