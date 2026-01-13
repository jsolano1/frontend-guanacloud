import { BrainCircuit, Code2, Sprout } from 'lucide-react';
import { useState } from 'react';

export default function Ecosystem() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section id="ecosystem" className="relative py-32 bg-black overflow-hidden">

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

            {/* GRID PATTERN OVERLAY */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `
          linear-gradient(rgba(0,255,157,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,157,0.3) 1px, transparent 1px)
        `,
                backgroundSize: '50px 50px'
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ========== HEADER WITH GLOW ========== */}
                <div className="text-center mb-20">

                    {/* Floating badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-black/40 backdrop-blur-xl transition-all duration-500 group cursor-default">
                        <span className="text-white text-sm font-mono uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">
                            Ecosistema GuanaCloud
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        <span className="inline-block text-white">
                            Donde la
                        </span>{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-diria-neonGreen via-emerald-400 to-cyan-400 animate-gradient">
                                Sabiduría Ancestral
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-diria-neonGreen/20 via-emerald-400/20 to-cyan-400/20 blur-2xl" />
                        </span>
                        <br />
                        <span className="inline-block text-white">
                            Encuentra la
                        </span>{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-diria-neonGreen animate-gradient">
                                Inteligencia Artificial
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-diria-neonGreen/20 blur-2xl" />
                        </span>
                    </h2>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Desde el corazón de Guanacaste, construimos tecnología que no imita la naturaleza la extiende.
                    </p>
                </div>

                {/* ========== PHILOSOPHY WRAPPER (OUTER CONTAINER) ========== */}
                <div className="relative max-w-6xl mx-auto mb-24">

                    {/* PHILOSOPHY GLASS CONTAINER - Wraps the two inner cards */}
                    <div className="relative p-8 md:p-12 rounded-[2.5rem] border-2 border-emerald-400/20 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 backdrop-blur-sm shadow-[0_8px_64px_rgba(16,185,129,0.10)]">

                        {/* Animated glow border effect */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                        {/* Corner decorations with philosophy theme */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                            <div className="px-6 py-3 rounded-full border-2 border-emerald-400/40 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Sprout className="text-emerald-400 animate-pulse" size={24} />
                                        <div className="absolute inset-0 bg-emerald-400/30 blur-lg" />
                                    </div>
                                    <span className="text-emerald-400 font-mono text-sm uppercase tracking-wider font-bold">
                                        Filosofía GuanaCloud
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Philosophy subtle pattern */}
                        <div className="absolute inset-0 rounded-[2.5rem] opacity-5" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.4) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }} />

                        {/* Flowing lines connecting the concept */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 rounded-[2.5rem]">
                            <defs>
                                <linearGradient id="philosophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                                    <stop offset="50%" stopColor="rgba(16,185,129,0.2)" />
                                    <stop offset="100%" stopColor="rgba(16,185,129,0.4)" />
                                </linearGradient>
                            </defs>
                            <circle cx="10%" cy="50%" r="4" fill="rgba(16,185,129,0.6)" className="animate-pulse" />
                            <circle cx="90%" cy="50%" r="4" fill="rgba(16,185,129,0.6)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <circle cx="50%" cy="10%" r="4" fill="rgba(16,185,129,0.6)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                            <circle cx="50%" cy="90%" r="4" fill="rgba(16,185,129,0.6)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

                            {/* Connecting lines (subtle) */}
                            <path d="M 10% 50% Q 50% 30% 90% 50%" stroke="url(#philosophyGrad)" strokeWidth="1" fill="none" opacity="0.3" />
                            <path d="M 50% 10% Q 70% 50% 50% 90%" stroke="url(#philosophyGrad)" strokeWidth="1" fill="none" opacity="0.3" />
                        </svg>

                        {/* Philosophy description at top */}
                        <div className="text-center mb-8 pt-8">
                            <p className="text-emerald-400/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed italic">
                                "Enraizados en la Zona Azul de Nicoya, donde los sistemas perduran generaciones.
                                Cada producto nace de esta sabiduría: colaboración sobre competencia,
                                resiliencia sobre rigidez."
                            </p>
                        </div>

                        {/* ========== INNER CARDS: DIRIA + SERVICES ========== */}
                        <div className="grid md:grid-cols-2 gap-8">

                            {/* CARD 1: DIRIA - Producto Estrella */}
                            <div
                                className="group relative"
                                onMouseEnter={() => setHoveredCard(0)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Star badge for flagship product */}
                                <div className="absolute -top-4 -right-4 z-30">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-diria-neonGreen/30 blur-xl animate-pulse" />
                                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-diria-neonGreen to-emerald-500 border-2 border-diria-neonGreen/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.5)]">
                                            <span className="text-black text-xl">⭐</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-diria-neonGreen/20 to-emerald-500/20 rounded-2xl blur-2xl transition-opacity duration-500 ${hoveredCard === 0 ? 'opacity-100' : 'opacity-0'}`} />

                                {/* Glass card */}
                                <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-diria-neonGreen/50 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-[1.03] hover:-translate-y-1 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,255,157,0.3)]">

                                    {/* Icon with glow */}
                                    <div className="flex items-center justify-start gap-5 group mb-6">
                                        {/* gap-10 (2.5rem / 40px) para asegurar que el resplandor del icono no toque el badge */}

                                        {/* 1. Contenedor del Icono (Punto de anclaje a la izquierda) */}
                                        <div className="relative inline-block">
                                            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-diria-neonGreen/20 to-emerald-500/20 border-2 border-diria-neonGreen/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-diria-neonGreen transition-all duration-500">
                                                <BrainCircuit className="text-diria-neonGreen" size={40} />
                                            </div>

                                            {/* Resplandor (Glow) que se expande sin invadir el badge gracias al gap */}
                                            <div className="absolute inset-0 bg-diria-neonGreen/30 blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        </div>

                                        {/* 2. Badge (Acompaña al icono a la derecha) */}
                                        <div className="px-4 py-1.5 rounded-full bg-diria-neonGreen/5 border border-diria-neonGreen/10 backdrop-blur-sm transition-all duration-500 group-hover:border-diria-neonGreen/30">
                                            <span className="text-diria-neonGreen text-[10px] font-mono uppercase tracking-[0.2em] font-bold whitespace-nowrap">
                                                Producto
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-diria-neonGreen transition-colors duration-300">
                                        DirIA
                                    </h3>
                                    <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mb-4">
                                        Orquestador de Agentes
                                    </p>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        Plataforma de orquestación multi-agente que coordina especialistas de IA.
                                        Como el Cerro Diriá ofrece perspectiva desde las alturas, DirIA coordina
                                        tu ecosistema inteligente desde el centro.
                                    </p>

                                    {/* Animated progress bar */}
                                    <div className="relative h-1 bg-white/5 rounded-full overflow-hidden mt-6">
                                        <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-diria-neonGreen to-emerald-400 rounded-full transition-all duration-700 ${hoveredCard === 0 ? 'w-full' : 'w-0'}`} />
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-diria-neonGreen/50 group-hover:bg-diria-neonGreen animate-pulse" />
                                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-emerald-400/50 group-hover:bg-emerald-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                </div>
                            </div>

                            {/* CARD 2: SERVICIOS DE INGENIERÍA */}
                            <div
                                className="group relative"
                                onMouseEnter={() => setHoveredCard(1)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-2xl transition-opacity duration-500 ${hoveredCard === 1 ? 'opacity-100' : 'opacity-0'}`} />

                                {/* Glass card */}
                                <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-[1.03] hover:-translate-y-1 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(6,182,212,0.3)]">

                                    {/* Icon with glow */}
                                    <div className="flex items-center justify-start gap-5 group mb-6">
                                        {/* gap-10 (2.5rem / 40px) para asegurar que el resplandor del icono no toque el badge */}

                                        {/* 1. Contenedor del Icono (Punto de anclaje a la izquierda) */}
                                        <div className="relative inline-block">
                                            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-500">
                                                <Code2 className="text-cyan-400" size={40} />
                                            </div>

                                            {/* Resplandor (Glow) que se expande sin invadir el badge gracias al gap */}
                                            <div className="absolute inset-0 bg-cyan-400/30 blur-xl group-hover:blur-2xl transition-all duration-500" />
                                        </div>

                                        {/* 2. Badge (Acompaña al icono a la derecha) */}
                                        <div className="px-4 py-1.5 rounded-full bg-cyan-400/5 border border-cyan-400/10 backdrop-blur-sm transition-all duration-500 group-hover:border-cyan-400/30">
                                            <span className="text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] font-bold whitespace-nowrap">
                                                Servicios
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                        Ingeniería
                                    </h3>
                                    <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mb-4">
                                        Construcción de Ecosistemas
                                    </p>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        Construimos arquitecturas cloud, pipelines de datos, modelos de ML y sistemas
                                        que perduran. No solo código—ecosistemas tecnológicos resilientes, escalables
                                        y preparados para evolucionar.
                                    </p>

                                    {/* Animated progress bar */}
                                    <div className="relative h-1 bg-white/5 rounded-full overflow-hidden mt-6">
                                        <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 ${hoveredCard === 1 ? 'w-full' : 'w-0'}`} />
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 animate-pulse" />
                                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-blue-400/50 group-hover:bg-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                </div>
                            </div>

                        </div>

                        {/* Philosophy bottom note */}
                        <div className="text-center mt-8 pt-6 border-t border-emerald-400/10">
                            <div className="flex items-center justify-center gap-3 text-emerald-400/70 text-sm">
                                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-emerald-400/50" />
                                <span className="font-mono uppercase tracking-wider">Ambos enraizados en sabiduría ancestral</span>
                                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-emerald-400/50" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* ANIMATION KEYFRAMES */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
` }} />
        </section>
    );
}