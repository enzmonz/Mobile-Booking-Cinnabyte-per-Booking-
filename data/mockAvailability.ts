import { DateOption, TimeSlot } from '@/types';

// In a real app this would come from `GET /api/availability/:providerId`.
// For now we generate the next 7 days and a fixed list of time slots,
// then mark some slots unavailable based on the date so it feels realistic.

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ALL_TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getAvailableDates(daysAhead = 7): DateOption[] {
  const dates: DateOption[] = [];
  const today = new Date();

  // Start from tomorrow, since same-day booking isn't offered in this mock.
  for (let i = 1; i <= daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push({
      isoDate: toIsoDate(date),
      label: `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`,
      weekday: WEEKDAY_NAMES[date.getDay()],
    });
  }

  return dates;
}

// Deterministic pseudo-randomness so the same date always shows the same
// availability, without needing a backend.
function isSlotUnavailable(isoDate: string, time: string): boolean {
  const seed = `${isoDate}-${time}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100;
  }
  return hash < 30; // roughly 30% of slots are unavailable
}

export function getAvailableTimeSlots(isoDate: string): TimeSlot[] {
  return ALL_TIME_SLOTS.map((time) => ({
    time,
    available: !isSlotUnavailable(isoDate, time),
  }));
}

export function formatIsoDateLong(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
