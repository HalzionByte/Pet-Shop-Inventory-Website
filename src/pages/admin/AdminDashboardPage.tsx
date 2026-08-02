import { motion } from 'framer-motion';
import { usePets, useCarousel } from '../../hooks/useStore';

function PetImagePreview({ src, alt }: { src?: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  const safeSrc = src?.trim();

  if (!safeSrc || errored) {
    return <div className="flex h-full w-full items-center justify-center text-2xl">🐾</div>;
  }

  return <img src={safeSrc} alt={alt} className="h-full w-full object-cover" onError={() => setErrored(true)} />;
}

export default function AdminDashboardPage() {
  const { pets } = usePets();
  const { carousel } = useCarousel();

  const stats = [
    { label: 'Total Pets', value: pets.length, icon: '🐾', color: 'bg-bg-card-alt', text: 'text-text-main' },
    { label: 'Available', value: pets.filter(p => p.availability === 'available').length, icon: '✅', color: 'bg-badge-avail-bg', text: 'text-badge-avail-text' },
    { label: 'Reserved', value: pets.filter(p => p.availability === 'reserved').length, icon: '🟡', color: 'bg-badge-res-bg', text: 'text-badge-res-text' },
    { label: 'Sold', value: pets.filter(p => p.availability === 'sold').length, icon: '🔴', color: 'bg-badge-sold-bg', text: 'text-badge-sold-text' },
    { label: 'Carousel Images', value: carousel.filter(c => c.enabled).length, icon: '🖼️', color: 'bg-brand-blue/30', text: 'text-brand-blue' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-text-main">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">Welcome back! Here's your shop at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`${s.color} rounded-2xl p-5 flex flex-col gap-2`}>
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
            <p className={`text-xs font-semibold ${s.text} opacity-80`}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-bg-card rounded-2xl p-6 border border-border-main">
        <h2 className="font-display font-bold text-text-main mb-4">Recent Pets</h2>
        <div className="space-y-3">
          {pets.slice(-5).reverse().map(pet => (
            <div key={pet.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-main transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-bg-card-alt flex-shrink-0">
                <PetImagePreview src={pet.images[0]} alt={pet.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-main text-sm truncate">{pet.name}</p>
                <p className="text-xs text-text-muted">{pet.species} · {pet.breed}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                pet.availability === 'available' ? 'bg-badge-avail-bg text-badge-avail-text' :
                pet.availability === 'reserved' ? 'bg-badge-res-bg text-badge-res-text' :
                'bg-badge-sold-bg text-badge-sold-text'
              }`}>{pet.availability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
