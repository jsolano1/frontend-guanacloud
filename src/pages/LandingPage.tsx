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

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white relative">
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
            <Footer /> {/* Footer needs to be here, possibly outside main if main has constraints */}
        </div>
    );
};