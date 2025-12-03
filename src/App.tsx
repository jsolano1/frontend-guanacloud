import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ConsolePage } from './pages/ConsolePage';
import { AdminPage } from './pages/AdminPage';
import { MetricsPage } from './pages/MetricsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/console" element={<ConsolePage />} />
      <Route path="/console/admin" element={<AdminPage />} />
      <Route path="/console/metrics" element={<MetricsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
