import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { Architecture } from '../components/landing/Architecture';
import { Agents } from '../components/landing/Agents';
import { Philosophy } from '../components/landing/Philosophy';
import { Footer } from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-diria-darker text-white">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Architecture />
                <Agents />
                <Philosophy />
            </main>
            <Footer />
        </div>
    );
};
