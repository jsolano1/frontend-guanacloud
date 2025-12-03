import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
    const { t } = useLanguage();

    const services = [
        {
            id: 'de',
            icon: '🏗️',
            titleKey: 'service_de_title',
            descKey: 'service_de_desc',
            img: '/img/service_data_eng.png',
            className: 'bento-item-large md:col-span-2 md:row-span-2'
        },
        {
            id: 'ml',
            icon: '🤖',
            titleKey: 'service_ml_title',
            descKey: 'service_ml_desc',
            img: '/img/service_ml.png',
            className: 'md:row-span-2'
        },
        {
            id: 'da',
            icon: '📈',
            titleKey: 'service_da_title',
            descKey: 'service_da_desc',
            img: '/img/service_data_analyst.png',
            className: ''
        },
        {
            id: 'ds',
            icon: '🔬',
            titleKey: 'service_ds_title',
            descKey: 'service_ds_desc',
            img: '/img/service_data_science.png',
            className: ''
        }
    ];

    return (
        <section id="services" className="py-24 bg-black/50 border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{t('services_title')}</h2>
                    <p className="text-diria-muted max-w-2xl mx-auto text-lg">{t('services_subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`relative rounded-3xl border border-white/10 overflow-hidden group hover:border-diria-neonGreen/50 transition-all ${service.className}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${service.img}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300"></div>
                            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl md:text-3xl font-bold text-white mb-3">{t(service.titleKey as any)}</h3>
                                <p className="text-gray-200 text-sm md:text-lg leading-relaxed">{t(service.descKey as any)}</p>
                            </div>
                        </motion.div>
                    ))}
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
            </div>
        </section>
    );
};
