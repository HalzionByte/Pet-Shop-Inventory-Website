import { Link } from 'react-router-dom';
import { useSettings } from '../../hooks/useStore';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#5C3D1E] text-[#F5ECD8] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-semibold text-white mb-3">
            <span className="text-2xl">{settings.logo || '🐾'}</span>
            {settings.shop_name}
          </div>
          <p className="text-sm text-[#C49A6C] leading-relaxed">{settings.footer_text}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="text-[#C49A6C] hover:text-white transition-colors">Home</Link>
            <Link to="/pets" className="text-[#C49A6C] hover:text-white transition-colors">Browse Pets</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Visit Us</h4>
          <div className="text-sm text-[#C49A6C] flex flex-col gap-1">
            <p>📍 {settings.address}</p>
            <p>🕐 {settings.business_hours}</p>
          </div>
          <div className="flex gap-3 mt-4">
            {settings.whatsapp && (
              <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#7BC67E] rounded-lg text-white text-xs font-semibold hover:bg-[#4A9B5F] transition-colors">
                WhatsApp
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#F4A261] rounded-lg text-white text-xs font-semibold hover:bg-[#E07832] transition-colors">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
