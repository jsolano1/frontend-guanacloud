import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { Architecture } from '../components/landing/Architecture';
import { Agents } from '../components/landing/Agents';
import { Ecosystem } from '../components/landing/Ecosystem';
import { Philosophy } from '../components/landing/Philosophy';
import { Team } from '../components/landing/Team';
import { Footer } from '../components/layout/Footer';
import { ParticlesBackground } from '../components/layout/ParticlesBackground';
import { ContactProvider } from '../context/ContactContext'; // Importar
import { ContactModal } from '../components/common/ContactModal'; // Importar

export const LandingPage: React.FC = () => {
    return (
        <ContactProvider>
            <div className="min-h-screen bg-diria-darker text-white relative overflow-x-hidden">
                <ParticlesBackground />
                <Navbar />
                <main className="relative z-10">
                    <Hero />
                    <Services />
                    <Architecture />
                    <Agents />
                    <Ecosystem />
                    <Philosophy />
                    <Team />
                </main>
                <div className="relative z-20">
                    <Footer />
                </div>

                {/* Modal Global */}
                <ContactModal />
            </div>
        </ContactProvider>
    );
};