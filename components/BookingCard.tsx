import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/colors';
import { formatIsoDateLong } from '@/data/api';
import { Booking } from '@/types';

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

const STATUS_STYLES: Record<
  Booking['status'],
  { label: string; bg: string; color: string }
> = {
  upcoming: { label: 'Confirmed', bg: Colors.primaryLight, color: Colors.primary },
  completed: { label: 'Completed', bg: Colors.successLight, color: Colors.success },
  cancelled: { label: 'Cancelled', bg: Colors.errorLight, color: Colors.error },
};

export default function BookingCard({ booking, onPress }: BookingCardProps) {
  const status = STATUS_STYLES[booking.status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.image, { backgroundColor: booking.serviceColor }]}>
        <Text style={styles.icon}>{booking.serviceIcon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{booking.serviceName}</Text>
        <Text style={styles.detail}>{formatIsoDateLong(booking.date)}</Text>
        <Text style={styles.detail}>{booking.time}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.price}>₱{booking.price}</Text>
          <View style={[styles.badge, { backgroundColor: status.bg }]}>
            <Text style={[styles.badgeText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
    shadowColor: Colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  detail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
