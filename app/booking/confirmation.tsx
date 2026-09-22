import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import ProgressSteps from '@/components/ProgressSteps';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { fetchServiceById, formatIsoDateLong } from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
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
        <Header title="Confirm" />
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
      <Header title="Confirm" />
      <ProgressSteps currentStep={3} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Review booking</Text>

        <DetailField label="Service" value={service.name} />
        <DetailField label="Provider" value={service.provider} />
        <DetailField label="Date" value={formatIsoDateLong(date)} />
        <DetailField label="Time" value={time} />
        <DetailField label="Duration" value={service.duration} />

        <View style={styles.divider} />

        <Text style={styles.fieldLabel}>Total</Text>
        <Text style={styles.total}>₱{service.price}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Confirm booking"
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
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 24,
    color: Colors.text,
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
    fontSize: 17,
    color: Colors.text,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  total: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.text,
    marginTop: 4,
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
