import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AdminPage } from './pages/AdminPage';
import { MetricsPage } from './pages/MetricsPage';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { Terms } from './pages/legal/Terms';
import { CareersPage } from './pages/CareersPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      {/* 1. REDIRECCIÓN INICIAL: Si entran a la raíz, enviarlos a /es */}
      <Route path="/" element={<Navigate to="/es" replace />} />

      {/* 2. RUTAS LOCALIZADAS: Todo lo que lleva /es/ o /en/ */}
      <Route path="/:lang">
        {/* Página de inicio (Landing) */}
        <Route index element={<LandingPage />} />

        {/* Páginas principales */}
        <Route path="login" element={<Login />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="philosophy" element={<PhilosophyPage />} />

        {/* Rutas Legales */}
        <Route path="legal">
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* Consola / Admin (Si quieres que mantengan el idioma en el panel) */}
        <Route path="console">
          <Route path="admin" element={<AdminPage />} />
          <Route path="metrics" element={<MetricsPage />} />
        </Route>
      </Route>

      {/* 3. CAPTURA DE ERRORES: Si escriben algo mal, enviarlos a /es */}
      <Route path="*" element={<Navigate to="/es" replace />} />
    </Routes>
  );
}

export default App;