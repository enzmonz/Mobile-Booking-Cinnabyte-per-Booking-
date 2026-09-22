// This file is the single place that screens talk to for data.
//
// Right now every function just reads from our mock data files, but the
// function names and shapes match the REST endpoints we plan to build later
// (see comments next to each function). When the backend exists, we can
// swap the body of these functions for real `fetch` calls without having
// to change any screen code.

import { mockCategories } from '@/data/mockCategories';
import {
  getFeaturedServices,
  getPopularServices,
  getServiceById,
  getServicesByCategory,
  mockServices,
  searchServices,
} from '@/data/mockServices';
import {
  CalendarMonth,
  formatIsoDateLong,
  formatIsoDateShort,
  formatRelativeDay,
  getAvailableDates,
  getAvailableTimeSlots,
  getCalendarMonth,
} from '@/data/mockAvailability';
import { Category, DateOption, Service, TimeSlot } from '@/types';

// GET /api/services
export function fetchServices(): Service[] {
  return mockServices;
}

// GET /api/services?featured=true
export function fetchFeaturedServices(): Service[] {
  return getFeaturedServices();
}

// GET /api/services?popular=true
export function fetchPopularServices(): Service[] {
  return getPopularServices();
}

// GET /api/services?category=:categoryId
export function fetchServicesByCategory(categoryId: string): Service[] {
  return getServicesByCategory(categoryId);
}

// GET /api/services?search=:query
export function fetchServicesBySearch(query: string): Service[] {
  return searchServices(query);
}

// GET /api/services/:id
export function fetchServiceById(id: string): Service | undefined {
  return getServiceById(id);
}

// GET /api/categories
export function fetchCategories(): Category[] {
  return mockCategories;
}

// GET /api/availability/:providerId (dates)
export function fetchAvailableDates(): DateOption[] {
  return getAvailableDates();
}

// GET /api/availability/:providerId?date=:date (time slots)
export function fetchAvailableTimeSlots(isoDate: string): TimeSlot[] {
  return getAvailableTimeSlots(isoDate);
}

export function fetchCalendarMonth(isoDate: string): CalendarMonth {
  return getCalendarMonth(isoDate);
}

export { formatIsoDateLong, formatIsoDateShort, formatRelativeDay };
