import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-diria-darker text-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-heading font-bold mb-8 text-diria-neonGreen">Política de Privacidad</h1>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <p>Última actualización: Marzo 2025</p>
                    <p>En GuanaCloud, nos tomamos la seguridad de sus datos con la seriedad de un estándar SOC 2 Tipo II. Esta política describe cómo recopilamos, usamos y protegemos su información.</p>

                    <h3 className="text-2xl font-bold text-white mt-8">1. Recopilación de Datos</h3>
                    <p>Recopilamos información estrictamente necesaria para la operación de nuestros servicios de infraestructura y agentes de IA, incluyendo logs de sistema, métricas de uso y datos de contacto profesional.</p>

                    <h3 className="text-2xl font-bold text-white mt-8">2. Uso de la Información</h3>
                    <p>Sus datos se utilizan exclusivamente para:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Proveer y mantener nuestros servicios Cloud.</li>
                        <li>Entrenar y refinar los modelos de sus agentes dedicados (sin compartir datos entre clientes).</li>
                        <li>Notificarle sobre cambios en el servicio o alertas de seguridad.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-white mt-8">3. Seguridad</h3>
                    <p>Implementamos encriptación AES-256 en reposo y TLS 1.3 en tránsito. Nuestros centros de datos operan bajo certificaciones ISO 27001.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};