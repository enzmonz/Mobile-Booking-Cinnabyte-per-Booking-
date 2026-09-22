import { Service } from '@/types';

export const mockServices: Service[] = [
  {
    id: 's1',
    categoryId: 'hair',
    eyebrow: 'HAIR CARE',
    name: 'Professional Haircut',
    description:
      'A professional haircut from an experienced stylist. Includes a wash and blow-dry finish.',
    price: 500,
    duration: '1 hour',
    provider: 'Sample Salon',
    location: 'Makati City',
    icon: 'cut-outline',
    rating: 4.8,
    popular: true,
    featured: true,
  },
  {
    id: 's2',
    categoryId: 'hair',
    eyebrow: 'HAIR CARE',
    name: 'Hair Coloring',
    description:
      'Full hair coloring service using premium, gentle products for vibrant, long-lasting color.',
    price: 1800,
    duration: '2 hours 30 mins',
    provider: 'Sample Salon',
    location: 'Makati City',
    icon: 'color-palette-outline',
    rating: 4.7,
    popular: true,
    featured: true,
  },
  {
    id: 's3',
    categoryId: 'beauty',
    eyebrow: 'WELLNESS',
    name: 'Relaxation Massage',
    description:
      'A relaxing full-body massage designed to relieve tension and melt away stress.',
    price: 900,
    duration: '1 hour 30 mins',
    provider: 'Serenity Spa',
    location: 'Bonifacio Global City',
    icon: 'body-outline',
    rating: 4.9,
    popular: true,
    featured: false,
  },
  {
    id: 's4',
    categoryId: 'beauty',
    eyebrow: 'SKINCARE',
    name: 'Deep Cleansing Facial',
    description:
      'Deep-cleansing facial treatment that leaves your skin refreshed, hydrated, and glowing.',
    price: 700,
    duration: '45 mins',
    provider: 'Serenity Spa',
    location: 'Bonifacio Global City',
    icon: 'flower-outline',
    rating: 4.6,
    popular: false,
    featured: true,
  },
  {
    id: 's5',
    categoryId: 'beauty',
    eyebrow: 'NAIL CARE',
    name: 'Classic Manicure',
    description:
      'Classic manicure with nail shaping, cuticle care, and polish of your choice.',
    price: 350,
    duration: '45 mins',
    provider: 'Nail Bar Studio',
    location: 'Quezon City',
    icon: 'hand-left-outline',
    rating: 4.5,
    popular: true,
    featured: false,
  },
  {
    id: 's6',
    categoryId: 'fitness',
    eyebrow: 'FITNESS',
    name: 'Personal Training',
    description:
      'One-on-one training session with a certified coach, tailored to your fitness goals.',
    price: 1200,
    duration: '1 hour',
    provider: 'PeakForm Gym',
    location: 'Pasig City',
    icon: 'barbell-outline',
    rating: 4.9,
    popular: false,
    featured: true,
  },
  {
    id: 's7',
    categoryId: 'health',
    eyebrow: 'HEALTH',
    name: 'General Checkup',
    description:
      'A routine health checkup with a licensed physician, including basic vitals screening.',
    price: 800,
    duration: '30 mins',
    provider: 'Wellness Clinic',
    location: 'Mandaluyong City',
    icon: 'pulse-outline',
    rating: 4.8,
    popular: false,
    featured: false,
  },
  {
    id: 's8',
    categoryId: 'fitness',
    eyebrow: 'WELLNESS',
    name: 'Yoga Session',
    description:
      'A calming group yoga session suitable for all levels, focused on flexibility and breathing.',
    price: 450,
    duration: '1 hour',
    provider: 'PeakForm Gym',
    location: 'Pasig City',
    icon: 'leaf-outline',
    rating: 4.7,
    popular: true,
    featured: false,
  },
];

export function getServiceById(id: string): Service | undefined {
  return mockServices.find((service) => service.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return mockServices.filter((service) => service.categoryId === categoryId);
}

export function getFeaturedServices(): Service[] {
  return mockServices.filter((service) => service.featured);
}

export function getPopularServices(): Service[] {
  return mockServices.filter((service) => service.popular);
}

export function searchServices(query: string): Service[] {
  const q = query.trim().toLowerCase();
  if (!q) return mockServices;
  return mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.provider.toLowerCase().includes(q)
  );
}
