import { useLanguage } from '../../context/LanguageContext';

export const Philosophy: React.FC = () => {
    const { t } = useLanguage();


    return (
        <section id="about" className="py-16 relative overflow-hidden bg-diria-darker">
            {/* Decoración de fondo para conectar con la "Sabiduría" */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-diria-neonGreen/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-diria-neonBlue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Contenedor Principal con Glassmorphism sutil */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-4 block drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]">
                            De la Provincia Más Sabia del Planeta
                        </span>

                        <h2
                            className="text-4xl md:text-6xl font-heading font-bold text-white mb-10 leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: t('about_origin_title').replace('\n', '<br/>') }}
                        />

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
                                {/* EFECTO DE PULSO NEÓN */}
                                <span className="absolute inset-0 rounded-full bg-[#00ff9d] animate-ping opacity-7 group-hover/btn:opacity-80 pointer-events-none" />

                                {/* RESPLANDOR BASE (GLOW) */}
                                <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,255,157,0.6)] group-hover/btn:shadow-[0_0_50px_rgba(0,255,157,0.8)] transition-all duration-500" />

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
