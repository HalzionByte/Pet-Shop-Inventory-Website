import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { CarouselImage } from '../../types';

interface Props { images: CarouselImage[] }

export default function HeroCarousel({ images }: Props) {
  const enabled = images.filter(i => i.enabled).sort((a, b) => a.display_order - b.display_order);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex(i => (i + 1) % enabled.length), [enabled.length]);
  const prev = () => setIndex(i => (i - 1 + enabled.length) % enabled.length);

  useEffect(() => {
    if (enabled.length < 2) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, enabled.length]);

  if (!enabled.length) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-bg-card-alt flex items-center justify-center rounded-3xl overflow-hidden mx-4 my-4">
        <p className="text-text-muted font-display text-2xl">Welcome to Our Pet Shop 🐾</p>
      </div>
    );
  }

  const slide = enabled[index];

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={slide.id}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0">
          <img src={slide.image_url} alt={slide.title}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text overlay */}
      <AnimatePresence mode="wait">
        <motion.div key={`text-${slide.id}`}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-16 left-0 right-0 text-center px-6">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {slide.title}
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-6 max-w-xl mx-auto">{slide.subtitle}</p>
          <Link to="/pets"
            className="inline-block px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-white font-bold rounded-full text-base transition-colors shadow-lg">
            Browse Our Pets 🐾
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {enabled.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bg-card/20 hover:bg-bg-card/40 backdrop-blur text-white flex items-center justify-center text-lg transition-colors">
            ‹
          </button>
          <button onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bg-card/20 hover:bg-bg-card/40 backdrop-blur text-white flex items-center justify-center text-lg transition-colors">
            ›
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {enabled.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-bg-card scale-125' : 'bg-bg-card/50'}`} />
        ))}
      </div>
    </div>
  );
}
