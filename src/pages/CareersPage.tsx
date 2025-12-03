import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ArrowRight } from 'lucide-react';

export const CareersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-diria-darker text-white">
            <Navbar />
            <div className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-diria-neonGreen font-mono text-sm tracking-widest uppercase mb-4 block">Únete a la manada</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">Construye el Futuro<br />Desde el Paraíso</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        Buscamos mentes brillantes en Data Engineering, AI y Cloud Architecture que quieran trabajar con tecnologías de frontera sin sacrificar su calidad de vida.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-32">
                <div className="grid gap-6">
                    {/* Job Card Placeholder */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-diria-neonBlue/50 transition-all group">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Senior AI Engineer</h3>
                            <p className="text-gray-400">Remoto / Híbrido • San José, CR • Full-time</p>
                        </div>
                        <a href="mailto:jobs@guanacloud.com" className="px-6 py-3 rounded-full bg-white text-black font-bold group-hover:bg-diria-neonBlue transition flex items-center gap-2">
                            Aplicar <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-diria-neonGreen/50 transition-all group">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Data Architect</h3>
                            <p className="text-gray-400">Remoto • Global • Contract</p>
                        </div>
                        <a href="mailto:jobs@guanacloud.com" className="px-6 py-3 rounded-full bg-white text-black font-bold group-hover:bg-diria-neonGreen transition flex items-center gap-2">
                            Aplicar <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};