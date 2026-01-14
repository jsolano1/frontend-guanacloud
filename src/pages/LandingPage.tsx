import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { Architecture } from '../components/landing/Architecture';
import { Agents } from '../components/landing/Agents';
import Ecosystem from "../components/landing/Ecosystem";
import { Philosophy } from '../components/landing/Philosophy';
import Contact from '../components/landing/Contact';
import { Footer } from '../components/layout/Footer';
import { ParticlesBackground } from '../components/layout/ParticlesBackground';
import { ContactProvider } from '../context/ContactContext'; // Importar
import { ContactModal } from '../components/common/ContactModal'; // Importar
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

export const LandingPage: React.FC = () => {
    const { lang } = useParams(); // Obtiene 'es' o 'en' de la URL
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        // Validamos que sea un idioma permitido
        if (lang === 'es' || lang === 'en') {
            t('lang');
        } else {
            // Si ponen algo como /fr, lo mandamos a /es
            navigate('/es', { replace: true });
        }
    }, [lang, t, navigate]);

    return (
        <ContactProvider>
            <div className="min-h-screen bg-diria-darker text-white relative overflow-x-hidden">
                <ParticlesBackground />
                <Navbar />
                <main className="relative z-10">
                    <Hero />
                    <Ecosystem />
                    <Architecture />
                    <Agents />
                    <Services />
                    <Philosophy />
                    <Contact />
                </main>
                <div className="relative z-20">
                    <Routes>
                        <Route path="/:lang/*" element={<LandingPage />} />
                    </Routes>
                    <Footer />
                </div>

                {/* Modal Global */}
                <ContactModal />
            </div>
        </ContactProvider>
    );
};