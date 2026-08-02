export type Availability = 'available' | 'reserved' | 'sold';

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  vaccinated: boolean;
  availability: Availability;
  featured: boolean;
  description: string;
  category_id: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface CarouselImage {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  display_order: number;
}

export interface SiteSettings {
  shop_name: string;
  logo: string;
  address: string;
  business_hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  footer_text: string;
}
