import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import StatusBadge from '@/components/StatusBadge';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
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
        <Header title="Booking" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Booking not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCancel = () => {
    Alert.alert(
      'Cancel booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, cancel',
          style: 'destructive',
          onPress: () => cancelBooking(booking.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Header title="Booking details" />

      <ScrollView contentContainerStyle={styles.content}>
        <StatusBadge status={booking.status} />

        <Text style={styles.serviceName}>{booking.serviceName}</Text>

        <DetailField
          label="Date & time"
          value={`${formatIsoDateLong(booking.date)} · ${booking.time}`}
        />
        <DetailField label="Provider" value={booking.provider} />
        <DetailField label="Location" value={booking.location} />
        <DetailField label="Duration" value={booking.duration} />

        <View style={styles.divider} />

        <DetailField label="Booking ID" value={booking.id} />
        <DetailField label="Total" value={`₱${booking.price}`} />
      </ScrollView>

      {booking.status === 'upcoming' && (
        <View style={styles.footer}>
          <CustomButton
            title="Cancel booking"
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
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
  },
  serviceName: {
    ...Typography.sectionHeading,
    fontSize: 24,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  field: {
    marginBottom: Spacing.xl,
  },
  fieldLabel: {
    ...Typography.eyebrow,
    color: Colors.textMuted,
  },
  fieldValue: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.text,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  footer: {
    padding: ScreenPadding,
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
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
