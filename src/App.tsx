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
      <Route path="/:lang/*" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/es" replace />} />
      <Route path="/console/admin" element={<AdminPage />} />
      <Route path="/console/metrics" element={<MetricsPage />} />
      <Route path="/legal/privacy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms" element={<Terms />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/philosophy" element={<PhilosophyPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;