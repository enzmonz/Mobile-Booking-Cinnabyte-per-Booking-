# Mobile Booking App

A mobile booking application built with React Native, TypeScript, and Expo Router. Customers can browse services, pick a date and time, confirm a booking, and manage their bookings — all backed by local mock data for now.

## Tech Stack

- React Native + Expo (SDK 57)
- TypeScript
- Expo Router (file-based navigation)
- React Native `StyleSheet` for styling
- Mock data only — no backend, no database, no REST API yet

## Getting Started

```bash
npm install
npm start        # opens Expo Dev Tools — scan the QR code with Expo Go
npm run ios       # requires macOS + Xcode
npm run android   # requires Android Studio / emulator
npm run web       # runs in the browser
```

## Project Structure

```
app/
  (tabs)/          Bottom tab screens: Home, Services, Bookings, Profile
  service/[id]     Service details screen
  booking/         Booking flow: date → time → confirmation → success, plus booking details
  _layout.tsx       Root stack layout

components/         Reusable UI pieces (ServiceCard, BookingCard, TimeSlot, etc.)
context/             BookingsContext — in-memory "database" of bookings for this session
data/                Mock data + a thin api.ts layer shaped like future REST endpoints
types/               Shared TypeScript interfaces
constants/colors.ts  App-wide color palette
```

## Booking Flow

```
Home / Services → Service Details → Select Date → Select Time
  → Confirmation → Success → Booking Details
```

Selected service, date, and time are passed between screens as route params. Created and cancelled bookings live in `context/BookingsContext.tsx`, shared across the "My Bookings" and "Booking Details" screens for the duration of the app session (nothing persists after a reload, since there's no backend yet).

## Future Backend

Every function in `data/api.ts` maps to a planned REST endpoint (e.g. `fetchServices()` → `GET /api/services`). When the backend exists, only that file needs to change — screens won't need to be touched.
