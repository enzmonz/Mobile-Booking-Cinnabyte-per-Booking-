// Shared TypeScript types used across the app.
// Keeping them in one place makes it easy to see the "shape" of our data,
// and this is the same shape we'll eventually get back from the REST API.

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji used as a simple icon
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  duration: string; // human readable, e.g. "1 hour"
  provider: string;
  location: string;
  icon: string; // emoji used as an image placeholder
  color: string; // background color for the image placeholder
  rating: number;
  popular: boolean;
  featured: boolean;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  serviceColor: string;
  provider: string;
  location: string;
  price: number;
  duration: string;
  date: string; // ISO date string, e.g. "2026-09-25"
  time: string; // e.g. "2:00 PM"
  status: BookingStatus;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DateOption {
  isoDate: string; // "2026-09-25"
  label: string; // "September 25"
  weekday: string; // "Fri"
}
