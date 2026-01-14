import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Database, Brain, BarChart3, Sparkles, Lightbulb } from 'lucide-react';

export const Services: React.FC = () => {
    const { t } = useLanguage();

    const services = [
        {
            id: 'de',
            icon: Database,
            titleKey: 'service_de_title',
            descKey: 'service_de_desc',
            img: '/img/service_data_eng.png',
            color: '#06b6d4',
            gradient: 'from-cyan-500/20 to-blue-500/20'
        },
        {
            id: 'ml',
            icon: Brain,
            titleKey: 'service_ml_title',
            descKey: 'service_ml_desc',
            img: '/img/service_ml.png',
            color: '#a855f7',
            gradient: 'from-purple-500/20 to-pink-500/20'
        },
        {
            id: 'da',
            icon: BarChart3,
            titleKey: 'service_da_title',
            descKey: 'service_da_desc',
            img: '/img/service_data_analyst.png',
            color: '#10b981',
            gradient: 'from-emerald-500/20 to-teal-500/20'
        },
        {
            id: 'ds',
            icon: Sparkles,
            titleKey: 'service_ds_title',
            descKey: 'service_ds_desc',
            img: '/img/service_data_science.png',
            color: '#f59e0b',
            gradient: 'from-amber-500/20 to-orange-500/20'
        },
        {
            id: 'consulting',
            icon: Lightbulb,
            titleKey: 'service_consulting_title',
            descKey: 'service_consulting_desc',
            img: '/img/service_ai.png',
            color: '#FF1654',
            gradient: 'from-#FF1654/20 to-red-500/20'
        }
    ];

    return (
        <section id="services" className="py-20 bg-gradient-to-b from-black via-[#050505] to-black relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `
                    linear-gradient(rgba(0,255,157,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,157,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* ========== HEADER ========== */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                            <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                                {t('services_badge')}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black mb-6">
                            <span className="inline-block text-white">
                                {t('services_title')}
                            </span>{' '}
                            <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                    {t('services_title_1')}
                                </span>
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {t('services_subtitle')}
                        </p>
                    </div>
                </div>

                {/* Featured Service - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="group relative rounded-3xl overflow-hidden h-[400px]">

                        {/* Background */}
                        <div className="absolute inset-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${services[0].img}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${services[0].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        </div>

                        {/* Glass Card */}
                        <div className="absolute inset-0 border border-white/10 backdrop-blur-[2px] group-hover:border-white/20 group-hover:backdrop-blur-sm transition-all duration-500">

                            {/* Glow */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    boxShadow: `inset 0 0 30px ${services[0].color}40, 0 0 30px ${services[0].color}20`
                                }}
                            />

                            {/* Corners */}
                            <div
                                className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 rounded-tr-2xl opacity-20 group-hover:opacity-60 group-hover:w-20 group-hover:h-20 transition-all duration-500"
                                style={{ borderColor: services[0].color }}
                            />
                            <div
                                className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 rounded-bl-2xl opacity-20 group-hover:opacity-60 group-hover:w-20 group-hover:h-20 transition-all duration-500"
                                style={{ borderColor: services[0].color }}
                            />

                            {/* Content */}
                            <div className="relative h-full p-12 flex flex-col justify-between max-w-3xl">

                                {/* Text */}
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="p-4 rounded-2xl border backdrop-blur-md"
                                            style={{
                                                borderColor: `${services[0].color}40`,
                                                backgroundColor: `${services[0].color}10`
                                            }}
                                        >
                                            <Database size={32} strokeWidth={1.5} style={{ color: services[0].color }} />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white">
                                            {t(services[0].titleKey as any)}
                                        </h3>
                                    </div>
                                    <p className="text-xl text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                        {t(services[0].descKey as any)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid 2x2 - Remaining Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.slice(1).map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden h-[350px]"
                            >

                                {/* Background */}
                                <div className="absolute inset-0">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${service.img}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                </div>

                                {/* Glass Card */}
                                <div className="absolute inset-0 border border-white/10 backdrop-blur-[2px] group-hover:border-white/20 group-hover:backdrop-blur-sm transition-all duration-500">

                                    {/* Glow */}
                                    <div
                                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            boxShadow: `inset 0 0 20px ${service.color}40, 0 0 20px ${service.color}20`
                                        }}
                                    />

                                    {/* Corner */}
                                    <div
                                        className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl opacity-20 group-hover:opacity-60 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                                        style={{ borderColor: service.color }}
                                    />

                                    {/* Content */}
                                    <div className="relative h-full p-8 flex flex-col justify-between">

                                        {/* Icon + Dots */}
                                        <div className="flex justify-between items-start">
                                            <div
                                                className="relative p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-110"
                                                style={{
                                                    borderColor: `${service.color}40`,
                                                    backgroundColor: `${service.color}10`
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                                                    style={{ backgroundColor: service.color }}
                                                />
                                                <Icon
                                                    size={28}
                                                    strokeWidth={1.5}
                                                    style={{ color: service.color }}
                                                    className="relative z-10"
                                                />
                                            </div>

                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.color, opacity: 0.6 }} />
                                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.color, opacity: 0.4, animationDelay: '0.5s' }} />
                                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.color, opacity: 0.2, animationDelay: '1s' }} />
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                {t(service.titleKey as any)}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                                {t(service.descKey as any)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Regional Presence */}
            <div className="mt-12 text-center">
                <p className="text-diria-muted text-sm uppercase tracking-widest mb-4">{t('presence_label')}</p>
                <div className="flex flex-wrap justify-center gap-4 text-white font-medium">
                    {['🇨🇷 Costa Rica', '🇵🇷 Puerto Rico', '🇨🇴 Colombia', '🇲🇽 México', '🇵🇦 Panamá'].map((country) => (
                        <span key={country} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition">
                            {country}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};