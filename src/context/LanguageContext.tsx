import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    const t = (key: TranslationKey): string => {
        // Accedemos de forma segura indicando que el objeto de idioma 
        // contiene llaves de tipo TranslationKey
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
