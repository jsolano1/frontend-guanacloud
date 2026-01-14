import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from '../i18n/translations';
import { useLocation, useNavigate } from 'react-router-dom';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Inicializamos el estado basado en la URL actual
    const [language, setLanguage] = useState<Language>(() => {
        const langInUrl = location.pathname.split('/')[1] as Language;
        return (langInUrl === 'en' || langInUrl === 'es') ? langInUrl : 'es';
    });

    // 2. EFECTO CRUCIAL: Escuchar cambios en la URL y actualizar el estado
    useEffect(() => {
        const langInUrl = location.pathname.split('/')[1] as Language;
        if ((langInUrl === 'es' || langInUrl === 'en') && langInUrl !== language) {
            setLanguage(langInUrl);
            document.documentElement.lang = langInUrl; // Actualiza el atributo lang del HTML
        }
    }, [location.pathname, language]);

    // 3. Cambiar idioma ahora significa navegar a una nueva ruta
    const toggleLanguage = () => {
        const newLang = language === 'es' ? 'en' : 'es';
        const pathWithoutLang = location.pathname.split('/').slice(2).join('/');
        navigate(`/${newLang}/${pathWithoutLang}`, { replace: true });
    };

    const t = (key: TranslationKey): string => {
        const currentLangMap = translations[language] as Record<TranslationKey, string>;
        return currentLangMap[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
