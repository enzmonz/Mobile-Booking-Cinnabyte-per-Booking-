import { Booking } from '@/types';

// Starting set of bookings, so the "My Bookings" screen isn't empty on
// first launch. New bookings created during the booking flow are added
// on top of this list by the BookingsProvider (see context/BookingsContext.tsx).
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    serviceId: 's1',
    serviceName: 'Haircut',
    serviceIcon: '💇',
    serviceColor: '#DBEAFE',
    provider: 'Sample Salon',
    location: 'Makati City',
    price: 500,
    duration: '1 hour',
    date: '2026-09-30',
    time: '2:00 PM',
    status: 'upcoming',
  },
  {
    id: 'b2',
    serviceId: 's3',
    serviceName: 'Massage',
    serviceIcon: '💆',
    serviceColor: '#DCFCE7',
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
    serviceName: 'Manicure',
    serviceIcon: '💅',
    serviceColor: '#FCE7F3',
    provider: 'Nail Bar Studio',
    location: 'Quezon City',
    price: 350,
    duration: '45 mins',
    date: '2026-09-05',
    time: '10:00 AM',
    status: 'cancelled',
  },
];
