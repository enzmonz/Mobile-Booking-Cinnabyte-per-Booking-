import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';
import SectionHeader from '@/components/SectionHeader';
import ServiceCard from '@/components/ServiceCard';
import StatusBadge from '@/components/StatusBadge';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { Radius } from '@/constants/radius';
import {
  fetchCategories,
  fetchPopularServices,
  fetchServicesBySearch,
  formatRelativeDay,
} from '@/data/api';
import { useBookings } from '@/context/BookingsContext';

const USER_FIRST_NAME = 'Enz';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { bookings } = useBookings();

  const categories = useMemo(() => fetchCategories(), []);
  const popularServices = useMemo(() => fetchPopularServices(), []);
  const searchResults = useMemo(
    () => (query.trim() ? fetchServicesBySearch(query) : []),
    [query]
  );

  const nextUpcoming = useMemo(() => {
    const upcoming = bookings.filter((b) => b.status === 'upcoming');
    return upcoming.length > 0 ? upcoming[upcoming.length - 1] : undefined;
  }, [bookings]);

  const goToService = (id: string) => router.push(`/service/${id}`);

  const goToCategory = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)/services',
      params: { category: categoryId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          {getGreeting()}, {USER_FIRST_NAME}
        </Text>
        <Text style={styles.headline}>
          Find something worth{'\n'}making time for.
        </Text>

        <SearchBar value={query} onChangeText={setQuery} />

        {query.trim() ? (
          <View style={styles.section}>
            <SectionHeader title={`Results (${searchResults.length})`} />
            <View style={styles.listGap}>
              {searchResults.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onPress={() => goToService(service.id)}
                />
              ))}
              {searchResults.length === 0 && (
                <Text style={styles.emptyText}>
                  No services found for "{query}".
                </Text>
              )}
            </View>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <SectionHeader title="Categories" rule />
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => goToCategory(category.id)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Popular near you" rule />
              <View style={styles.listGap}>
                {popularServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onPress={() => goToService(service.id)}
                  />
                ))}
              </View>
            </View>

            {nextUpcoming && (
              <View style={styles.section}>
                <SectionHeader title="Upcoming appointment" rule />
                <Pressable
                  style={({ pressed }) => [
                    styles.upcomingCard,
                    pressed && styles.upcomingPressed,
                  ]}
                  onPress={() => router.push(`/booking/${nextUpcoming.id}`)}
                >
                  <View style={styles.upcomingRow}>
                    <View style={styles.upcomingIcon}>
                      <Ionicons
                        name={
                          nextUpcoming.serviceIcon as keyof typeof Ionicons.glyphMap
                        }
                        size={22}
                        color={Colors.textMuted}
                      />
                    </View>
                    <View style={styles.upcomingInfo}>
                      <Text style={styles.upcomingName}>
                        {nextUpcoming.serviceName}
                      </Text>
                      <Text style={styles.upcomingMeta}>
                        {formatRelativeDay(nextUpcoming.date)} ·{' '}
                        {nextUpcoming.time}
                      </Text>
                    </View>
                    <StatusBadge status={nextUpcoming.status} />
                  </View>
                  <View style={styles.linkRow}>
                    <Text style={styles.link}>View booking</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={14}
                      color={Colors.accentDark}
                    />
                  </View>
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.huge,
  },
  greeting: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  headline: {
    ...Typography.sectionHeading,
    fontSize: 25,
    color: Colors.text,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xxl,
  },
  section: {
    marginTop: Spacing.xxxl,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  listGap: {
    gap: Spacing.lg,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
  upcomingCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  upcomingPressed: {
    opacity: 0.8,
  },
  upcomingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  upcomingIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.card - 4,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingName: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.text,
  },
  upcomingMeta: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  link: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.accentDark,
  },
});
