import React from 'react';
import { Navbar } from '../layout/Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Architecture } from './Architecture';
import { Agents } from './Agents';
import { Philosophy } from './Philosophy';
import { Footer } from '../layout/Footer';

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
