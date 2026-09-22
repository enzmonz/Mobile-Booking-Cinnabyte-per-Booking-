import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';
import { BookingStatus } from '@/types';

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; fg: string; bg: string }
> = {
  upcoming: { label: 'Confirmed', fg: Colors.accentDark, bg: Colors.surfaceMuted },
  completed: { label: 'Completed', fg: Colors.success, bg: Colors.successBg },
  cancelled: { label: 'Cancelled', fg: Colors.error, bg: Colors.errorBg },
};

interface StatusBadgeProps {
  status: BookingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.fg }]} />
      <Text style={[styles.label, { color: config.fg }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  label: {
    ...Typography.metadata,
    fontSize: 11,
    textTransform: 'uppercase',
  },
});
