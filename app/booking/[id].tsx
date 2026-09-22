import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';
import { BookingStatus } from '@/types';

const STATUS_LABELS: Record<BookingStatus, string> = {
  upcoming: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  upcoming: Colors.primary,
  completed: Colors.success,
  cancelled: Colors.error,
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getBookingById, cancelBooking } = useBookings();
  const booking = getBookingById(id);

  if (!booking) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Booking not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelBooking(booking.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[styles.image, { backgroundColor: booking.serviceColor }]}
        >
          <Text style={styles.icon}>{booking.serviceIcon}</Text>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.serviceName}>{booking.serviceName}</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: `${STATUS_COLORS[booking.status]}1A` },
            ]}
          >
            <Text
              style={[styles.badgeText, { color: STATUS_COLORS[booking.status] }]}
            >
              {STATUS_LABELS[booking.status]}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <DetailRow label="Provider" value={booking.provider} />
          <DetailRow label="Date" value={formatIsoDateLong(booking.date)} />
          <DetailRow label="Time" value={booking.time} />
          <DetailRow label="Duration" value={booking.duration} />
          <DetailRow label="Location" value={booking.location} />
          <DetailRow label="Price" value={`₱${booking.price}`} />
          <DetailRow label="Booking ID" value={booking.id} />
        </View>
      </ScrollView>

      {booking.status === 'upcoming' && (
        <View style={styles.footer}>
          <CustomButton
            title="Cancel Booking"
            variant="danger"
            onPress={handleCancel}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  image: {
    height: 160,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  icon: {
    fontSize: 56,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    flexShrink: 1,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
