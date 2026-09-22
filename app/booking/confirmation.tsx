import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { fetchServiceById, formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ConfirmationScreen() {
  const { serviceId, date, time } = useLocalSearchParams<{
    serviceId: string;
    date: string;
    time: string;
  }>();
  const service = fetchServiceById(serviceId);
  const { addBooking } = useBookings();
  const [submitting, setSubmitting] = useState(false);

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Service not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleConfirm = () => {
    setSubmitting(true);
    const booking = addBooking({ service, isoDate: date, time });
    router.replace({
      pathname: '/booking/success',
      params: { bookingId: booking.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Confirm Booking</Text>

        <View style={styles.card}>
          <SummaryRow label="Service" value={service.name} />
          <SummaryRow label="Provider" value={service.provider} />
          <SummaryRow label="Date" value={formatIsoDateLong(date)} />
          <SummaryRow label="Time" value={time} />
          <SummaryRow label="Duration" value={service.duration} />
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Price</Text>
            <Text style={styles.price}>₱{service.price}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Confirm Booking"
          loading={submitting}
          onPress={handleConfirm}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
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
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
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
