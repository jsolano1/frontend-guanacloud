import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useContact } from '../../context/ContactContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useParams();
    const { t } = useLanguage();
    const l = (path: string) => `/${lang}/${path}`;
    const toggleLanguage = () => {
        const newLang = lang === 'es' ? 'en' : 'es';
        const currentPath = location.pathname.split('/').slice(2).join('/');
        navigate(`/${newLang}/${currentPath}`, { replace: true });
    };

    const getPath = (path: string) => {
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `/${lang}/${cleanPath}`;
    };
    const { openContact } = useContact();
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
        { name: t('nav_ecosystem'), href: '#ecosystem' },
        { name: t('nav_agents'), href: '#agents' },
        { name: t('nav_services'), href: '#services' },
        { name: t('nav_architecture'), href: '#architecture' },
        { name: t('nav_about'), href: 'philosophy' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav h-24' : 'h-28 bg-black/80'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group py-2">
                        <img
                            src="/img/guana_cloud_square.png"
                            alt="Guana Cloud"
                            className="h-28 md:h-28 w-auto transition-transform duration-300 group-hover:scale-105 filter drop-shadow-lg"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a key={link.name}
                                href={getPath(link.href)}
                                className="text-sm font-medium text-diria-muted hover:text-white transition">
                                {link.name}
                            </a>
                        ))}

                        <Link
                            to={getPath('login')}
                            className="hidden md:block px-6 py-2 rounded-full font-bold text-sm text-black transition hover:scale-105 text-center"
                            style={{ backgroundColor: '#00ff9d' }} // Aquí usamos el color neonGreen directamente
                        >
                            {t('nav_login')}
                        </Link>
                        {/* <a href="#demo" className="bg-gradient-to-r from-diria-neonGreen to-diria-neonBlue text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] transition-all duration-300 transform hover:scale-105">
                            {t('nav_demo')}
                        </a>*/}
                        <button
                            onClick={toggleLanguage}
                            className="group relative text-[11px] font-black tracking-[0.15em] text-diria-neonBlue border border-diria-neonBlue/30 px-4 py-1.5 rounded-full flex items-center gap-2 bg-diria-neonBlue/5 hover:bg-diria-neonBlue/10 hover:border-diria-neonBlue/60 transition-all duration-300 shadow-[0_0_15px_rgba(0,204,255,0.1)] active:scale-95"
                        >
                            {/* Indicador de Luz sutil tras la bandera */}
                            <span className="absolute inset-0 rounded-full bg-diria-neonBlue/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

                            {lang === 'es' ? (
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-base grayscale group-hover:grayscale-0 transition-all">🇺🇸</span>
                                    <span className="uppercase tracking-widest">English</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-base grayscale group-hover:grayscale-0 transition-all">🇪🇸</span>
                                    <span className="uppercase tracking-widest">Español</span>
                                </div>
                            )}

                            {/* Decoración Neón minimalista */}
                            <div className="w-1 h-1 rounded-full bg-diria-neonBlue animate-pulse ml-1" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Botón de idioma también visible en móvil fuera del menú para acceso rápido */}
                        <button
                            onClick={toggleLanguage}
                            className="text-sm font-bold text-white border border-white/20 px-2 py-1 rounded-full"
                        >
                            {lang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-24 left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-white hover:text-diria-neonGreen"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-white/10 my-2"></div>
                    <button
                        onClick={() => { openContact(); setIsMobileMenuOpen(false); }}
                        className="bg-diria-neonBlue text-black px-6 py-3 rounded-xl text-center font-bold"
                    >
                        {t('contact_cta')}
                    </button>
                    <Link to={l('login')} className="bg-diria-neonGreen text-black px-6 py-3 rounded-xl text-center font-bold">
                        {t('nav_login')}
                    </Link>
                </div>
            )}
        </nav>
    );
};