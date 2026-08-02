import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePets, useCategories, useSettings } from '../../hooks/useStore';

const availabilityConfig = {
  available: { label: 'Available', bg: 'bg-badge-avail-bg', text: 'text-badge-avail-text', dot: 'bg-[#4A9B5F]' },
  reserved: { label: 'Reserved', bg: 'bg-badge-res-bg', text: 'text-badge-res-text', dot: 'bg-brand-gold' },
  sold: { label: 'Sold', bg: 'bg-badge-sold-bg', text: 'text-badge-sold-text', dot: 'bg-red-400' },
};

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { pets } = usePets();
  const { categories } = useCategories();
  const { settings } = useSettings();
  const [imgIdx, setImgIdx] = useState(0);

  const pet = pets.find(p => p.id === id);

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-7xl mb-4">🐾</div>
        <h2 className="font-display text-2xl font-bold text-text-main mb-2">Pet not found</h2>
        <p className="text-text-muted mb-6">This pet may have already found a home!</p>
        <Link to="/pets" className="px-6 py-3 bg-brand-gold text-white font-bold rounded-full hover:bg-brand-gold-hover transition-colors">
          Browse All Pets
        </Link>
      </div>
    );
  }

  const avail = availabilityConfig[pet.availability];
  const cat = categories.find(c => c.id === pet.category_id);
  const waMsg = encodeURIComponent(`Hi! I'm interested in ${pet.name} 🐾`);
  const waLink = `https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}?text=${waMsg}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/pets" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main mb-6 font-semibold transition-colors">
        ← Back to Browse
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="rounded-3xl overflow-hidden h-80 md:h-96 bg-bg-card-alt mb-3">
            {pet.images.length > 0 ? (
              <motion.img key={imgIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={pet.images[imgIdx]} alt={pet.name}
                className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl">🐾</div>
            )}
          </div>
          {pet.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {pet.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    i === imgIdx ? 'border-brand-gold scale-105' : 'border-transparent'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-main">{pet.name}</h1>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${avail.bg} ${avail.text}`}>
              <span className={`w-2 h-2 rounded-full ${avail.dot}`} />
              {avail.label}
            </div>
          </div>

          {cat && (
            <p className="text-text-muted mb-4 font-semibold">{cat.emoji} {cat.name}</p>
          )}

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-bg-card-alt rounded-2xl p-3">
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-1">Species</p>
              <p className="font-semibold text-text-main">{pet.species}</p>
            </div>
            <div className="bg-bg-card-alt rounded-2xl p-3">
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-1">Breed</p>
              <p className="font-semibold text-text-main">{pet.breed}</p>
            </div>
            <div className="bg-bg-card-alt rounded-2xl p-3 col-span-2">
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-1">Vaccinated</p>
              <p className={`font-semibold ${pet.vaccinated ? 'text-badge-avail-text' : 'text-text-muted'}`}>
                {pet.vaccinated ? '✓ Yes, fully vaccinated' : '✗ Not vaccinated'}
              </p>
            </div>
          </div>

          {pet.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-text-main mb-2">About {pet.name}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{pet.description}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-green-hover transition-colors text-base">
              💬 Ask on WhatsApp
            </a>
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold-hover transition-colors text-base">
                📸 Find Us on Instagram
              </a>
            )}
            <Link to="/pets"
              className="flex items-center justify-center gap-2 py-3 border-2 border-border-main text-text-muted font-semibold rounded-xl hover:bg-bg-card-alt transition-colors text-sm">
              ← Browse More Pets
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
