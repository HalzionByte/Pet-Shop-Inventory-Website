import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Pet, Category } from '../../types';
import { useSettings } from '../../hooks/useStore';

interface Props {
  pet: Pet;
  categories: Category[];
}

const availabilityConfig = {
  available: { label: 'Available', bg: 'bg-[#B8E4BA]', text: 'text-[#2D6A35]' },
  reserved: { label: 'Reserved', bg: 'bg-[#FFE0A0]', text: 'text-[#8B5E00]' },
  sold: { label: 'Sold', bg: 'bg-[#FFD1D1]', text: 'text-[#8B2020]' },
};

export default function PetCard({ pet, categories }: Props) {
  const { settings } = useSettings();
  const avail = availabilityConfig[pet.availability];
  const cat = categories.find(c => c.id === pet.category_id);
  const waMsg = encodeURIComponent(`Hi! I'm interested in ${pet.name} 🐾`);
  const waLink = `https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}?text=${waMsg}`;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(91,61,30,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#F5ECD8] flex flex-col">
      <div className="relative overflow-hidden h-52 bg-[#F5ECD8]">
        {pet.images[0] ? (
          <img src={pet.images[0]} alt={pet.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🐾</div>
        )}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${avail.bg} ${avail.text}`}>
          {avail.label}
        </div>
        {cat && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/80 text-[#8B5E3C]">
            {cat.emoji} {cat.name}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#3D2B1F]">{pet.name}</h3>
          <p className="text-sm text-[#8B5E3C]">{pet.species} · {pet.breed}</p>
        </div>

        {pet.vaccinated && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D6A35] bg-[#B8E4BA] px-2.5 py-1 rounded-full w-fit">
            ✓ Vaccinated
          </span>
        )}

        <div className="flex gap-2 mt-auto pt-1">
          <Link to={`/pets/${pet.id}`}
            className="flex-1 text-center py-2 rounded-xl bg-[#F4A261] text-white text-sm font-semibold hover:bg-[#E07832] transition-colors">
            Meet Me 🐾
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-[#7BC67E] text-white text-sm font-semibold hover:bg-[#4A9B5F] transition-colors">
            💬
          </a>
        </div>
      </div>
    </motion.div>
  );
}
