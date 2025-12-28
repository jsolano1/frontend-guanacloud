import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { TreePalm, Landmark, Cloud, Users, Zap, Shield, Globe, Database, Sprout, Bird } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- Types ---
type TabId = 'nature' | 'heritage' | 'technology';

interface TabContent {
    id: TabId;
    label: string;
    icon: React.ReactNode;
    color: string;
    title: string;
    intro: string;
    items: {
        icon: React.ReactNode;
        title: string;
        desc: string;
    }[];
    closing: string;
}

export const PhilosophyPage: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabId>('nature');

    // --- Tab Data ---
    const tabs: TabContent[] = [
        {
            id: 'nature',
            label: 'Resiliencia Natural',
            icon: <TreePalm size={18} />,
            color: '#00ff9d', // Verde Neón DirIA
            title: 'El Bosque Tropical Seco',
            intro: 'Un ecosistema maestro en eficiencia. Aquí, la escasez no es una limitante, sino el motor de la innovación evolutiva que ha perfeccionado la supervivencia.',
            items: [
                {
                    icon: <Sprout className="text-diria-neonGreen" size={24} />,
                    title: 'Raíces Interconectadas',
                    desc: 'Sistemas que comparten recursos vitales a través de redes micorrízicas subterráneas.'
                },
                {
                    icon: <Bird className="text-diria-neonGreen" size={24} />,
                    title: 'Comunicación Constante',
                    desc: 'La Lapa Roja y el Congo mantienen una red de alerta temprana y coordinación grupal.'
                },
                {
                    icon: <Zap className="text-diria-neonGreen" size={24} />,
                    title: 'Ciclos de Energía',
                    desc: 'Adaptación estacional extrema para conservar energía durante los meses de sequía.'
                },
                {
                    icon: <Shield className="text-diria-neonGreen" size={24} />,
                    title: 'Simbiosis Protectores',
                    desc: 'Especies que protegen a otras a cambio de sustento, creando un firewall biológico.'
                }
            ],
            closing: 'La naturaleza no compite por recursos, colabora para maximizarlos.'
        },
        {
            id: 'heritage',
            label: 'Arquitectura Ancestral',
            icon: <Landmark size={18} />,
            color: "#FFBF00",
            title: 'La Red Chorotega',
            intro: '1,500 años antes del cloud computing, esta civilización ya operaba bajo principios de distribución, redundancia y especialización comunitaria.',
            items: [
                {
                    icon: <Database className="#FFBF00" size={24} />,
                    title: 'Guaitil: Almacenamiento',
                    desc: 'Centros especializados en la preservación de granos y recursos para tiempos difíciles.'
                },
                {
                    icon: <Globe className="#FFBF00" size={24} />,
                    title: 'Santa Cruz: Intercambio',
                    desc: 'Nodos de comercio que conectaban regiones distantes, facilitando el flujo de valor.'
                },
                {
                    icon: <Users className="#FFBF00" size={24} />,
                    title: 'Nicoya: Gobernanza',
                    desc: 'El centro de toma de decisiones estratégicas basado en el consejo de ancianos.'
                },
                {
                    icon: <Landmark className="#FFBF00" size={24} />,
                    title: 'Estructura Distribuida',
                    desc: 'Sin un único punto de fallo, la cultura sobrevivió gracias a su descentralización.'
                }
            ],
            closing: 'La sabiduría no se centraliza, se distribuye para perdurar.'
        },
        {
            id: 'technology',
            label: 'Tecnología Viva',
            icon: <Cloud size={18} />,
            color: "#00ccff",
            title: 'Escalando la Sabiduría',
            intro: 'GuanaCloud fusiona estos principios milenarios con la arquitectura moderna. No inventamos la colaboración, simplemente la digitalizamos a escala global.',
            items: [
                {
                    icon: <Cloud className="text-diria-neonBlue" size={24} />,
                    title: 'Elasticidad Orgánica',
                    desc: 'Infraestructura que respira y se adapta a la carga, igual que el bosque a la estación.'
                },
                {
                    icon: <Globe className="text-diria-neonBlue" size={24} />,
                    title: 'Red Global',
                    desc: 'Nodos interconectados que replican la eficiencia del comercio ancestral chorotega.'
                },
                {
                    icon: <Shield className="text-diria-neonBlue" size={24} />,
                    title: 'Resiliencia Activa',
                    desc: 'Sistemas inmunes digitales que detectan y neutralizan amenazas en tiempo real.'
                },
                {
                    icon: <Zap className="text-diria-neonBlue" size={24} />,
                    title: 'Agentes Autónomos',
                    desc: 'IA especializada que actúa coordinadamente, como las especies en un ecosistema.'
                }
            ],
            closing: 'De la raíz al a nube, los principios de supervivencia permanecen intactos.'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-diria-neonGreen selection:text-black">
            <Navbar />

            {/* SECCIÓN 1: PhilosophyHero */}

            <div className="relative pt-60 pb-26 px-6 overflow-hidden min-h-[90vh] flex items-center">
                {/* --- CAPA DE IMAGEN DE FONDO --- */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
                        alt="Montañas de Guanacaste"
                        className="w-full h-full object-cover opacity-30 scale-105"
                    />
                    {/* Overlays para fundir la imagen con el fondo oscuro*/}
                    <div className="absolute inset-0 bg-gradient-to-b from-diria-darker via-transparent to-diria-darker" />
                    <div className="absolute inset-0 bg-diria-darker/40" />
                </div>

                {/* --- ELEMENTOS DE GLOW --- */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-diria-neonGreen/10 blur-[150px] rounded-full pointer-events-none" />

                {/* --- CONTENIDO --- */}
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-8 block">
                        Somos esencia pura
                    </span>

                    <h1 className="text-5xl md:text-8xl font-heading font-bold mb-10 leading-[1.1]">
                        De la Provincia<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00ccff]">
                            Más Sabia del Planeta
                        </span>
                    </h1>

                    <p className="text-xl md:text-1.5xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                        Donde la Longevidad Enseñó Sistemas y las Montañas Enseñaron Perspectiva
                    </p>

                    <div className="flex justify-center mt-20">
                        <div className="w-[1px] h-16 bg-gradient-to-b from-diria-neonGreen/50 to-transparent" />
                    </div>
                </div>
            </div>

            {/* SECCIÓN 2: PhilosophyTabs */}
            <section className="relative py-8 bg-diria-darker">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* NAVEGACIÓN ESTÁTICA - FONDO OSCURO Y BORDES NEÓN */}
                    <div className="w-full flex justify-center mb-20 relative">
                        {/* Aura ambiental de fondo (Glow Effect sutil) */}
                        <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-transparent via-[#FF1654]/10 to-transparent pointer-events-none" />

                        <nav
                            className="inline-flex items-center p-1.5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
                            role="tablist"
                        >
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const tabColor = tab.color || '#FF1654';

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        style={{
                                            boxShadow: isActive ? `0 0 20px ${tabColor}33, inset 0 2px 4px ${tabColor}44` : 'none',
                                            borderColor: isActive ? tabColor : 'transparent',
                                        }}
                                        className={`
                        px-6 py-2.5 rounded-full border transition-all duration-500 font-bold 
                        flex items-center gap-2 text-xs md:text-sm whitespace-nowrap group relative overflow-hidden
                        ${isActive ? 'bg-[#111] scale-105' : 'bg-transparent hover:bg-white/5'}
                    `}
                                    >
                                        {/* Brillo de barrido (Hover effect) */}
                                        {!isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                        )}

                                        {/* Icono con glow dinámico */}
                                        <span
                                            style={{
                                                color: tabColor,
                                                filter: isActive ? `drop-shadow(0 0 8px ${tabColor})` : 'none'
                                            }}
                                            className="transition-all duration-300"
                                        >
                                            {tab.icon}
                                        </span>

                                        <span style={{ color: isActive ? 'white' : '#9ca3af' }}>
                                            {tab.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* CONTENIDO */}
                    <div className="min-h-[600px] relative">
                        <AnimatePresence mode="wait">
                            {tabs.map((tab) => (
                                activeTab === tab.id && (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ opacity: 0, y: 15 }} // Micro-interacción de entrada
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="w-full"
                                    >
                                        <div className="max-w-5xl mx-auto">
                                            {/* Header con Glow sutil en el texto */}
                                            <div className="text-center mb-16">
                                                <h2 className="text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                                                    {tab.title}
                                                </h2>
                                                <p
                                                    className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed border-l-4 pl-6 italic transition-colors duration-500"
                                                    style={{ borderColor: tab.color }}
                                                >
                                                    "{tab.intro}"
                                                </p>
                                            </div>

                                            {/* Grid de Tarjetas con Glassmorphism Avanzado */}
                                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                                {tab.items.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ y: -8 }} // Feedback visual inmediato
                                                        className="p-8 rounded-3xl relative overflow-hidden group transition-all duration-500"
                                                    >
                                                        {/* Fondo Glassmorphism con gradiente dinámico */}
                                                        <div className="absolute inset-0 bg-[#111]/80 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

                                                        {/* Resplandor de fondo dinámico (Glow Effect) */}
                                                        <div
                                                            className="absolute -inset-24 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                                                            style={{
                                                                background: `radial-gradient(circle, ${tab.color} 0%, transparent 70%)`,
                                                                filter: 'blur(40px)'
                                                            }}
                                                        />

                                                        <div className="relative z-10">
                                                            {/* Icon Container con Inner Glow */}
                                                            <div
                                                                className="mb-6 p-4 rounded-2xl bg-white/5 w-fit transition-all duration-500 group-hover:scale-110 shadow-2xl"
                                                                style={{
                                                                    color: tab.color,
                                                                    boxShadow: `0 0 20px ${tab.color}22` // Glow Effect sutil
                                                                }}
                                                            >
                                                                {item.icon}
                                                            </div>

                                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                                                {item.title}
                                                            </h3>

                                                            <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: FoundersSection */}
            <section className="py-16 relative overflow-hidden bg-diria-darker">
                {/* Fondo decorativo sutil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#00ff9d05_0%,_transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-4 block">Liderazgo Visionario</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">Los Guardianes de la Visión</h2>
                        <div className="w- 24 h-1 bg-gradient-to-r from-diria-neonGreen to-diria-neonBlue mx-auto mb-8 rounded-full" />
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light leading-relaxed">
                            Uniendo la experiencia corporativa global con la sabiduría ancestral local para construir tecnología con propósito y legado.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Jose Solano */}
                        <div className="group relative p-8 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-10">
                                    {/* Glow de fondo */}
                                    <div className="absolute inset-0 bg-[#00ff9d]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Contenedor de Imagen con Anillo de Luz */}
                                    <div className="relative p-1 rounded-full bg-gradient-to-b from-[#00ff9d] to-transparent shadow-[0_0_30px_rgba(0,255,157,0.2)]">
                                        <img
                                            src="/img/jose_solano.png"
                                            alt="Jose Solano"
                                            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-[0.98] group-hover:scale-100"
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-white font-bold text-3xl mb-1">Jose Solano</h3>
                                    <div className="text-xs uppercase tracking-[0.2em] font-black mb-6 text-diria-neonGreen">Founder & CEO</div>
                                    <p
                                        className="text-gray-400 text-sm leading-relaxed max-w-sm"
                                        dangerouslySetInnerHTML={{ __html: t('team_bio_jose' as any) }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Alejandra Restrepo */}
                        <div className="group relative p-8 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 mt-12 md:mt-0">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-10">
                                    {/* Glow de fondo */}
                                    <div className="absolute inset-0 bg-[#00ccff]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Contenedor de Imagen con Anillo de Luz */}
                                    <div className="relative p-1 rounded-full bg-gradient-to-b from-[#00ccff] to-transparent shadow-[0_0_30px_rgba(0,204,255,0.2)]">
                                        <img
                                            src="/img/alejandra_restrepo_new.png"
                                            alt="Alejandra Restrepo"
                                            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-[0.98] group-hover:scale-100"
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-white font-bold text-3xl mb-1">Alejandra Restrepo</h3>
                                    <div className="text-xs uppercase tracking-[0.2em] font-black mb-6 text-diria-neonBlue">Founder & Chief of Staff</div>
                                    <p
                                        className="text-gray-400 text-sm leading-relaxed max-w-sm"
                                        dangerouslySetInnerHTML={{ __html: t('team_bio_alejandra' as any) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 4: PhilosophyClosing */}
            <section className="py-12 relative overflow-hidden bg-diria-darker">
                {/* Resplandor ambiental (Glow) */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ccff]/20 blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-diria-neonBlue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-diria-neonBlue"></span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">
                            El Futuro es Sabio
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.1]">
                        Perspectiva desde <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">Todas las Alturas</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 mb-16 font-light max-w-3xl mx-auto leading-relaxed">
                        No solo construimos software, cultivamos un ecosistema donde tu negocio puede florecer con la <span className="text-white font-medium">solidez de un árbol milenario</span> y la agilidad de la nube.
                    </p>

                    {/* BOTONES MEJORADOS */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="/demo"
                            className="group relative px-10 py-5 rounded-full bg-white text-black font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-3 overflow-hidden"
                        >
                            Conoce DirIA
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>

                        <a
                            href="mailto:founders@guanacloud.com"
                            className="px-10 py-5 rounded-full border border-white/10 text-white font-medium hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            Habla con los Fundadores
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};