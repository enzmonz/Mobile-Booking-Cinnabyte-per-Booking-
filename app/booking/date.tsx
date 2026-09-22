import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import ProgressSteps from '@/components/ProgressSteps';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { fetchAvailableDates, fetchCalendarMonth, fetchServiceById } from '@/data/api';

export default function SelectDateScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const service = fetchServiceById(serviceId);
  const { width } = useWindowDimensions();

  const availableDates = useMemo(() => fetchAvailableDates(), []);
  const availableSet = useMemo(
    () => new Set(availableDates.map((d) => d.isoDate)),
    [availableDates]
  );
  const calendar = useMemo(
    () => fetchCalendarMonth(availableDates[0]?.isoDate ?? ''),
    [availableDates]
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const cellSize = Math.min(
    48,
    Math.floor((width - ScreenPadding * 2 - Spacing.sm * 6) / 7)
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Header title="Choose a date" />
      <ProgressSteps currentStep={1} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Choose a date</Text>
        {service && <Text style={styles.subtitle}>for {service.name}</Text>}

        <Text style={styles.monthLabel}>{calendar.label}</Text>

        <View style={styles.weekdayRow}>
          {calendar.weekdayHeaders.map((label, index) => (
            <View key={`${label}-${index}`} style={{ width: cellSize }}>
              <Text style={styles.weekdayText}>{label}</Text>
            </View>
          ))}
        </View>

        {calendar.weeks.map((week, weekIndex) => (
          <View style={styles.weekRow} key={weekIndex}>
            {week.map((cell, cellIndex) => {
              if (!cell) {
                return <View key={cellIndex} style={{ width: cellSize }} />;
              }

              const isAvailable = availableSet.has(cell.isoDate);
              const isSelected = selectedDate === cell.isoDate;

              return (
                <Pressable
                  key={cell.isoDate}
                  disabled={!isAvailable}
                  onPress={() => setSelectedDate(cell.isoDate)}
                  style={({ pressed }) => [
                    styles.dayCell,
                    { width: cellSize, height: cellSize },
                    isSelected && styles.dayCellSelected,
                    pressed && isAvailable && styles.dayCellPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !isAvailable && styles.dayTextDisabled,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {cell.day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
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
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.xl,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 24,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: Spacing.xxl,
  },
  monthLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  weekdayText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  dayCell: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: Colors.accent,
  },
  dayCellPressed: {
    backgroundColor: Colors.surfaceMuted,
  },
  dayText: {
    fontFamily: FontFamily.medium,
    fontSize: 14.5,
    color: Colors.text,
  },
  dayTextDisabled: {
    color: Colors.textMuted,
    opacity: 0.4,
  },
  dayTextSelected: {
    fontFamily: FontFamily.semibold,
    color: Colors.onAccent,
  },
  footer: {
    padding: ScreenPadding,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});
