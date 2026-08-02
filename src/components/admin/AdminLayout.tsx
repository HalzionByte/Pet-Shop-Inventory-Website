import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth, useSettings } from '../../hooks/useStore';

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/pets', icon: '🐾', label: 'Pets' },
  { to: '/admin/categories', icon: '🏷️', label: 'Categories' },
  { to: '/admin/carousel', icon: '🖼️', label: 'Carousel' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : ''}`}>
      <div className="p-5 border-b border-[#F5ECD8]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{settings.logo || '🐾'}</span>
          <div>
            <p className="font-display font-bold text-[#3D2B1F] text-sm leading-tight">{settings.shop_name}</p>
            <p className="text-xs text-[#8B5E3C]">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#F4A261] text-white'
                  : 'text-[#5C3D1E] hover:bg-[#F5ECD8]'
              }`
            }>
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[#F5ECD8]">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#8B5E3C] hover:bg-red-50 hover:text-red-500 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FFF8F0] overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 flex-shrink-0 bg-white border-r border-[#F5ECD8]">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-white border-r border-[#F5ECD8]"><Sidebar mobile /></div>
          <div className="flex-1 bg-black/30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b border-[#F5ECD8]">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-[#F5ECD8] transition-colors">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="block h-0.5 bg-[#8B5E3C]" />
              <span className="block h-0.5 bg-[#8B5E3C]" />
              <span className="block h-0.5 bg-[#8B5E3C]" />
            </div>
          </button>
          <span className="font-display font-bold text-[#3D2B1F]">{settings.shop_name}</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
