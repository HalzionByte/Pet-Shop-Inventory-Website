import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useStore';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5ECD8] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>
          <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">Admin Panel</h1>
          <p className="text-[#8B5E3C] text-sm mt-1">Sign in to manage your pet shop</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider block mb-1.5">
              Username
            </label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50"
              placeholder="admin" required />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50"
              placeholder="••••••••" required />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button type="submit"
            className="py-3 bg-[#F4A261] text-white font-bold rounded-xl hover:bg-[#E07832] transition-colors">
            Sign In
          </button>
        </form>


      </motion.div>
    </div>
  );
}
