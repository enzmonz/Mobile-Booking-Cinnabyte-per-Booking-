import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';
import StatusBadge from '@/components/StatusBadge';
import { formatIsoDateShort } from '@/data/api';
import { Booking } from '@/types';

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

export default function BookingCard({ booking, onPress }: BookingCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <StatusBadge status={booking.status} />

      <Text style={styles.name}>{booking.serviceName}</Text>
      <Text style={styles.provider}>{booking.provider}</Text>

      <Text style={styles.dateTime}>
        {formatIsoDateShort(booking.date)} · {booking.time}
      </Text>
      <Text style={styles.price}>₱{booking.price}</Text>

      <View style={styles.linkRow}>
        <Text style={styles.link}>View details</Text>
        <Ionicons name="arrow-forward" size={14} color={Colors.accentDark} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 17,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  provider: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  dateTime: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  price: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.text,
    marginTop: 4,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  link: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.accentDark,
  },
});
