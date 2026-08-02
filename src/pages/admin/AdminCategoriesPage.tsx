import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useStore';

const EMOJIS = ['🐶','🐱','🐦','🐠','🐰','🦎','🐹','🦜','🐍','🦊','🐇','🦋','🐢','🐧','🦩'];

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory, getPetCount } = useCategories();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🐾');
  const [editId, setEditId] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim()) return;
    if (editId) {
      updateCategory(editId, name.trim(), emoji);
      setEditId(null);
    } else {
      addCategory(name.trim(), emoji);
    }
    setName('');
    setEmoji('🐾');
  };

  const startEdit = (id: string, n: string, e: string) => {
    setEditId(id);
    setName(n);
    setEmoji(e);
  };

  const cancelEdit = () => {
    setEditId(null);
    setName('');
    setEmoji('🐾');
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-bold text-[#3D2B1F] mb-6">Categories</h1>

      {/* Add/Edit form */}
      <div className="bg-white rounded-2xl border border-[#F5ECD8] p-5 mb-6">
        <h2 className="font-semibold text-[#3D2B1F] mb-4">{editId ? 'Edit Category' : 'Add Category'}</h2>
        <div className="flex gap-3 mb-3">
          <div className="flex gap-1 flex-wrap">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                className={`w-8 h-8 rounded-lg text-lg transition-all ${emoji === e ? 'bg-[#F4A261] scale-110' : 'hover:bg-[#F5ECD8]'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#F5ECD8] flex items-center justify-center text-2xl flex-shrink-0">
            {emoji}
          </div>
          <input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            placeholder="Category name…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50" />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={handleSave}
            className="px-5 py-2.5 bg-[#F4A261] text-white font-bold rounded-xl hover:bg-[#E07832] transition-colors text-sm">
            {editId ? 'Save' : 'Add Category'}
          </button>
          {editId && (
            <button onClick={cancelEdit}
              className="px-4 py-2.5 border border-[#F5ECD8] text-[#8B5E3C] font-semibold rounded-xl hover:bg-[#F5ECD8] transition-colors text-sm">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-[#F5ECD8] overflow-hidden">
        {categories.map((cat, i) => (
          <motion.div key={cat.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-[#F5ECD8]' : ''} hover:bg-[#FFF8F0] transition-colors`}>
            <span className="text-2xl">{cat.emoji}</span>
            <span className="flex-1 font-semibold text-[#3D2B1F]">{cat.name}</span>
            <button onClick={() => startEdit(cat.id, cat.name, cat.emoji)}
              className="px-3 py-1.5 text-xs font-semibold text-[#5C3D1E] hover:bg-[#F5ECD8] rounded-lg transition-colors">
              Edit
            </button>
            <button onClick={() => {
                const count = getPetCount(cat.id);
                const msg = count > 0
                  ? `Delete "${cat.name}"? ${count} pet${count > 1 ? 's' : ''} will be unassigned from this category (they won't be deleted).`
                  : `Delete "${cat.name}"?`;
                if (confirm(msg)) deleteCategory(cat.id);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              Delete
            </button>
          </motion.div>
        ))}
        {categories.length === 0 && (
          <p className="text-center py-8 text-[#8B5E3C] text-sm">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
