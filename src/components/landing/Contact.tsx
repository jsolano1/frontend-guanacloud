import React from 'react';
import { motion } from 'framer-motion';

export default function ClosingMountains() {
    return (
        <section className="relative min-h-[70vh] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-20">

            {/* BACKGROUND PARTICLES - ADN ambiental */}
            {[...Array(80)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-diria-neonGreen/30 rounded-full animate-float-slow opacity-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    transition={{ delay: Math.random() * 2, duration: 2 }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 10}%`, // Start closer to the bottom
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${10 + Math.random() * 8}s`
                    }}
                />
            ))}

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

            {/* TEXTO DE CIERRE EN LAS CIMAS */}
            <div className="absolute w-full h-[60%] flex items-start justify-center pt-10 pointer-events-none z-20">
                <motion.p
                    className="text-white text-2xl md:text-5xl font-heading font-black max-w-4xl text-center leading-tight drop-shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Texto dinámico que "descansa" sobre las cimas */}
                    "La visión no está en la cima. Es el camino lo que la revela."
                </motion.p>
            </div>

            {/* Animación de las partículas flotantes */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-30px); opacity: 0.6; } /* Ascenso más prolongado */
        }
        .animate-float-slow { animation: float-slow ease-in-out infinite; }
      ` }} />
        </section>
    );
}