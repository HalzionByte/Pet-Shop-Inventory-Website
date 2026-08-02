import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Pet, Category } from '../../types';
import { useSettings } from '../../hooks/useStore';

interface Props {
  pet: Pet;
  categories: Category[];
}

const availabilityConfig = {
  available: { label: 'Available', bg: 'bg-badge-avail-bg', text: 'text-badge-avail-text' },
  reserved: { label: 'Reserved', bg: 'bg-badge-res-bg', text: 'text-badge-res-text' },
  sold: { label: 'Sold', bg: 'bg-badge-sold-bg', text: 'text-badge-sold-text' },
};

function PetImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  const safeSrc = src?.trim();

  if (!safeSrc || errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FDF3E7] text-5xl">
        🐾
      </div>
    );
  }

  return <img src={safeSrc} alt={alt} className={className} onError={() => setErrored(true)} />;
}

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
      className="bg-bg-card rounded-3xl overflow-hidden shadow-md border border-border-main flex flex-col">
      <div className="relative overflow-hidden h-52 bg-bg-card-alt">
        <PetImage
          src={pet.images[0]}
          alt={pet.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${avail.bg} ${avail.text}`}>
          {avail.label}
        </div>
        {cat && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-bg-card/80 text-text-muted">
            {cat.emoji} {cat.name}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-text-main">{pet.name}</h3>
          <p className="text-sm text-text-muted">{pet.species} · {pet.breed}</p>
        </div>

        {pet.vaccinated && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-badge-avail-text bg-badge-avail-bg px-2.5 py-1 rounded-full w-fit">
            ✓ Vaccinated
          </span>
        )}

        <div className="flex gap-2 mt-auto pt-1">
          <Link to={`/pets/${pet.id}`}
            className="flex-1 text-center py-2 rounded-xl bg-brand-gold text-white text-sm font-semibold hover:bg-brand-gold-hover transition-colors">
            Meet Me 🐾
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-brand-green text-white text-sm font-semibold hover:bg-brand-green-hover transition-colors">
            💬
          </a>
        </div>
      </div>
    </motion.div>
  );
}
