import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import BookingCard from '@/components/BookingCard';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { useBookings } from '@/context/BookingsContext';

type TabKey = 'upcoming' | 'past';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
];

export default function BookingsScreen() {
  const { bookings } = useBookings();
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming');

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) =>
        activeTab === 'upcoming'
          ? booking.status === 'upcoming'
          : booking.status !== 'upcoming'
      ),
    [bookings, activeTab]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My bookings</Text>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            <View
              style={[
                styles.tabIndicator,
                activeTab === tab.key && styles.tabIndicatorActive,
              ]}
            />
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => router.push(`/booking/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          activeTab === 'upcoming' ? (
            <EmptyState
              icon="calendar-outline"
              title="No upcoming bookings"
              description="When you book a service, your upcoming appointments will appear here."
              actionLabel="Explore services"
              onActionPress={() => router.push('/(tabs)/services')}
            />
          ) : (
            <EmptyState
              icon="time-outline"
              title="No past bookings"
              description="Completed and cancelled appointments will show up here."
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  title: {
    ...Typography.largeHeading,
    fontSize: 30,
    color: Colors.text,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: ScreenPadding,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingBottom: Spacing.md,
  },
  tabText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.textMuted,
  },
  tabTextActive: {
    fontFamily: FontFamily.semibold,
    color: Colors.text,
  },
  tabIndicator: {
    height: 2,
    marginTop: Spacing.md,
    backgroundColor: 'transparent',
  },
  tabIndicatorActive: {
    backgroundColor: Colors.accentDark,
  },
  listContent: {
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.huge,
    flexGrow: 1,
  },
});
