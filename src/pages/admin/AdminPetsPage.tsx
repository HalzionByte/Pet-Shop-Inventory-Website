import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePets, useCategories } from '../../hooks/useStore';
import type { Pet, Availability } from '../../types';
import ImageInput from '../../components/admin/ImageInput';

const BLANK: Omit<Pet, 'id' | 'created_at' | 'updated_at'> = {
  name: '', species: '', breed: '', vaccinated: false,
  availability: 'available', featured: false, description: '', category_id: '', images: [],
};

export default function AdminPetsPage() {
  const { pets, addPet, updatePet, deletePet } = usePets();
  const { categories } = useCategories();
  const [form, setForm] = useState<Omit<Pet, 'id' | 'created_at' | 'updated_at'>>(BLANK);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = pets.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.species.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(BLANK);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (pet: Pet) => {
    setForm({ name: pet.name, species: pet.species, breed: pet.breed, vaccinated: pet.vaccinated,
      availability: pet.availability, featured: pet.featured, description: pet.description,
      category_id: pet.category_id, images: [...pet.images] });
    setEditId(pet.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId) updatePet(editId, form);
    else addPet(form);
    setShowForm(false);
  };

  const addImage = (src: string) => {
    setForm(f => ({ ...f, images: [...f.images, src] }));
  };

  const removeImage = (i: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-main">Pets</h1>
          <p className="text-text-muted text-sm">{pets.length} total</p>
        </div>
        <button onClick={openAdd}
          className="px-5 py-2.5 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold-hover transition-colors text-sm">
          + Add Pet
        </button>
      </div>

      <input type="text" placeholder="Search pets…" value={search} onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full max-w-xs px-4 py-2.5 rounded-xl border border-border-main bg-bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />

      {/* Table */}
      <div className="bg-bg-card rounded-2xl border border-border-main overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-card-alt">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Pet</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Breed</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {filtered.map(pet => (
                <tr key={pet.id} className="hover:bg-bg-main transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-bg-card-alt flex-shrink-0">
                        {pet.images[0]
                          ? <img src={pet.images[0]} alt={pet.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center">🐾</div>}
                      </div>
                      <div>
                        <p className="font-semibold text-text-main">{pet.name}</p>
                        <p className="text-xs text-text-muted">{pet.species}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-main">{pet.breed}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      pet.availability === 'available' ? 'bg-badge-avail-bg text-badge-avail-text' :
                      pet.availability === 'reserved' ? 'bg-badge-res-bg text-badge-res-text' :
                      'bg-badge-sold-bg text-badge-sold-text'}`}>
                      {pet.availability}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold ${pet.featured ? 'text-brand-gold' : 'text-text-subtle'}`}>
                      {pet.featured ? '★ Yes' : '–'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(pet)}
                      className="px-3 py-1.5 text-xs font-semibold text-text-main hover:bg-bg-card-alt rounded-lg transition-colors mr-1">
                      Edit
                    </button>
                    <button onClick={() => { if (confirm(`Delete ${pet.name}?`)) deletePet(pet.id); }}
                      className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-muted">No pets found.</div>
          )}
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-card rounded-3xl p-6 w-full max-w-lg my-8 shadow-xl">
              <h2 className="font-display text-xl font-bold text-text-main mb-5">
                {editId ? 'Edit Pet' : 'Add New Pet'}
              </h2>

              <div className="flex flex-col gap-4">
                <Field label="Pet Name *">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={input} placeholder="e.g. Biscuit" />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Species *">
                    <input value={form.species} onChange={e => setForm(f => ({ ...f, species: e.target.value }))}
                      className={input} placeholder="Dog" />
                  </Field>
                  <Field label="Breed *">
                    <input value={form.breed} onChange={e => setForm(f => ({ ...f, breed: e.target.value }))}
                      className={input} placeholder="Golden Retriever" />
                  </Field>
                </div>

                <Field label="Category">
                  <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
                    className={input}>
                    <option value="">Select category…</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                  </select>
                </Field>

                <Field label="Availability">
                  <select value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value as Availability }))}
                    className={input}>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </Field>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.vaccinated}
                      onChange={e => setForm(f => ({ ...f, vaccinated: e.target.checked }))}
                      className="w-4 h-4 accent-brand-gold" />
                    <span className="text-sm font-semibold text-text-main">Vaccinated</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 accent-brand-gold" />
                    <span className="text-sm font-semibold text-text-main">Featured on Home</span>
                  </label>
                </div>

                <Field label="Description">
                  <textarea value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className={`${input} resize-none`} rows={3} placeholder="Tell visitors about this pet…" />
                </Field>

                <Field label="Images">
                  <ImageInput onConfirm={addImage} placeholder="https://…" confirmLabel="Add" />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-16 h-16 rounded-xl object-cover" />
                        <button onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleSave}
                  className="flex-1 py-3 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold-hover transition-colors">
                  {editId ? 'Save Changes' : 'Add Pet'}
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-5 py-3 border border-border-main text-text-muted font-semibold rounded-xl hover:bg-bg-card-alt transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const input = 'w-full px-3 py-2.5 rounded-xl border border-border-main text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-gold/50 bg-bg-card';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
