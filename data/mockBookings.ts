import { Booking } from '@/types';

// Starting set of bookings, so "My Bookings" and the Home screen's
// upcoming-appointment card aren't empty on first launch. New bookings
// created during the booking flow are added on top of this list by the
// BookingsProvider (see context/BookingsContext.tsx).
function tomorrowIsoDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    serviceId: 's1',
    serviceName: 'Professional Haircut',
    serviceIcon: 'cut-outline',
    provider: 'Sample Salon',
    location: 'Makati City',
    price: 500,
    duration: '1 hour',
    date: tomorrowIsoDate(),
    time: '2:00 PM',
    status: 'upcoming',
  },
  {
    id: 'b2',
    serviceId: 's3',
    serviceName: 'Relaxation Massage',
    serviceIcon: 'body-outline',
    provider: 'Serenity Spa',
    location: 'Bonifacio Global City',
    price: 900,
    duration: '1 hour 30 mins',
    date: '2026-09-10',
    time: '11:00 AM',
    status: 'completed',
  },
  {
    id: 'b3',
    serviceId: 's5',
    serviceName: 'Classic Manicure',
    serviceIcon: 'hand-left-outline',
    provider: 'Nail Bar Studio',
    location: 'Quezon City',
    price: 350,
    duration: '45 mins',
    date: '2026-09-05',
    time: '10:00 AM',
    status: 'cancelled',
  },
];
