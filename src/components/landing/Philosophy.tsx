import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'nature' | 'heritage' | 'cloud';

export const Philosophy: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('nature');

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: 'nature', label: 'Naturaleza', icon: '🌳' },
        { id: 'heritage', label: 'Herencia', icon: '🏺' },
        { id: 'cloud', label: 'Tecnología', icon: '☁️' },
    ];

    return (
        <section id="about" className="py-24 bg-diria-darker/90 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Intro */}
                <div className="text-center mb-20">
                    <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-4 block">
                        De la Provincia Más Sabia del Planeta
                    </span>
                    <h2
                        className="text-3xl md:text-5xl font-heading font-bold text-white mb-8"
                        dangerouslySetInnerHTML={{ __html: t('about_origin_title').replace('\n', '<br/>') }}
                    />
                    <div className="max-w-4xl mx-auto text-lg text-diria-muted font-light space-y-6 leading-relaxed">
                        <p dangerouslySetInnerHTML={{ __html: t('about_origin_p1') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('about_origin_p2') }} />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-24">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full border transition font-medium flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-white/10 border-diria-neonGreen text-white'
                                    : 'border-white/10 text-diria-muted hover:text-white'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-5xl mx-auto bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10"
                            >
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-6">{t(`pillar_${activeTab}_title` as any)}</h3>
                                        <p className="text-diria-muted mb-6">{t(`pillar_${activeTab}_desc` as any)}</p>

                                        {activeTab === 'nature' && (
                                            <ul className="space-y-4 text-gray-300">
                                                <li className="flex gap-3"><span className="text-diria-neonGreen">🌿</span><span><strong>Raíces Micorrízicas:</strong> Comparten recursos.</span></li>
                                                <li className="flex gap-3"><span className="text-diria-neonGreen">🦜</span><span><strong>La Lapa Roja:</strong> Comunicación constante.</span></li>
                                                <li className="flex gap-3"><span className="text-diria-neonGreen">🐒</span><span><strong>El Mono Congo:</strong> Alerta temprana.</span></li>
                                            </ul>
                                        )}
                                        {activeTab === 'heritage' && (
                                            <ul className="space-y-4 text-gray-300">
                                                <li className="flex gap-3"><span className="text-yellow-500">🏺</span><span><strong>Guaitil:</strong> Almacenamiento.</span></li>
                                                <li className="flex gap-3"><span className="text-yellow-500">🌟</span><span><strong>Nicoya:</strong> Predicción.</span></li>
                                                <li className="flex gap-3"><span className="text-yellow-500">📊</span><span><strong>Santa Cruz:</strong> Intercambio.</span></li>
                                            </ul>
                                        )}
                                        {activeTab === 'cloud' && (
                                            <ul className="space-y-4 text-gray-300">
                                                <li className="flex gap-3"><span className="text-diria-neonBlue">☁️</span><span><strong>Elasticidad:</strong> Escala según demanda.</span></li>
                                                <li className="flex gap-3"><span className="text-diria-neonBlue">🌍</span><span><strong>Distribución Global:</strong> Alcance mundial.</span></li>
                                                <li className="flex gap-3"><span className="text-diria-neonBlue">🛡️</span><span><strong>Resiliencia:</strong> Failover automático.</span></li>
                                            </ul>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center h-full">
                                        {activeTab === 'nature' ? (
                                            <div className="relative h-64 w-full rounded-2xl overflow-hidden">
                                                <img src="/img/guana_cloud_graphic.png" alt="Nature" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                            </div>
                                        ) : (
                                            <div className="text-9xl opacity-20">{tabs.find(t => t.id === activeTab)?.icon}</div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Ecosystem Diagram */}
                <div className="text-center mb-24">
                    <h3 className="text-2xl font-heading font-bold text-white mb-12">{t('ecosystem_title')}</h3>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                            <div className="text-4xl mb-4">🔧</div>
                            <h4 className="text-xl font-bold text-white mb-2">Ingeniería</h4>
                            <p className="text-sm text-diria-muted">Data Engineering, Analytics, Cloud Architecture.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-diria-neonGreen/30 bg-diria-neonGreen/5 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-diria-neonGreen text-black text-xs font-bold px-3 py-1 rounded-full">CORE</div>
                            <div className="text-4xl mb-4">🤖</div>
                            <h4 className="text-xl font-bold text-white mb-2">DirIA Platform</h4>
                            <p className="text-sm text-diria-muted">Orquestación Multi-Agente.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                            <div className="text-4xl mb-4">🌱</div>
                            <h4 className="text-xl font-bold text-white mb-2">Filosofía</h4>
                            <p className="text-sm text-diria-muted">Blue Zone Thinking.</p>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="text-center mb-16">
                    <h3 className="text-2xl font-heading font-bold text-white mb-12">{t('team_title')}</h3>
                    <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                        <div className="flex flex-col items-center group">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-diria-neonGreen/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
                                <img src="/img/jose_solano.png" alt="Jose Solano" className="relative w-48 h-48 rounded-full object-cover object-top border-2 border-diria-neonGreen ring-4 ring-diria-neonGreen/20 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="text-white font-bold text-xl">Jose Solano</div>
                            <div className="text-sm text-diria-neonGreen uppercase tracking-widest font-medium mt-1 mb-4">CEO</div>
                            <p className="text-diria-muted text-sm max-w-md text-center leading-relaxed">
                                {t('team_bio_jose' as any)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-diria-neonBlue/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
                                <img src="/img/alejandra_restrepo_new.png" alt="Alejandra Restrepo" className="relative w-48 h-48 rounded-full object-cover object-top border-2 border-diria-neonBlue ring-4 ring-diria-neonBlue/20 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="text-white font-bold text-xl">Alejandra Restrepo</div>
                            <div className="text-sm text-diria-neonBlue uppercase tracking-widest font-medium mt-1">Chief of Staff</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
