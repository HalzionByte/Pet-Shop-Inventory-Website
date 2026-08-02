import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}>
        <div className="text-8xl mb-6">🐾</div>
        <h1 className="font-display text-5xl font-bold text-text-main mb-3">Oops! Lost Paw</h1>
        <p className="text-text-muted text-lg mb-8 max-w-md">
          Looks like this page wandered off. Our pets are great at escaping but terrible at navigation!
        </p>
        <Link to="/"
          className="px-8 py-3.5 bg-brand-gold text-white font-bold rounded-full hover:bg-brand-gold-hover transition-colors text-base">
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
