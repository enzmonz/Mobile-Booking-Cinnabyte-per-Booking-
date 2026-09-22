import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { getBookingById } = useBookings();
  const booking = getBookingById(bookingId);

  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.checkCircle,
            { opacity, transform: [{ scale }] },
          ]}
        >
          <Ionicons name="checkmark" size={30} color={Colors.accentDark} />
        </Animated.View>

        <Text style={styles.title}>Booking confirmed</Text>
        <Text style={styles.subtitle}>Your appointment is scheduled.</Text>

        {booking && (
          <View style={styles.summary}>
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
            <Text style={styles.detail}>{formatIsoDateLong(booking.date)}</Text>
            <Text style={styles.detail}>{booking.time}</Text>
            <Text style={styles.price}>₱{booking.price}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="View booking"
          onPress={() =>
            router.replace(bookingId ? `/booking/${bookingId}` : '/(tabs)/bookings')
          }
        />
        <CustomButton
          title="Back to home"
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
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 24,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  summary: {
    alignItems: 'center',
    marginTop: Spacing.xxxl,
    paddingTop: Spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    width: '100%',
  },
  serviceName: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    color: Colors.text,
  },
  detail: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  price: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  footer: {
    padding: 20,
  },
  secondButton: {
    marginTop: Spacing.md,
  },
});
