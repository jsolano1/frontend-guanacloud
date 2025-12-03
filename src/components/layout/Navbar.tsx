import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav_product'), href: '/#product' },
        { name: t('nav_services'), href: '/#services' },
        { name: t('nav_architecture'), href: '/#architecture' },
        { name: t('nav_about'), href: '/#about' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav h-20' : 'h-24 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo con Link al Home (SIN TEXTO) */}
                    <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
                        {/* Se aumentó un poco el tamaño (h-14) para que se lea bien el texto de la imagen */}
                        <img
                            src="/img/guana_cloud_square.png"
                            alt="Guana Cloud"
                            className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium text-diria-muted hover:text-white transition">
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className="text-sm font-bold text-diria-neonBlue hover:text-white transition border border-diria-neonBlue/30 px-3 py-1 rounded-full"
                        >
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>

                        <Link to="/console" className="text-sm font-semibold text-diria-neonBlue hover:text-white transition">
                            {t('nav_login')}
                        </Link>
                        <a href="#demo" className="bg-gradient-to-r from-diria-neonGreen to-diria-neonBlue text-black px-6 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] transition-all duration-300 transform hover:scale-105">
                            {t('nav_demo')}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};