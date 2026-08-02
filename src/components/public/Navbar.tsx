import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../hooks/useStore';

export default function Navbar() {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pets', label: 'Browse Pets' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#F5ECD8]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-[#5C3D1E]">
          <img src="/icon.jpg" alt="Store Logo" className="w-8 h-8 rounded-full object-cover shadow-sm bg-white" />
          {settings.shop_name}
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  location.pathname === l.to
                    ? 'bg-[#F4A261] text-white'
                    : 'text-[#8B5E3C] hover:bg-[#F5ECD8]'
                }`}>
                {l.label}
              </Link>
            ))}
            <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-full bg-[#7BC67E] text-white text-sm font-semibold hover:bg-[#4A9B5F] transition-colors">
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-xl hover:bg-[#F5ECD8] transition-colors"
            onClick={() => setOpen(!open)} aria-label="Menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#8B5E3C] transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-[#8B5E3C] transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#8B5E3C] transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-[#F5ECD8] bg-[#FFF8F0]">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    location.pathname === l.to ? 'bg-[#F4A261] text-white' : 'text-[#8B5E3C] hover:bg-[#F5ECD8]'
                  }`}>
                  {l.label}
                </Link>
              ))}
              <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#7BC67E] text-white text-sm font-semibold text-center mt-1">
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
