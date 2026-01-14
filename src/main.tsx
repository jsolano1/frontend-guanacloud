import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ContactProvider } from './context/ContactContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContactProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </ContactProvider>
  </React.StrictMode>,
);

