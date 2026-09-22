import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import TimeSlot from '@/components/TimeSlot';
import Colors from '@/constants/colors';
import { fetchAvailableTimeSlots, formatIsoDateLong } from '@/data/api';

export default function SelectTimeScreen() {
  const { serviceId, date } = useLocalSearchParams<{
    serviceId: string;
    date: string;
  }>();
  const slots = useMemo(() => fetchAvailableTimeSlots(date), [date]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Available times</Text>
        <Text style={styles.subtitle}>{formatIsoDateLong(date)}</Text>

        <View style={styles.grid}>
          {slots.map((slot) => (
            <TimeSlot
              key={slot.time}
              time={slot.time}
              available={slot.available}
              selected={selectedTime === slot.time}
              onPress={() => setSelectedTime(slot.time)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          disabled={!selectedTime}
          onPress={() =>
            router.push({
              pathname: '/booking/confirmation',
              params: { serviceId, date, time: selectedTime ?? '' },
            })
          }
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
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});
