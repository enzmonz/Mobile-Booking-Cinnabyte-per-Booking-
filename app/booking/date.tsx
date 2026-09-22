import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { fetchAvailableDates, fetchServiceById } from '@/data/api';

export default function SelectDateScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const service = fetchServiceById(serviceId);
  const dates = useMemo(() => fetchAvailableDates(), []);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Choose a date</Text>
        {service && (
          <Text style={styles.subtitle}>for {service.name}</Text>
        )}

        <View style={styles.dateList}>
          {dates.map((date) => {
            const selected = selectedDate === date.isoDate;
            return (
              <TouchableOpacity
                key={date.isoDate}
                style={[styles.dateRow, selected && styles.dateRowSelected]}
                onPress={() => setSelectedDate(date.isoDate)}
                activeOpacity={0.8}
              >
                <View>
                  <Text
                    style={[styles.dateLabel, selected && styles.dateLabelSelected]}
                  >
                    {date.label}
                  </Text>
                  <Text
                    style={[
                      styles.dateWeekday,
                      selected && styles.dateWeekdaySelected,
                    ]}
                  >
                    {date.weekday}
                  </Text>
                </View>
                <View
                  style={[styles.radio, selected && styles.radioSelected]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          disabled={!selectedDate}
          onPress={() =>
            router.push({
              pathname: '/booking/time',
              params: { serviceId, date: selectedDate ?? '' },
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
  dateList: {
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 16,
  },
  dateRowSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  dateLabelSelected: {
    color: Colors.primary,
  },
  dateWeekday: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  dateWeekdaySelected: {
    color: Colors.primary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  radioSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});
