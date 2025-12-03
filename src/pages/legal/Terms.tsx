import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-diria-darker text-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-heading font-bold mb-8 text-diria-neonBlue">Términos de Servicio</h1>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <p>Bienvenido a GuanaCloud. Al usar nuestros servicios, usted acepta estos términos.</p>

                    <h3 className="text-2xl font-bold text-white mt-8">1. Servicios</h3>
                    <p>GuanaCloud provee infraestructura como servicio (IaaS) y agentes de inteligencia artificial bajo un modelo de suscripción o pago por uso.</p>

                    <h3 className="text-2xl font-bold text-white mt-8">2. Responsabilidades del Usuario</h3>
                    <p>Usted es responsable de mantener la confidencialidad de sus credenciales de acceso a la Consola DirIA y del uso adecuado de los agentes.</p>

                    <h3 className="text-2xl font-bold text-white mt-8">3. SLA y Disponibilidad</h3>
                    <p>Garantizamos un uptime del 99.9% para nuestros servicios Core. Los detalles de compensación se encuentran en su Acuerdo de Nivel de Servicio (SLA) específico.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};