import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { TreePalm, Landmark, Cloud, Users, Zap, Shield, Globe, Database, Sprout, Bird, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';

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
    const { openContact } = useContact();
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

                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-10 leading-[1.1]">
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

            {/* SECCIÓN 3: FoundersSection */}
            <section className="py-20 relative overflow-hidden bg-diria-darker">
                {/* Fondo decorativo sutil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#00ff9d05_0%,_transparent_70%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* ========== HEADER ========== */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                            <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                                {t('team_badge')}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black mb-6">
                            <span className="inline-block text-white">
                                {t('team_title')}
                            </span>{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                    {t('team_title_1')}
                                </span>
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {t('team_subtitle')}
                        </p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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

            {/* SECCIÓN 2: PhilosophyTabs */}
            <section className="relative py-20 bg-diria-darker">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                        <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                            {t('essence_badge')}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        <span className="inline-block text-white">
                            {t('essence_title')}
                        </span><br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                {t('essence_title_1')}
                            </span>
                        </span>
                    </h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8">

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

            {/* SECCIÓN 4: PhilosophyClosing */}
            <section className="py-40 relative min-h-[80vh] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-20">
                {/* ANIMATED BACKGROUND GLOWS */}
                <div className="absolute inset-0">
                    {/* Main glow orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-diria-neonGreen/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-400/1 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

                    {/* Floating particles */}
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-diria-neonGreen/40 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>

                {/* SVG DE MONTAÑAS MINIMALISTAS */}
                <div className="absolute bottom-0 left-0 w-full h-[60%] z-10">
                    <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                        <defs>
                            {/* Gradiente para las líneas de las montañas */}
                            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="20%" stopColor="#00ccff" />
                                <stop offset="50%" stopColor="#00ff9d" />
                                <stop offset="80%" stopColor="#00ccff" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>

                            {/* Partículas de flujo que suben por las líneas */}
                            <circle id="particle" r="2" fill="white">
                                <animateMotion
                                    path="M 0 0 L 100 0" // Se ajusta en cada montaña
                                    dur="4s"
                                    repeatCount="indefinite"
                                    rotate="auto"
                                />
                            </circle>
                        </defs>

                        {/* MONTAÑA 1 (Izquierda) */}
                        <motion.path
                            d="M 0 400 L 200 150 L 400 400 Z"
                            fill="none"
                            stroke="url(#mountainGradient)"
                            strokeWidth="1.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                        {/* Cima de la Montaña 1 (para colocar el texto) */}
                        <motion.circle
                            cx="200" cy="150" r="4" fill="#00ff9d"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                            viewport={{ once: true }}
                        />
                        {/* Flujo de Partículas en Montaña 1 */}
                        <motion.path
                            d="M 50 400 Q 150 250, 200 150 Q 250 250, 350 400" // Ruta más orgánica
                            fill="none"
                            stroke="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 2 }}
                            viewport={{ once: true }}
                        >
                            <animateMotion
                                dur="6s" repeatCount="indefinite" rotate="auto"
                                path="M 50 400 Q 150 250, 200 150 Q 250 250, 350 400"
                            >
                                <mpath xlinkHref="#particle" />
                            </animateMotion>
                        </motion.path>


                        {/* MONTAÑA 2 (Centro) */}
                        <motion.path
                            d="M 300 400 L 500 80 L 700 400 Z"
                            fill="none"
                            stroke="url(#mountainGradient)"
                            strokeWidth="1.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                            viewport={{ once: true }}
                        />
                        {/* Cima de la Montaña 2 */}
                        <motion.circle
                            cx="500" cy="80" r="4" fill="#00ccff"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            viewport={{ once: true }}
                        />
                        {/* Flujo de Partículas en Montaña 2 */}
                        <motion.path
                            d="M 350 400 Q 450 180, 500 80 Q 550 180, 650 400" // Ruta más orgánica
                            fill="none"
                            stroke="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ delay: 0.8, duration: 2.5 }}
                            viewport={{ once: true }}
                        >
                            <animateMotion
                                dur="7s" repeatCount="indefinite" rotate="auto"
                                path="M 350 400 Q 450 180, 500 80 Q 550 180, 650 400"
                            >
                                <mpath xlinkHref="#particle" />
                            </animateMotion>
                        </motion.path>

                        {/* MONTAÑA 3 (Derecha) */}
                        <motion.path
                            d="M 600 400 L 800 200 L 1000 400 Z"
                            fill="none"
                            stroke="url(#mountainGradient)"
                            strokeWidth="1.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
                            viewport={{ once: true }}
                        />
                        {/* Cima de la Montaña 3 */}
                        <motion.circle
                            cx="800" cy="200" r="4" fill="#00ff9d"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 2.8, duration: 1 }}
                            viewport={{ once: true }}
                        />
                        {/* Flujo de Partículas en Montaña 3 */}
                        <motion.path
                            d="M 650 400 Q 750 280, 800 200 Q 850 280, 950 400" // Ruta más orgánica
                            fill="none"
                            stroke="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ delay: 1.1, duration: 2 }}
                            viewport={{ once: true }}
                        >
                            <animateMotion
                                dur="5s" repeatCount="indefinite" rotate="auto"
                                path="M 650 400 Q 750 280, 800 200 Q 850 280, 950 400"
                            >
                                <mpath xlinkHref="#particle" />
                            </animateMotion>
                        </motion.path>

                    </svg>
                </div>

                {/* TEXTO DE CIERRE Y BOTÓN */}
                <div className="absolute inset-x-0 top-0 h-[60%] flex flex-col items-center justify-center z-20 pointer-events-none">

                    {/* 1. Título con Glow de Texto */}
                    <motion.h2
                        className="text-white text-2xl md:text-5xl font-heading font-black max-w-5xl text-center leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                        viewport={{ once: true }}
                    >
                        Perspectiva desde todas las alturas
                    </motion.h2>

                    {/* 2. Párrafo con margen controlado */}
                    <motion.p
                        className="text-gray-300 text-sm md:text-lg font-light max-w-2xl text-center leading-relaxed px-6 opacity-70 mb-10"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1.2 }}
                        viewport={{ once: true }}
                    >
                        No solo construimos software, cultivamos un ecosistema donde tu negocio puede florecer con la
                        <span className="text-white/80 font-medium ml-1">solidez de un árbol milenario</span>.
                    </motion.p>

                    {/* 3. BOTÓN CON GLOW INTENSO Y ELEVADO */}
                    <motion.div
                        className="pointer-events-auto relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Aura de Luz (Glow de fondo) */}
                        <div className="absolute inset-0 bg-diria-neonGreen/40 blur-[50px] rounded-full animate-pulse" />
                        <div className="absolute inset-0 bg-diria-neonGreen/20 blur-[20px] rounded-full" />

                        <button
                            onClick={openContact}
                            className="group relative px-10 py-4 rounded-full font-black text-sm uppercase tracking-[0.3em] border-2 border-diria-neonGreen bg-black text-white transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:shadow-[0_0_60px_rgba(0,255,157,0.7)] hover:bg-diria-neonGreen hover:text-black"
                        >
                            {/* Efecto Shimmer (Brillo pasando) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />

                            <Mail size={18} className="relative z-10" />
                            <span className="relative z-10">Contactar</span>

                            {/* Resplandor extra en hover */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                    </motion.div>
                </div>

                {/* Animación de las partículas flotantes */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-30px); opacity: 0.6; } /* Ascenso más prolongado */
        }
        .animate-float-slow { animation: float-slow ease-in-out infinite; }

        @keyframes shimmer {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
        }
        .group-hover\:animate-shimmer {
            animation: shimmer 1.5s infinite;
        }
      ` }} />
            </section>
            <Footer />
        </div>
    );
};