import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { VendorAuthProvider } from './context/VendorAuthContext';
import { VendorLayout } from './pages/vendor/VendorLayout';
import { VendorLogin } from './pages/vendor/VendorLogin';
import { VendorDashboard } from './pages/vendor/VendorDashboard';

function VendorApp() {
  return (
    <BrowserRouter>
      <VendorAuthProvider>
        <Routes>
          <Route path="/" element={<VendorLayout />}>
            <Route index element={<VendorLogin />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </VendorAuthProvider>
    </BrowserRouter>
  );
}

const root = document.getElementById('vendor-root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <VendorApp />
    </StrictMode>
  );
}
