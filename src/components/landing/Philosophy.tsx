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

            </div>
        </section>
    );
};
