import { motion } from 'framer-motion';
import { usePets, useCarousel } from '../../hooks/useStore';

export default function AdminDashboardPage() {
  const { pets } = usePets();
  const { carousel } = useCarousel();

  const stats = [
    { label: 'Total Pets', value: pets.length, icon: '🐾', color: 'bg-[#F5ECD8]', text: 'text-[#5C3D1E]' },
    { label: 'Available', value: pets.filter(p => p.availability === 'available').length, icon: '✅', color: 'bg-[#B8E4BA]', text: 'text-[#2D6A35]' },
    { label: 'Reserved', value: pets.filter(p => p.availability === 'reserved').length, icon: '🟡', color: 'bg-[#FFE0A0]', text: 'text-[#8B5E00]' },
    { label: 'Sold', value: pets.filter(p => p.availability === 'sold').length, icon: '🔴', color: 'bg-[#FFD1D1]', text: 'text-[#8B2020]' },
    { label: 'Carousel Images', value: carousel.filter(c => c.enabled).length, icon: '🖼️', color: 'bg-[#D6F0F1]', text: 'text-[#2C6B6E]' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">Dashboard</h1>
        <p className="text-[#8B5E3C] text-sm mt-1">Welcome back! Here's your shop at a glance.</p>
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

      <div className="bg-white rounded-2xl p-6 border border-[#F5ECD8]">
        <h2 className="font-display font-bold text-[#3D2B1F] mb-4">Recent Pets</h2>
        <div className="space-y-3">
          {pets.slice(-5).reverse().map(pet => (
            <div key={pet.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF8F0] transition-colors">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5ECD8] flex-shrink-0">
                {pet.images[0] ? (
                  <img src={pet.images[0]} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg">🐾</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#3D2B1F] text-sm truncate">{pet.name}</p>
                <p className="text-xs text-[#8B5E3C]">{pet.species} · {pet.breed}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                pet.availability === 'available' ? 'bg-[#B8E4BA] text-[#2D6A35]' :
                pet.availability === 'reserved' ? 'bg-[#FFE0A0] text-[#8B5E00]' :
                'bg-[#FFD1D1] text-[#8B2020]'
              }`}>{pet.availability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
