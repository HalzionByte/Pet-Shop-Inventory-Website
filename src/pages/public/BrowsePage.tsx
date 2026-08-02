import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PetCard from '../../components/public/PetCard';
import { usePets, useCategories } from '../../hooks/useStore';
import type { Availability } from '../../types';

export default function BrowsePage() {
  const { pets } = usePets();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedAvailability, setSelectedAvailability] = useState<Availability | ''>('');

  const filtered = useMemo(() => {
    return pets.filter(p => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q);
      const matchesCat = !selectedCategory || p.category_id === selectedCategory;
      const matchesAvail = !selectedAvailability || p.availability === selectedAvailability;
      return matchesSearch && matchesCat && matchesAvail;
    });
  }, [pets, search, selectedCategory, selectedAvailability]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    if (id) setSearchParams({ category: id });
    else setSearchParams({});
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-1">Browse All Pets</h1>
          <p className="text-[#8B5E3C]">{filtered.length} adorable friends waiting to meet you 🐾</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by name, species, breed…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-52 px-4 py-2.5 rounded-xl border border-[#F5ECD8] bg-white text-sm text-[#3D2B1F] placeholder:text-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50"
          />

          <select
            value={selectedCategory}
            onChange={e => handleCategoryChange(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#F5ECD8] bg-white text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50">
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
            ))}
          </select>

          <select
            value={selectedAvailability}
            onChange={e => setSelectedAvailability(e.target.value as Availability | '')}
            className="px-4 py-2.5 rounded-xl border border-[#F5ECD8] bg-white text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50">
            <option value="">All Availability</option>
            <option value="available">✅ Available</option>
            <option value="reserved">🟡 Reserved</option>
            <option value="sold">🔴 Sold</option>
          </select>

          {(search || selectedCategory || selectedAvailability) && (
            <button onClick={() => { setSearch(''); handleCategoryChange(''); setSelectedAvailability(''); }}
              className="px-4 py-2.5 rounded-xl border border-[#F5ECD8] bg-white text-sm text-[#8B5E3C] hover:bg-[#F5ECD8] transition-colors">
              Clear ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
            {filtered.map(pet => (
              <motion.div key={pet.id}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                <PetCard pet={pet} categories={categories} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="font-display text-xl font-semibold text-[#3D2B1F] mb-2">No pets found</h3>
            <p className="text-[#8B5E3C]">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
