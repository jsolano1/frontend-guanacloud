import { useLanguage } from '../../context/LanguageContext';

export const Philosophy: React.FC = () => {
    const { t } = useLanguage();


    return (
        <section id="about" className="py-16 relative overflow-hidden bg-diria-darker">
            {/* Decoración de fondo para conectar con la "Sabiduría" */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-diria-neonGreen/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-diria-neonBlue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* ========== HEADER ========== */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                            <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                                {t('philosophy_badge')}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black mb-6">
                            <span className="inline-block text-white">
                                {t('philosophy_title')}
                            </span>{' '}
                            <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                    {t('philosophy_title_1')}
                                </span>
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Contenedor Principal con Glassmorphism sutil */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">

                        {/* Cuerpo de texto con mejor ritmo visual */}
                        <div className="text-lg md:text-xl text-gray-400 font-light space-y-8 leading-relaxed mb-16">
                            <p
                                className="relative inline-block"
                                dangerouslySetInnerHTML={{ __html: t('about_origin_p1') }}
                            />
                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-diria-neonGreen/50 to-transparent mx-auto" />
                            <p dangerouslySetInnerHTML={{ __html: t('about_origin_p2') }} />
                        </div>

                        {/* BOTÓN VERDE NEÓN DE CONEXIÓN */}
                        <div className="flex justify-center group/btn">
                            <a
                                href="/philosophy"
                                className="relative px-10 py-5 rounded-full bg-[#00ff9d] text-black font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 overflow-visible"
                            >
                                {/* EFECTO HALO DE RESPIRACIÓN */}
                                <div className="absolute inset-0 rounded-full bg-diria-neonBlue/100 animate-pulse-slow blur-md pointer-events-none" />

                                {/* GLOW DE HOVER */}
                                <div className="absolute inset-0 rounded-full bg-diria-neonGreen opacity-0 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-700 ease-in-out -z-10" />

                                <span className="relative flex items-center gap-3">
                                    Nuestra Filosofía
                                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300 text-xl font-light">
                                        ➔
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Detalle visual: Coordenadas o dato de Zona Azul */}
                    <div className="flex justify-center items-center gap-4 opacity-30">
                        <div className="h-px w-12 bg-white/20" />
                        <span className="font-mono text-[10px] text-white tracking-[0.5em] uppercase">
                            Nicoya Blue Zone • 10.1477° N, 85.4411° W
                        </span>
                        <div className="h-px w-12 bg-white/20" />
                    </div>
                </div>
            </div>
        </section>
    );
};
