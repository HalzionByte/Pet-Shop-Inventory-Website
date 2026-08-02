import { useState, useEffect } from 'react';
import {
  ref,
  onValue,
  set,
  update,
  remove,
  get,
} from 'firebase/database';
import { db } from '../lib/firebase';
import type { Pet, Category, CarouselImage, SiteSettings } from '../types';
import { seedCategories, seedPets, seedCarousel, seedSettings } from '../data/seed';

// ─── Auth (still localStorage — session is intentionally per-device) ──────────

const AUTH_KEY = 'pawsome_auth';

const _UH = '32f40970feadebceec44ddb589124800e0d63d3311f5bdaef7f95d01cf0cbbc9';
const _PH = '3349b0be841878fb1386decaac8a24094460334fdeb9c165b2277ea96a31ba67';

async function sha256hex(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem(AUTH_KEY));

  const login = async (username: string, password: string): Promise<boolean> => {
    const [uh, ph] = await Promise.all([sha256hex(username), sha256hex(password)]);
    if (uh === _UH && ph === _PH) {
      localStorage.setItem(AUTH_KEY, 'pawsome_jwt_token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}

// ─── Seed / init ──────────────────────────────────────────────────────────────

/**
 * Seeds Firestore with default data on the very first run (checked via a
 * _meta/initialized flag so it only runs once across ALL devices).
 */
export async function initStore() {
  const metaRef = ref(db, '_meta/initialized');
  const snap = await get(metaRef);
  if (snap.exists()) return; // already seeded

  const batch: Record<string, unknown> = {};
  seedCategories.forEach(cat => { batch[`categories/${cat.id}`] = cat; });
  seedPets.forEach(pet => { batch[`pets/${pet.id}`] = pet; });
  seedCarousel.forEach(img => { batch[`carousel/${img.id}`] = img; });
  batch['settings'] = seedSettings;
  batch['_meta/initialized'] = true;

  await update(ref(db), batch);
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function objToArray<T>(val: unknown): T[] {
  if (!val || typeof val !== 'object') return [];
  return Object.values(val) as T[];
}

// ─── Pets ─────────────────────────────────────────────────────────────────────

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const petsRef = ref(db, 'pets');
    const unsub = onValue(petsRef, snap => {
      setPets(objToArray<Pet>(snap.val()));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addPet = async (pet: Omit<Pet, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    const newPet: Pet = { ...pet, id: `pet-${Date.now()}`, created_at: now, updated_at: now };
    await set(ref(db, `pets/${newPet.id}`), newPet);
    return newPet;
  };

  const updatePet = async (id: string, data: Partial<Pet>) => {
    await update(ref(db, `pets/${id}`), { ...data, updated_at: new Date().toISOString() });
  };

  const deletePet = async (id: string) => {
    await remove(ref(db, `pets/${id}`));
  };

  return { pets, loading, addPet, updatePet, deletePet };
}

// ─── Categories ───────────────────────────────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const catRef = ref(db, 'categories');
    const unsub = onValue(catRef, snap => {
      setCategories(objToArray<Category>(snap.val()));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addCategory = async (name: string, emoji: string) => {
    const cat: Category = { id: `cat-${Date.now()}`, name, emoji };
    await set(ref(db, `categories/${cat.id}`), cat);
  };

  const updateCategory = async (id: string, name: string, emoji: string) => {
    await update(ref(db, `categories/${id}`), { name, emoji });
  };

  /** Deletes a category and clears category_id on all pets that referenced it. */
  const deleteCategory = async (id: string) => {
    await remove(ref(db, `categories/${id}`));

    // Unassign pets that belonged to this category
    const petsSnap = await get(ref(db, 'pets'));
    const pets = objToArray<Pet>(petsSnap.val());
    const updates: Record<string, unknown> = {};
    pets.forEach(p => {
      if (p.category_id === id) {
        updates[`pets/${p.id}/category_id`] = '';
      }
    });
    if (Object.keys(updates).length) await update(ref(db), updates);
  };

  /** Returns how many pets are assigned to a category. */
  const getPetCount = async (categoryId: string): Promise<number> => {
    const snap = await get(ref(db, 'pets'));
    return objToArray<Pet>(snap.val()).filter(p => p.category_id === categoryId).length;
  };

  return { categories, loading, addCategory, updateCategory, deleteCategory, getPetCount };
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export function useCarousel() {
  const [carousel, setCarousel] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carRef = ref(db, 'carousel');
    const unsub = onValue(carRef, snap => {
      const arr = objToArray<CarouselImage>(snap.val());
      setCarousel([...arr].sort((a, b) => a.display_order - b.display_order));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addImage = async (image: Omit<CarouselImage, 'id' | 'display_order'>) => {
    const maxOrder = carousel.reduce((m, c) => Math.max(m, c.display_order), 0);
    const item: CarouselImage = { ...image, id: `car-${Date.now()}`, display_order: maxOrder + 1 };
    await set(ref(db, `carousel/${item.id}`), item);
  };

  const updateImage = async (id: string, data: Partial<CarouselImage>) => {
    await update(ref(db, `carousel/${id}`), data);
  };

  const deleteImage = async (id: string) => {
    await remove(ref(db, `carousel/${id}`));
  };

  const reorder = async (items: CarouselImage[]) => {
    const updates: Record<string, unknown> = {};
    items.forEach((item, idx) => {
      updates[`carousel/${item.id}`] = { ...item, display_order: idx + 1 };
    });
    await update(ref(db), updates);
  };

  return { carousel, loading, addImage, updateImage, deleteImage, reorder };
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(seedSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settRef = ref(db, 'settings');
    const unsub = onValue(settRef, snap => {
      const val = snap.val();
      if (val) setSettings(val as SiteSettings);
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateSettings = async (data: Partial<SiteSettings>) => {
    await update(ref(db, 'settings'), data);
  };

  return { settings, loading, updateSettings };
}

// ─── Live settings (alias — kept for backwards compat) ────────────────────────

export function useSettingsLive(): SiteSettings {
  const { settings } = useSettings();
  return settings;
}
