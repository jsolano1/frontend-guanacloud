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
        { name: t('nav_product'), href: '#product' },
        { name: t('nav_services'), href: '#services' },
        { name: t('nav_architecture'), href: '#architecture' },
        { name: t('nav_about'), href: '#about' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav h-20' : 'h-24 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <img src="/img/guana_logo_dark.png" alt="Guana Cloud Logo" className="h-10 w-auto" />
                        <span className="font-heading font-bold text-2xl text-white tracking-tight">Guana Cloud</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium text-diria-muted hover:text-white transition">
                                {link.name}
                            </a>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="text-sm font-bold text-diria-neonBlue hover:text-white transition border border-diria-neonBlue/30 px-3 py-1 rounded-full"
                        >
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>

                        <Link to="/console" className="text-sm font-semibold text-diria-neonBlue hover:text-white transition">
                            {t('nav_login')}
                        </Link>
                        <a href="#demo" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-diria-neonGreen transition shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]">
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass-nav absolute w-full border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-diria-neonBlue hover:bg-white/10"
                        >
                            {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        </button>
                        <Link
                            to="/console"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav_login')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
