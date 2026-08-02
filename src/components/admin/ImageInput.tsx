import { useState, useRef, useCallback } from 'react';

interface ImageInputProps {
  /** Called with the final image string (URL or base64 data URL) */
  onConfirm: (src: string) => void;
  /** Placeholder for the URL input */
  placeholder?: string;
  /** Label for the confirm button */
  confirmLabel?: string;
}

type Tab = 'url' | 'upload';

/** Compress and resize an image file to max 800px, JPEG quality 0.72 */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 800;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width > height) { height = Math.round((height / width) * MAX); width = MAX; }
        else { width = Math.round((width / height) * MAX); height = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.72));
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

export default function ImageInput({
  onConfirm,
  placeholder = 'https://…',
  confirmLabel = 'Add',
}: ImageInputProps) {
  const [tab, setTab] = useState<Tab>('url');
  const [urlValue, setUrlValue] = useState('');
  const [preview, setPreview] = useState('');
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setError('');
    compressImage(file)
      .then(setPreview)
      .catch(() => setError('Failed to process image. Please try another file.'));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleConfirm = () => {
    const src = tab === 'url' ? urlValue.trim() : preview;
    if (!src) return;
    onConfirm(src);
    // reset
    setUrlValue('');
    setPreview('');
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }
  };

  const currentPreview = tab === 'url' ? urlValue.trim() : preview;
  const canConfirm = !!currentPreview;

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex bg-[#F5ECD8] rounded-xl p-1 gap-1">
        {(['url', 'upload'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setError(''); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === t
                ? 'bg-white text-[#3D2B1F] shadow-sm'
                : 'text-[#8B5E3C] hover:text-[#3D2B1F]'
            }`}
          >
            {t === 'url' ? '🔗 Image URL' : '📁 Upload File'}
          </button>
        ))}
      </div>

      {/* URL tab */}
      {tab === 'url' && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onKeyDown={handleUrlKeyDown}
            placeholder={placeholder}
            className="flex-1 px-3 py-2.5 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-white"
          />
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="px-4 py-2 bg-[#F4A261] text-white rounded-xl text-sm font-bold hover:bg-[#E07832] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {confirmLabel}
          </button>
        </div>
      )}

      {/* Upload tab */}
      {tab === 'upload' && (
        <div className="flex flex-col gap-2">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all py-6 px-4 ${
              dragging
                ? 'border-[#F4A261] bg-[#FFF3E8]'
                : 'border-[#F5ECD8] bg-[#FAFAFA] hover:border-[#F4A261] hover:bg-[#FFF8F0]'
            }`}
          >
            <span className="text-3xl">🖼️</span>
            <p className="text-sm font-semibold text-[#5C3D1E]">
              {dragging ? 'Drop to upload' : 'Click or drag & drop an image'}
            </p>
            <p className="text-xs text-[#C49A6C]">PNG, JPG, WEBP, GIF supported</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          {preview && (
            <div className="flex gap-2 items-start">
              <div className="flex-1 rounded-xl overflow-hidden h-24 bg-[#F5ECD8]">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-[#F4A261] text-white rounded-xl text-sm font-bold hover:bg-[#E07832] transition-colors whitespace-nowrap"
                >
                  {confirmLabel}
                </button>
                <button
                  type="button"
                  onClick={() => { setPreview(''); if (fileRef.current) fileRef.current.value = ''; }}
                  className="px-4 py-2 border border-[#F5ECD8] text-[#8B5E3C] rounded-xl text-sm font-semibold hover:bg-[#F5ECD8] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Shared preview for URL tab */}
      {tab === 'url' && urlValue.trim() && (
        <div className="rounded-xl overflow-hidden h-28 bg-[#F5ECD8]">
          <img
            src={urlValue.trim()}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
    </div>
  );
}
