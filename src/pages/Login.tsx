import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export default function DirIALogin() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-diria-neonGreen selection:text-black">
            <Navbar />
            <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden font-sans px-4">

                {/* 1. Fondo Decorativo (Auras de luz) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-diria-neonGreen/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-diria-neonBlue/5 rounded-full blur-[100px]" />
                </div>

                {/* 2. Tarjeta de Login (Glassmorphism) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">

                        {/* Header del Formulario */}
                        <div className="text-center mb-10">
                            <div className="inline-block p-3 rounded-2xl bg-diria-neonGreen/10 mb-4 border border-diria-neonGreen/20">
                                <span className="text-2xl">🧠</span>
                            </div>
                            <h2 className="text-white text-2xl font-black uppercase tracking-tighter italic">
                                Acceso al Núcleo
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 font-light">
                                Conectando con la Red Neuronal Agentica
                            </p>
                        </div>

                        {/* Formulario */}
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-diria-neonGreen font-bold ml-1">Identidad (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-diria-neonGreen transition-colors" size={18} />
                                    <input
                                        type="email"
                                        placeholder="usuario@empresa.com"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-diria-neonGreen/50 focus:bg-white/[0.05] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-diria-neonGreen font-bold ml-1">Clave de Acceso</label>
                                    <a href="#" className="text-[9px] text-gray-500 hover:text-white transition-colors uppercase">¿Olvidaste el acceso?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-diria-neonGreen transition-colors" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-diria-neonGreen/50 focus:bg-white/[0.05] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Botón de Entrada */}
                            <button className="relative w-full group overflow-hidden rounded-xl p-[1px] transition-all active:scale-95 mt-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-diria-neonBlue via-diria-neonGreen to-diria-neonBlue animate-gradient-x" />
                                <div className="relative bg-[#0a0a0a] group-hover:bg-transparent transition-colors py-4 rounded-[11px] flex items-center justify-center gap-2">
                                    <span className="text-white font-bold uppercase tracking-widest text-xs group-hover:text-black transition-colors">Iniciar Orquestación</span>
                                    <ArrowRight className="text-diria-neonGreen group-hover:text-black transition-colors" size={16} />
                                </div>
                            </button>

                            {/* Separador */}
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-600"><span className="bg-[#030303] px-4 italic">O ingresar con SSO</span></div>
                            </div>

                            {/* Social Login Group */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Google Login */}
                                <button
                                    className="relative group overflow-hidden bg-white/[0.03] border border-white/10 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all duration-300"
                                    onClick={() => console.log("Iniciando Google SSO...")}
                                >
                                    {/* Glow interno al hover */}
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Logo de Google con filtro para que no rompa la estética oscura */}
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            className="text-white opacity-80"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            className="text-white opacity-60"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            className="text-white opacity-40"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        />
                                        <path
                                            fill="currentColor"
                                            className="text-white opacity-80"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-white text-[11px] font-bold uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                                        Google
                                    </span>
                                </button>

                                {/* GitHub Login (Mantener para equilibrio visual) */}
                                <button
                                    className="relative group overflow-hidden bg-white/[0.03] border border-white/10 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all duration-300"
                                >
                                    <Github size={18} className="text-white opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-white text-[11px] font-bold uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                                        GitHub
                                    </span>
                                </button>
                            </div>


                        </form>

                        {/* Footer del Login */}
                        <p className="text-center mt-8 text-[11px] text-gray-500">
                            ¿Nueva organización? <a href="#" className="text-diria-neonGreen font-bold hover:underline">Solicitar instancia</a>
                        </p>
                    </div>
                </motion.div>

                {/* Decoración Inferior (Línea de flujo) */}
                <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-diria-neonGreen/30 to-transparent" />
            </div>
        </div>
    );
}