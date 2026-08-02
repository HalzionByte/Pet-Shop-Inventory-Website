import { Link } from 'react-router-dom';
import { useSettings } from '../../hooks/useStore';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 border-t border-[#F0E0C7] bg-[#5C3D1E] text-[#FFF8F0]">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-white">
            <span className="text-2xl">{settings.logo || '🐾'}</span>
            {settings.shop_name}
          </div>
          <p className="text-sm leading-relaxed text-[#F5ECD8]">{settings.footer_text}</p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="text-[#F5ECD8] transition-colors hover:text-white">Home</Link>
            <Link to="/pets" className="text-[#F5ECD8] transition-colors hover:text-white">Browse Pets</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Visit Us</h4>
          <div className="flex flex-col gap-1 text-sm text-[#F5ECD8]">
            <p>📍 {settings.address}</p>
            <p>🕐 {settings.business_hours}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {settings.whatsapp && (
              <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-[#7BC67E] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#4A9B5F]">
                WhatsApp
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-[#F4A261] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#E07832]">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
