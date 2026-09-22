import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { getBookingById } = useBookings();
  const booking = getBookingById(bookingId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color={Colors.white} />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your appointment has been successfully booked.
        </Text>

        {booking && (
          <View style={styles.summary}>
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
            <Text style={styles.detail}>{formatIsoDateLong(booking.date)}</Text>
            <Text style={styles.detail}>{booking.time}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="View Booking"
          onPress={() =>
            router.replace(bookingId ? `/booking/${bookingId}` : '/(tabs)/bookings')
          }
        />
        <CustomButton
          title="Back to Home"
          variant="outline"
          onPress={() => router.replace('/(tabs)')}
          style={styles.secondButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  summary: {
    alignItems: 'center',
    marginTop: 28,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 18,
    paddingHorizontal: 28,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  detail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  footer: {
    padding: 20,
  },
  secondButton: {
    marginTop: 12,
  },
});
