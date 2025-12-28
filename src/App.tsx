import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ConsolePage } from './pages/ConsolePage';
import { AdminPage } from './pages/AdminPage';
import { MetricsPage } from './pages/MetricsPage';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { Terms } from './pages/legal/Terms';
import { CareersPage } from './pages/CareersPage';
import { PhilosophyPage } from './pages/PhilosophyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/console" element={<ConsolePage />} />
      <Route path="/console/admin" element={<AdminPage />} />
      <Route path="/console/metrics" element={<MetricsPage />} />

      {/* Rutas Nuevas */}
      <Route path="/legal/privacy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms" element={<Terms />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/philosophy" element={<PhilosophyPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;