import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { useCarousel } from '../../hooks/useStore';
import type { CarouselImage } from '../../types';
import ImageInput from '../../components/admin/ImageInput';

export default function AdminCarouselPage() {
  const { carousel, addImage, updateImage, deleteImage, reorder } = useCarousel();
  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const sorted = [...carousel].sort((a, b) => a.display_order - b.display_order);

  const handleAdd = (src: string) => {
    addImage({ image_url: src, title, subtitle, enabled: true });
    setImageSrc(''); setTitle(''); setSubtitle('');
  };

  const startEdit = (c: CarouselImage) => {
    setEditId(c.id); setImageSrc(c.image_url); setTitle(c.title); setSubtitle(c.subtitle);
  };

  const handleSave = (src?: string) => {
    if (!editId) return;
    updateImage(editId, { image_url: src ?? imageSrc, title, subtitle });
    setEditId(null); setImageSrc(''); setTitle(''); setSubtitle('');
  };

  const handleReorder = (newOrder: CarouselImage[]) => {
    reorder(newOrder.map((item, i) => ({ ...item, display_order: i + 1 })));
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[#3D2B1F] mb-6">Homepage Carousel</h1>

      {/* Add/Edit form */}
      <div className="bg-white rounded-2xl border border-[#F5ECD8] p-5 mb-6">
        <h2 className="font-semibold text-[#3D2B1F] mb-4">{editId ? 'Edit Slide' : 'Add Slide'}</h2>
        <div className="flex flex-col gap-3">
          {/* Image input — URL or file upload */}
          {editId ? (
            <div className="flex flex-col gap-2">
              {imageSrc && (
                <div className="rounded-xl overflow-hidden h-32 bg-[#F5ECD8]">
                  <img src={imageSrc} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-xs text-[#8B5E3C] font-medium">Replace image (optional):</p>
              <ImageInput
                onConfirm={(src) => setImageSrc(src)}
                placeholder="https://…"
                confirmLabel="Use this image"
              />
            </div>
          ) : (
            <ImageInput onConfirm={handleAdd} placeholder="https://…" confirmLabel="→" />
          )}
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Slide title (optional)" className={inp} />
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)}
            placeholder="Slide subtitle (optional)" className={inp} />
          <div className="flex gap-2">
            {editId && (
              <>
                <button onClick={() => handleSave()}
                  className="px-5 py-2.5 bg-[#F4A261] text-white font-bold rounded-xl hover:bg-[#E07832] transition-colors text-sm">
                  Save Changes
                </button>
                <button onClick={() => { setEditId(null); setImageSrc(''); setTitle(''); setSubtitle(''); }}
                  className="px-4 py-2.5 border border-[#F5ECD8] text-[#8B5E3C] font-semibold rounded-xl hover:bg-[#F5ECD8] transition-colors text-sm">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reorderable list */}
      <div className="bg-white rounded-2xl border border-[#F5ECD8] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F5ECD8] text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">
          Drag to reorder · {sorted.length} slides
        </div>
        <Reorder.Group axis="y" values={sorted} onReorder={handleReorder} className="divide-y divide-[#F5ECD8]">
          {sorted.map(item => (
            <Reorder.Item key={item.id} value={item} className="flex items-center gap-3 p-3 hover:bg-[#FFF8F0] cursor-grab active:cursor-grabbing">
              <span className="text-[#C49A6C] select-none">⠿</span>
              <div className="w-16 h-12 rounded-xl overflow-hidden bg-[#F5ECD8] flex-shrink-0">
                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#3D2B1F] text-sm truncate">{item.title || 'Untitled Slide'}</p>
                <p className="text-xs text-[#8B5E3C] truncate">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateImage(item.id, { enabled: !item.enabled })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    item.enabled ? 'bg-[#B8E4BA] text-[#2D6A35]' : 'bg-[#F5ECD8] text-[#8B5E3C]'}`}>
                  {item.enabled ? 'On' : 'Off'}
                </button>
                <button onClick={() => startEdit(item)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#5C3D1E] hover:bg-[#F5ECD8] rounded-lg transition-colors">
                  Edit
                </button>
                <button onClick={() => { if (confirm('Delete this slide?')) deleteImage(item.id); }}
                  className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  Delete
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        {sorted.length === 0 && (
          <p className="text-center py-8 text-[#8B5E3C] text-sm">No carousel images yet.</p>
        )}
      </div>
    </div>
  );
}

const inp = 'w-full px-4 py-2.5 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-white';
