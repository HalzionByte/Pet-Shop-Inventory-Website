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
      <h1 className="font-display text-2xl font-bold text-text-main mb-6">Categories</h1>

      {/* Add/Edit form */}
      <div className="bg-bg-card rounded-2xl border border-border-main p-5 mb-6">
        <h2 className="font-semibold text-text-main mb-4">{editId ? 'Edit Category' : 'Add Category'}</h2>
        <div className="flex gap-3 mb-3">
          <div className="flex gap-1 flex-wrap">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                className={`w-8 h-8 rounded-lg text-lg transition-all ${emoji === e ? 'bg-brand-gold scale-110' : 'hover:bg-bg-card-alt'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-bg-card-alt flex items-center justify-center text-2xl flex-shrink-0">
            {emoji}
          </div>
          <input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            placeholder="Category name…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-border-main text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={handleSave}
            className="px-5 py-2.5 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold-hover transition-colors text-sm">
            {editId ? 'Save' : 'Add Category'}
          </button>
          {editId && (
            <button onClick={cancelEdit}
              className="px-4 py-2.5 border border-border-main text-text-muted font-semibold rounded-xl hover:bg-bg-card-alt transition-colors text-sm">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="bg-bg-card rounded-2xl border border-border-main overflow-hidden">
        {categories.map((cat, i) => (
          <motion.div key={cat.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-border-main' : ''} hover:bg-bg-main transition-colors`}>
            <span className="text-2xl">{cat.emoji}</span>
            <span className="flex-1 font-semibold text-text-main">{cat.name}</span>
            <button onClick={() => startEdit(cat.id, cat.name, cat.emoji)}
              className="px-3 py-1.5 text-xs font-semibold text-text-main hover:bg-bg-card-alt rounded-lg transition-colors">
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
          <p className="text-center py-8 text-text-muted text-sm">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
