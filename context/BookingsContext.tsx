import React, { createContext, useContext, useMemo, useState } from 'react';

import { mockBookings } from '@/data/mockBookings';
import { Booking, BookingStatus, Service } from '@/types';

interface NewBookingInput {
  service: Service;
  isoDate: string;
  time: string;
}

interface BookingsContextValue {
  bookings: Booking[];
  getBookingById: (id: string) => Booking | undefined;
  addBooking: (input: NewBookingInput) => Booking;
  cancelBooking: (id: string) => void;
}

const BookingsContext = createContext<BookingsContextValue | undefined>(
  undefined
);

// Everything in this provider stands in for the future backend:
// - initial state -> GET /api/bookings
// - addBooking -> POST /api/bookings
// - cancelBooking -> PUT /api/bookings/:id (status: 'cancelled')
export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const getBookingById = (id: string) =>
    bookings.find((booking) => booking.id === id);

  const addBooking = ({ service, isoDate, time }: NewBookingInput): Booking => {
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      serviceIcon: service.icon,
      serviceColor: service.color,
      provider: service.provider,
      location: service.location,
      price: service.price,
      duration: service.duration,
      date: isoDate,
      time,
      status: 'upcoming' as BookingStatus,
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  const value = useMemo(
    () => ({ bookings, getBookingById, addBooking, cancelBooking }),
    [bookings]
  );

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings(): BookingsContextValue {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
}
