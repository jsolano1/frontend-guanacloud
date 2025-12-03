import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Agents: React.FC = () => {
    const { t } = useLanguage();

    const agents = [
        {
            id: 'guaitil',
            icon: '🏺',
            title: 'Support Agent (L0)',
            nickname: 'Cima Guaitil',
            descKey: 'agent_guaitil_desc',
            color: 'text-diria-neonGreen',
            glow: 'bg-diria-neonGreen/10'
        },
        {
            id: 'nicoya',
            icon: '🌟',
            title: 'Knowledge Agent',
            nickname: 'Cima Nicoya',
            descKey: 'agent_nicoya_desc',
            color: 'text-yellow-400',
            glow: 'bg-yellow-500/10'
        },
        {
            id: 'santacruz',
            icon: '📊',
            title: 'Analytics Agent',
            nickname: 'Cima Santa Cruz',
            descKey: 'agent_santacruz_desc',
            color: 'text-diria-neonBlue',
            glow: 'bg-diria-neonBlue/10'
        },
        {
            id: 'nandayure',
            icon: '🗓️',
            title: 'Personal Assistant',
            nickname: 'Cima Nandayure',
            descKey: 'agent_nandayure_desc',
            color: 'text-red-400',
            glow: 'bg-red-500/10'
        }
    ];

    return (
        <section id="product" className="py-24 bg-diria-dark/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{t('agents_title')}</h2>
                    <p className="text-diria-muted max-w-2xl mx-auto">{t('agents_subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agents.map((agent) => (
                        <div key={agent.id} className="bg-diria-card p-8 rounded-3xl card-hover group relative overflow-hidden border border-white/5 hover:border-diria-neonGreen/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)]">
                            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 opacity-20 group-hover:opacity-40 ${agent.glow}`}></div>
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-3xl border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-lg">
                                {agent.icon}
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-diria-neonGreen transition-colors">{agent.title}</h3>
                            <p className={`text-sm font-mono mb-4 ${agent.color} tracking-wider uppercase opacity-80 group-hover:opacity-100`}>{agent.nickname}</p>
                            <p className="text-diria-muted leading-relaxed group-hover:text-gray-300 transition-colors">{t(agent.descKey as any)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
