import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroCarousel from '../../components/public/HeroCarousel';
import PetCard from '../../components/public/PetCard';
import { usePets, useCategories, useCarousel, useSettings } from '../../hooks/useStore';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { pets } = usePets();
  const { categories } = useCategories();
  const { carousel } = useCarousel();
  const { settings } = useSettings();

  const featured = pets.filter(p => p.featured && p.availability !== 'sold').slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <HeroCarousel images={carousel} />

      {/* Featured Pets */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">
              Meet Our Featured Pets
            </h2>
            <p className="text-[#8B5E3C] text-base">These adorable friends are looking for their forever homes</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(pet => (
              <motion.div key={pet.id} variants={fadeUp}>
                <PetCard pet={pet} categories={categories} />
              </motion.div>
            ))}
          </div>

          {featured.length === 0 && (
            <p className="text-center text-[#8B5E3C] py-12">No featured pets right now. Check back soon!</p>
          )}

          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link to="/pets"
              className="inline-block px-8 py-3.5 bg-[#5C3D1E] text-white font-bold rounded-full hover:bg-[#3D2B1F] transition-colors">
              See All Pets →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="bg-[#F5ECD8] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Browse by Category</h2>
              <p className="text-[#8B5E3C]">Find the perfect pet for your lifestyle</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map(cat => (
                <motion.div key={cat.id} variants={fadeUp}>
                  <Link to={`/pets?category=${cat.id}`}
                    className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-[#F5ECD8]">
                    <span className="text-4xl">{cat.emoji}</span>
                    <span className="font-semibold text-[#5C3D1E] text-sm">{cat.name}</span>
                    <span className="text-xs text-[#8B5E3C]">
                      {pets.filter(p => p.category_id === cat.id && p.availability !== 'sold').length} available
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="relative rounded-3xl overflow-hidden h-80">
            <img
              src="https://images.unsplash.com/photo-1516598540642-e8f40a09d939?w=700&h=500&fit=crop&auto=format"
              alt="Our pet shop" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B5E3C]/30 to-transparent" />
          </div>
          <div className="absolute top-4 left-4" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-4">
            About {settings.shop_name}
          </h2>
          <p className="text-[#8B5E3C] leading-relaxed mb-4">
            We are a family-run pet shop with a passion for animals and the people who love them.
            Every pet in our care is raised with love, proper nutrition, and regular veterinary check-ups.
          </p>
          <p className="text-[#8B5E3C] leading-relaxed mb-6">
            Our mission is simple: to connect wonderful animals with wonderful families.
            We believe every pet deserves a loving home, and every family deserves the joy of a great companion.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-[#F5ECD8] px-4 py-2 rounded-xl">
              <span className="text-xl">🏥</span>
              <span className="text-sm font-semibold text-[#5C3D1E]">Vet Checked</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F5ECD8] px-4 py-2 rounded-xl">
              <span className="text-xl">💉</span>
              <span className="text-sm font-semibold text-[#5C3D1E]">Vaccinated</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F5ECD8] px-4 py-2 rounded-xl">
              <span className="text-xl">❤️</span>
              <span className="text-sm font-semibold text-[#5C3D1E]">Raised with Love</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="bg-[#F4A261]/10 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2B1F] mb-2">Come Visit Us</h2>
              <p className="text-[#8B5E3C]">We would love to meet you and help you find your new best friend</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-[#3D2B1F] mb-1">Our Location</h3>
                <p className="text-sm text-[#8B5E3C]">{settings.address}</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">🕐</div>
                <h3 className="font-semibold text-[#3D2B1F] mb-1">Business Hours</h3>
                <p className="text-sm text-[#8B5E3C] whitespace-pre-line">{settings.business_hours}</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-[#3D2B1F] mb-2">Contact Us</h3>
                <div className="flex flex-col gap-2">
                  {settings.whatsapp && (
                    <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#7BC67E] text-white text-sm font-semibold rounded-xl hover:bg-[#4A9B5F] transition-colors">
                      WhatsApp Us
                    </a>
                  )}
                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#F4A261] text-white text-sm font-semibold rounded-xl hover:bg-[#E07832] transition-colors">
                      Instagram
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Map placeholder */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden h-48 bg-[#F5ECD8] flex items-center justify-center border border-[#F5ECD8]">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm text-[#8B5E3C] font-semibold">{settings.address}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
