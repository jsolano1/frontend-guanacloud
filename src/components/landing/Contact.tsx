import { motion } from 'framer-motion';
import { useContact } from '../../context/ContactContext';
import { Mail } from 'lucide-react';

export default function ClosingMountains() {
    const { openContact } = useContact();
    return (
        <section className="relative min-h-[80vh] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-20">
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
    );
}