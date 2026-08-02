import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import HomePage from './pages/public/HomePage';
import BrowsePage from './pages/public/BrowsePage';
import PetDetailPage from './pages/public/PetDetailPage';
import NotFoundPage from './pages/public/NotFoundPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPetsPage from './pages/admin/AdminPetsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminCarouselPage from './pages/admin/AdminCarouselPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import { initStore, useAuth } from './hooks/useStore';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

export default function App() {
  useEffect(() => { initStore(); }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<BrowsePage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="pets" element={<AdminPetsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="carousel" element={<AdminCarouselPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
