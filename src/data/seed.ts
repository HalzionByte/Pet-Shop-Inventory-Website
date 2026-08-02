import type { Category, Pet, CarouselImage, SiteSettings } from '../types';

export const seedCategories: Category[] = [
  { id: 'cat-1', name: 'Dogs', emoji: '🐶' },
  { id: 'cat-2', name: 'Cats', emoji: '🐱' },
  { id: 'cat-3', name: 'Birds', emoji: '🐦' },
  { id: 'cat-4', name: 'Fish', emoji: '🐠' },
  { id: 'cat-5', name: 'Rabbits', emoji: '🐰' },
  { id: 'cat-6', name: 'Reptiles', emoji: '🦎' },
  { id: 'cat-7', name: 'Hamsters', emoji: '🐹' },
  { id: 'cat-8', name: 'Parrots', emoji: '🦜' },
];

export const seedPets: Pet[] = [
  {
    id: 'pet-1', name: 'Biscuit', species: 'Dog', breed: 'Golden Retriever',
    vaccinated: true, availability: 'available', featured: true,
    description: 'Biscuit is a gentle, playful Golden Retriever who loves fetch and cuddles. He is great with kids and other pets.',
    category_id: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-15T10:00:00Z', updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'pet-2', name: 'Mochi', species: 'Cat', breed: 'Scottish Fold',
    vaccinated: true, availability: 'available', featured: true,
    description: 'Mochi is an incredibly adorable Scottish Fold with the most expressive eyes. She loves lap time and gentle play.',
    category_id: 'cat-2',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-16T10:00:00Z', updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'pet-3', name: 'Pepper', species: 'Dog', breed: 'French Bulldog',
    vaccinated: true, availability: 'reserved', featured: true,
    description: 'Pepper is a charming French Bulldog with a big personality. She is playful, affectionate, and adapts well to apartment living.',
    category_id: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-17T10:00:00Z', updated_at: '2024-01-17T10:00:00Z',
  },
  {
    id: 'pet-4', name: 'Kiwi', species: 'Bird', breed: 'Budgerigar',
    vaccinated: false, availability: 'available', featured: true,
    description: 'Kiwi is a vibrant green budgie who already knows a few words and loves to whistle along to music.',
    category_id: 'cat-3',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-18T10:00:00Z', updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 'pet-5', name: 'Nemo', species: 'Fish', breed: 'Clownfish',
    vaccinated: false, availability: 'available', featured: true,
    description: 'A beautiful clownfish with brilliant orange and white stripes. Perfect for a saltwater aquarium.',
    category_id: 'cat-4',
    images: [
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-19T10:00:00Z', updated_at: '2024-01-19T10:00:00Z',
  },
  {
    id: 'pet-6', name: 'Cotton', species: 'Rabbit', breed: 'Holland Lop',
    vaccinated: true, availability: 'available', featured: true,
    description: 'Cotton is a fluffy Holland Lop with floppy ears and the softest fur. She loves fresh veggies and gentle petting.',
    category_id: 'cat-5',
    images: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-20T10:00:00Z', updated_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'pet-7', name: 'Duke', species: 'Dog', breed: 'Labrador Retriever',
    vaccinated: true, availability: 'available', featured: false,
    description: 'Duke is a loyal, energetic Labrador who loves swimming, playing fetch, and making new friends wherever he goes.',
    category_id: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1534361960057-19f4434c7f8c?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-21T10:00:00Z', updated_at: '2024-01-21T10:00:00Z',
  },
  {
    id: 'pet-8', name: 'Luna', species: 'Cat', breed: 'Maine Coon',
    vaccinated: true, availability: 'available', featured: false,
    description: 'Luna is a majestic Maine Coon with a magnificent fluffy tail and a sweet, gentle personality. She gets along with everyone.',
    category_id: 'cat-2',
    images: [
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-22T10:00:00Z', updated_at: '2024-01-22T10:00:00Z',
  },
  {
    id: 'pet-9', name: 'Gizmo', species: 'Hamster', breed: 'Syrian Hamster',
    vaccinated: false, availability: 'available', featured: false,
    description: 'Gizmo is a tiny, curious Syrian hamster who loves his wheel, burrowing in bedding, and exploring his habitat.',
    category_id: 'cat-7',
    images: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-23T10:00:00Z', updated_at: '2024-01-23T10:00:00Z',
  },
  {
    id: 'pet-10', name: 'Rio', species: 'Bird', breed: 'African Grey Parrot',
    vaccinated: false, availability: 'available', featured: false,
    description: 'Rio is an intelligent African Grey who has already mastered several words and phrases. He loves music and interaction.',
    category_id: 'cat-8',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-24T10:00:00Z', updated_at: '2024-01-24T10:00:00Z',
  },
  {
    id: 'pet-11', name: 'Spike', species: 'Reptile', breed: 'Bearded Dragon',
    vaccinated: false, availability: 'available', featured: false,
    description: 'Spike is a friendly bearded dragon who enjoys basking under his heat lamp and being handled. Great for first-time reptile owners.',
    category_id: 'cat-6',
    images: [
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-25T10:00:00Z', updated_at: '2024-01-25T10:00:00Z',
  },
  {
    id: 'pet-12', name: 'Bella', species: 'Dog', breed: 'Poodle',
    vaccinated: true, availability: 'sold', featured: false,
    description: 'Bella is an elegant Toy Poodle with a hypoallergenic coat and a bright, trainable mind. She learns tricks quickly.',
    category_id: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1516598540642-e8f40a09d939?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-26T10:00:00Z', updated_at: '2024-01-26T10:00:00Z',
  },
  {
    id: 'pet-13', name: 'Pearl', species: 'Fish', breed: 'Betta Fish',
    vaccinated: false, availability: 'available', featured: false,
    description: 'Pearl is a stunning betta fish with flowing fins in shades of blue and purple. Perfect for a desktop aquarium.',
    category_id: 'cat-4',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-27T10:00:00Z', updated_at: '2024-01-27T10:00:00Z',
  },
  {
    id: 'pet-14', name: 'Caramel', species: 'Cat', breed: 'Ragdoll',
    vaccinated: true, availability: 'reserved', featured: false,
    description: 'Caramel is a gorgeous Ragdoll kitten with striking blue eyes and a calm, docile temperament. She goes limp when held.',
    category_id: 'cat-2',
    images: [
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-28T10:00:00Z', updated_at: '2024-01-28T10:00:00Z',
  },
  {
    id: 'pet-15', name: 'Peanut', species: 'Rabbit', breed: 'Mini Rex',
    vaccinated: false, availability: 'available', featured: false,
    description: 'Peanut is a velvet-soft Mini Rex rabbit with a compact, round body and the most plush fur you have ever touched.',
    category_id: 'cat-5',
    images: [
      'https://images.unsplash.com/photo-1618385455730-2571c38966b7?w=800&h=800&fit=crop&auto=format',
    ],
    created_at: '2024-01-29T10:00:00Z', updated_at: '2024-01-29T10:00:00Z',
  },
];

export const seedCarousel: CarouselImage[] = [
  {
    id: 'car-1',
    image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&h=700&fit=crop&auto=format',
    title: 'Find Your Perfect Companion',
    subtitle: 'Meet our adorable pets waiting for their forever homes',
    enabled: true, display_order: 1,
  },
  {
    id: 'car-2',
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&h=700&fit=crop&auto=format',
    title: 'Every Pet Deserves Love',
    subtitle: 'Browse our carefully raised, healthy, and happy animals',
    enabled: true, display_order: 2,
  },
  {
    id: 'car-3',
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1400&h=700&fit=crop&auto=format',
    title: 'Cats & Kittens Galore',
    subtitle: 'From fluffy Persians to sleek Siamese — find your match',
    enabled: true, display_order: 3,
  },
  {
    id: 'car-4',
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&h=700&fit=crop&auto=format',
    title: 'Puppies Ready for Home',
    subtitle: 'Vaccinated, playful, and full of love',
    enabled: true, display_order: 4,
  },
  {
    id: 'car-5',
    image_url: 'https://images.unsplash.com/photo-1520366498724-709889c0c685?w=1400&h=700&fit=crop&auto=format',
    title: 'Exotic Birds & More',
    subtitle: 'Discover our colourful feathered friends',
    enabled: true, display_order: 5,
  },
  {
    id: 'car-6',
    image_url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=1400&h=700&fit=crop&auto=format',
    title: 'Come Visit Us Today',
    subtitle: 'Our friendly team is here to help you find your new best friend',
    enabled: true, display_order: 6,
  },
];

export const seedSettings: SiteSettings = {
  shop_name: 'Pisind Pet Store',
  logo: '',
  address: '123 Blossom Lane, Maplewood, CA 90210',
  business_hours: 'Mon–Sat: 9am–7pm | Sun: 10am–5pm',
  whatsapp: '+15551234567',
  instagram: 'https://instagram.com/pisindpetstore',
  facebook: 'https://facebook.com/pisindpetstore',
  footer_text: '© 2024 Pisind Pet Store. "Your Satisfaction is Our Priority"',
};
