import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export default function DirIALogin() {
    return (
        /* 1. Cambiamos min-h-screen por h-screen para que el contenedor NO crezca más allá de la pantalla */
        <div className="h-screen bg-black text-white font-sans selection:bg-diria-neonGreen selection:text-black flex flex-col overflow-hidden">

            {/* El Navbar ocupa su espacio natural (ej. 64px o 80px) */}
            <Navbar />

            {/* 2. flex-1 hace que este div use el 100% del espacio que sobra bajo el Navbar.
               Añadimos pt-12 en mobile para que el formulario baje y no choque con el logo del Navbar */}
            <div className="relative flex-1 w-full bg-[#030303] flex items-center justify-center px-4 pt-32 md:pt-0 overflow-y-auto custom-scrollbar">

                {/* Fondo Decorativo (Auras de luz) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-diria-neonGreen/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
                    <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-diria-neonBlue/5 rounded-full blur-[100px]" />
                </div>

                {/* Tarjeta de Login (Glassmorphism) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    /* margin-top manual para compensar visualmente el Navbar en mobile */
                    className="relative z-10 w-full max-w-md my-auto"
                >
                    <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-6 md:p-10 rounded-[2rem] shadow-2xl">

                        {/* Header del Formulario */}
                        <div className="text-center mb-8 md:mb-10">
                            <div className="inline-block p-3 rounded-2xl bg-diria-neonGreen/10 mb-4 border border-diria-neonGreen/20">
                                <span className="text-2xl">🧠</span>
                            </div>
                            <h2 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter italic">
                                Acceso al Núcleo
                            </h2>
                            <p className="text-gray-400 text-[12px] md:text-sm mt-2 font-light">
                                Conectando con la Red Neuronal Agentica
                            </p>
                        </div>

                        {/* Formulario */}
                        <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-diria-neonGreen font-bold ml-1">Identidad (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-diria-neonGreen transition-colors" size={18} />
                                    <input
                                        type="email"
                                        placeholder="usuario@empresa.com"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 md:py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-diria-neonGreen/50 focus:bg-white/[0.05] transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-diria-neonGreen font-bold ml-1">Clave de Acceso</label>
                                    <a href="#" className="text-[9px] text-gray-500 hover:text-white transition-colors uppercase">¿Olvidaste el acceso?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-diria-neonGreen transition-colors" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 md:py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-diria-neonGreen/50 focus:bg-white/[0.05] transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Botón de Entrada */}
                            <button className="relative w-full group overflow-hidden rounded-xl p-[1px] transition-all active:scale-95 mt-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-diria-neonBlue via-diria-neonGreen to-diria-neonBlue animate-gradient-x" />
                                <div className="relative bg-[#0a0a0a] group-hover:bg-transparent transition-colors py-3.5 md:py-4 rounded-[11px] flex items-center justify-center gap-2">
                                    <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs group-hover:text-black transition-colors">Iniciar Orquestación</span>
                                    <ArrowRight className="text-diria-neonGreen group-hover:text-black transition-colors" size={16} />
                                </div>
                            </button>

                            {/* Social Login Group - Optimizado para mobile */}
                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-all">
                                    <svg className="w-4 h-4 text-white opacity-70" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /></svg>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Google</span>
                                </button>
                                <button className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-all">
                                    <Github size={16} className="text-white opacity-70" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">GitHub</span>
                                </button>
                            </div>
                        </form>

                        {/* Footer del Login */}
                        <p className="text-center mt-8 text-[10px] text-gray-500">
                            ¿Nueva organización? <a href="#" className="text-diria-neonGreen font-bold hover:underline">Solicitar instancia</a>
                        </p>
                    </div>
                </motion.div>

                {/* Decoración Inferior */}
                <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-diria-neonGreen/30 to-transparent" />
            </div>

            {/* CSS para asegurar que si el teclado del celular se abre, el formulario se pueda desplazar */}
            <style dangerouslySetInnerHTML={{
                __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 0px; }
            .custom-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}} />
        </div>
    );
}