export interface Guide {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  city: 'medina' | 'mecca';
  photo: string;
  bio: {
    fr: string;
    en: string;
  };
  languages: string[];
  specialties: string[];
  diploma: string;
  experience: number;
  pricePerDay: number;
  currency: string;
  serviceFee: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  availableDates: string[];
}

export interface Review {
  id: string;
  guideId: string;
  author: string;
  rating: number;
  comment: {
    fr: string;
    en: string;
  };
  date: string;
}

export const guides: Guide[] = [];

export const reviews: Review[] = [];

export function getGuidesByCity(city: 'medina' | 'mecca'): Guide[] {
  return guides.filter(g => g.city === city);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

export function getReviewsByGuide(guideId: string): Review[] {
  return reviews.filter(r => r.guideId === guideId);
}

export function getAllLanguages(): string[] {
  const langs = new Set<string>();
  guides.forEach(g => g.languages.forEach(l => langs.add(l)));
  return [...langs].sort();
}

export function getAllSpecialties(): string[] {
  const specs = new Set<string>();
  guides.forEach(g => g.specialties.forEach(s => specs.add(s)));
  return [...specs].sort();
}
