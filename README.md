# Mobile Booking App

A mobile booking application built with React Native, TypeScript, and Expo Router. Customers can browse services, pick a date and time, confirm a booking, and manage their bookings — all backed by local mock data for now.

Visual identity: a CINNABYTE-inspired editorial style — warm off-white background, restrained green accent, Inter typeface, thin borders, and generous whitespace instead of heavy cards/shadows.

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

components/         Reusable UI pieces (ServiceCard, BookingCard, TimeSlot, StatusBadge,
                    ProgressSteps, EmptyState, Skeleton, ErrorState, Header, etc.)
context/             BookingsContext — in-memory "database" of bookings for this session
data/                Mock data + a thin api.ts layer shaped like future REST endpoints
types/               Shared TypeScript interfaces
constants/           Design tokens: colors.ts, spacing.ts, typography.ts, radius.ts
```

## Design System

All visual styling comes from `constants/` — no hardcoded colors or spacing in components/screens:

- `colors.ts` — warm neutral palette (`#F5F4EF` background) with a restrained green accent, used sparingly for primary actions and selected states
- `typography.ts` — Inter font family + a fixed type scale (large heading → metadata)
- `spacing.ts` — an 8-point-based spacing scale plus a shared screen padding constant
- `radius.ts` — restrained corner radii (16px cards, 12px buttons/inputs, pill for badges)

## Booking Flow

```
Home / Services → Service Details → Select Date → Select Time
  → Confirmation → Success → Booking Details
```

Selected service, date, and time are passed between screens as route params. Created and cancelled bookings live in `context/BookingsContext.tsx`, shared across the "My Bookings" and "Booking Details" screens for the duration of the app session (nothing persists after a reload, since there's no backend yet).

## Future Backend

Every function in `data/api.ts` maps to a planned REST endpoint (e.g. `fetchServices()` → `GET /api/services`). When the backend exists, only that file needs to change — screens won't need to be touched.
