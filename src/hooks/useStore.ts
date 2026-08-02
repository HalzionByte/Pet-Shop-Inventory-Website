import { useState, useEffect } from 'react';
import type { Pet, Category, CarouselImage, SiteSettings } from '../types';
import { seedCategories, seedPets, seedCarousel, seedSettings } from '../data/seed';

const KEYS = {
  pets: 'pawsome_pets',
  categories: 'pawsome_categories',
  carousel: 'pawsome_carousel',
  settings: 'pawsome_settings',
  auth: 'pawsome_auth',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      alert(
        '⚠️ Storage limit reached!\n\n' +
        'The image you uploaded is too large to save in browser storage (5 MB limit).\n\n' +
        'Please use a smaller image, or paste an image URL instead.'
      );
    }
    return false;
  }
}

// Initialize seed data on first load
export function initStore() {
  if (!localStorage.getItem(KEYS.pets)) save(KEYS.pets, seedPets);
  if (!localStorage.getItem(KEYS.categories)) save(KEYS.categories, seedCategories);
  if (!localStorage.getItem(KEYS.carousel)) save(KEYS.carousel, seedCarousel);
  if (!localStorage.getItem(KEYS.settings)) save(KEYS.settings, seedSettings);
}

export function usePets() {
  const [pets, setPets] = useState<Pet[]>(() => load(KEYS.pets, seedPets));

  const savePets = (updated: Pet[]) => {
    if (save(KEYS.pets, updated)) {
      setPets(updated);
    }
  };

  const addPet = (pet: Omit<Pet, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    const newPet: Pet = { ...pet, id: `pet-${Date.now()}`, created_at: now, updated_at: now };
    savePets([...pets, newPet]);
    return newPet;
  };

  const updatePet = (id: string, data: Partial<Pet>) => {
    savePets(pets.map(p => p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p));
  };

  const deletePet = (id: string) => savePets(pets.filter(p => p.id !== id));

  return { pets, addPet, updatePet, deletePet };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => load(KEYS.categories, seedCategories));

  const saveCategories = (updated: Category[]) => {
    save(KEYS.categories, updated);
    setCategories(updated);
  };

  const addCategory = (name: string, emoji: string) => {
    const cat: Category = { id: `cat-${Date.now()}`, name, emoji };
    saveCategories([...categories, cat]);
  };

  const updateCategory = (id: string, name: string, emoji: string) => {
    saveCategories(categories.map(c => c.id === id ? { ...c, name, emoji } : c));
  };

  /** Deletes a category and clears category_id on all pets that referenced it. */
  const deleteCategory = (id: string) => {
    // Remove category
    saveCategories(categories.filter(c => c.id !== id));
    // Unassign pets that belonged to this category
    const pets: Pet[] = load(KEYS.pets, []);
    const updated = pets.map(p => p.category_id === id ? { ...p, category_id: '' } : p);
    save(KEYS.pets, updated);
  };

  /** Returns how many pets are assigned to a category (used for delete confirmation). */
  const getPetCount = (categoryId: string): number => {
    const pets: Pet[] = load(KEYS.pets, []);
    return pets.filter(p => p.category_id === categoryId).length;
  };

  return { categories, addCategory, updateCategory, deleteCategory, getPetCount };
}

export function useCarousel() {
  const [carousel, setCarousel] = useState<CarouselImage[]>(() => load(KEYS.carousel, seedCarousel));

  const saveCarousel = (updated: CarouselImage[]) => {
    save(KEYS.carousel, updated);
    setCarousel(updated);
  };

  const addImage = (image: Omit<CarouselImage, 'id' | 'display_order'>) => {
    const maxOrder = carousel.reduce((m, c) => Math.max(m, c.display_order), 0);
    const item: CarouselImage = { ...image, id: `car-${Date.now()}`, display_order: maxOrder + 1 };
    saveCarousel([...carousel, item]);
  };

  const updateImage = (id: string, data: Partial<CarouselImage>) => {
    saveCarousel(carousel.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteImage = (id: string) => saveCarousel(carousel.filter(c => c.id !== id));

  const reorder = (items: CarouselImage[]) => saveCarousel(items);

  return { carousel, addImage, updateImage, deleteImage, reorder };
}

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => load(KEYS.settings, seedSettings));

  const updateSettings = (data: Partial<SiteSettings>) => {
    const updated = { ...settings, ...data };
    save(KEYS.settings, updated);
    setSettings(updated);
  };

  return { settings, updateSettings };
}

// Only SHA-256 hashes are stored — plaintext credentials are never in the bundle.
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem(KEYS.auth));

  const login = async (username: string, password: string): Promise<boolean> => {
    const [uh, ph] = await Promise.all([sha256hex(username), sha256hex(password)]);
    if (uh === _UH && ph === _PH) {
      localStorage.setItem(KEYS.auth, 'pawsome_jwt_token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(KEYS.auth);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}

// Cross-component settings listener
export function useSettingsLive(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(() => load(KEYS.settings, seedSettings));

  useEffect(() => {
    const handler = () => setSettings(load(KEYS.settings, seedSettings));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return settings;
}
