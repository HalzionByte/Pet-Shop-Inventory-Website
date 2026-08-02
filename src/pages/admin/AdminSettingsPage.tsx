import { useState } from 'react';
import { useSettings } from '../../hooks/useStore';
import type { SiteSettings } from '../../types';

const LOGO_OPTIONS = ['🐾', '🐶', '🐱', '🦮', '🐩', '🌟', '🏠', '💝'];

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState<SiteSettings>({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (key: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-[#3D2B1F] mb-6">Site Settings</h1>

      <div className="bg-white rounded-2xl border border-[#F5ECD8] p-6 flex flex-col gap-5">
        <Field label="Shop Name">
          <input value={form.shop_name} onChange={set('shop_name')} className={inp} />
        </Field>

        <Field label="Logo Emoji">
          <div className="flex gap-2 flex-wrap mb-2">
            {LOGO_OPTIONS.map(e => (
              <button key={e} onClick={() => setForm(f => ({ ...f, logo: e }))}
                className={`w-10 h-10 rounded-xl text-2xl transition-all ${form.logo === e ? 'bg-[#F4A261] scale-110' : 'hover:bg-[#F5ECD8]'}`}>
                {e}
              </button>
            ))}
          </div>
          <input value={form.logo} onChange={set('logo')} className={inp} placeholder="or type any emoji" />
        </Field>

        <Field label="Address">
          <input value={form.address} onChange={set('address')} className={inp} />
        </Field>

        <Field label="Business Hours">
          <textarea value={form.business_hours} onChange={set('business_hours')}
            className={`${inp} resize-none`} rows={2} />
        </Field>

        <Field label="WhatsApp Number">
          <input value={form.whatsapp} onChange={set('whatsapp')} className={inp}
            placeholder="+15551234567" />
          <p className="text-xs text-[#C49A6C] mt-1">Include country code, digits only preferred</p>
        </Field>

        <Field label="Instagram URL">
          <input value={form.instagram} onChange={set('instagram')} className={inp}
            placeholder="https://instagram.com/yourshop" />
        </Field>

        <Field label="Facebook URL">
          <input value={form.facebook} onChange={set('facebook')} className={inp}
            placeholder="https://facebook.com/yourshop" />
        </Field>

        <Field label="Footer Text">
          <input value={form.footer_text} onChange={set('footer_text')} className={inp} />
        </Field>

        <button onClick={handleSave}
          className={`py-3 font-bold rounded-xl transition-colors text-sm ${
            saved ? 'bg-[#7BC67E] text-white' : 'bg-[#F4A261] text-white hover:bg-[#E07832]'
          }`}>
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

const inp = 'w-full px-4 py-2.5 rounded-xl border border-[#F5ECD8] text-sm text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
