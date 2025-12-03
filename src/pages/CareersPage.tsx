import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export const CareersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-diria-darker text-white">
            <Navbar />
            <div className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-4 block">Únete a la manada</span>
                    {/* TITULO CON GRADIENTE AZUL-VERDE APLICADO */}
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
                        Construye el Futuro<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00ccff]">Desde el Paraíso</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        Buscamos mentes brillantes en Data Engineering, AI y Cloud Architecture que quieran trabajar con tecnologías de frontera sin sacrificar su calidad de vida.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-32">
                <div className="grid gap-8">
                    {/* Job 1 */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-diria-neonBlue/50 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Senior AI Engineer</h3>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> Híbrido / San José, CR</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> Tiempo Completo</span>
                                </div>
                            </div>
                            <a href="mailto:info@guanacloud.com?subject=Candidatura: Senior AI Engineer" className="px-6 py-3 rounded-full bg-white text-black font-bold group-hover:bg-diria-neonBlue transition flex items-center gap-2 whitespace-nowrap">
                                Aplicar <ArrowRight size={18} />
                            </a>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed border-t border-white/5 pt-6">
                            <p>Buscamos un ingeniero apasionado por los LLMs y la orquestación de agentes. Trabajarás directamente con nuestro equipo de core para evolucionar la plataforma DirIA.</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
                                <li>Experiencia comprobable con Python, LangChain y Google Vertex AI.</li>
                                <li>Capacidad para diseñar arquitecturas escalables y resilientes.</li>
                                <li>Inglés avanzado (B2+) indispensable.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Job 2 */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-diria-neonGreen/50 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Data Architect</h3>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> Remoto Global</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> Contrato</span>
                                </div>
                            </div>
                            <a href="mailto:info@guanacloud.com?subject=Candidatura: Data Architect" className="px-6 py-3 rounded-full bg-white text-black font-bold group-hover:bg-diria-neonGreen transition flex items-center gap-2 whitespace-nowrap">
                                Aplicar <ArrowRight size={18} />
                            </a>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed border-t border-white/5 pt-6">
                            <p>Únete a nosotros para diseñar la próxima generación de pipelines de datos. Buscamos un arquitecto que entienda que los datos no son solo almacenamiento, sino el combustible de la IA.</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
                                <li>Dominio de BigQuery, DBT y arquitecturas Event-Driven.</li>
                                <li>Experiencia en optimización de costos y performance en la nube.</li>
                                <li>Mentalidad de "automation-first".</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};