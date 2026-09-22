import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryCard from '@/components/CategoryCard';
import EmptyState from '@/components/EmptyState';
import ServiceCard from '@/components/ServiceCard';
import Colors from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { fetchCategories, fetchServices } from '@/data/api';

const ALL_CATEGORY = { id: 'all', name: 'All', icon: 'apps-outline' };

export default function ServicesScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.category ?? 'all'
  );

  const categories = useMemo(() => fetchCategories(), []);
  const allServices = useMemo(() => fetchServices(), []);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return allServices;
    return allServices.filter(
      (service) => service.categoryId === selectedCategory
    );
  }, [allServices, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <FlatList
        horizontal
        data={[ALL_CATEGORY, ...categories]}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={styles.chipList}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            selected={selectedCategory === item.id}
            onPress={() => setSelectedCategory(item.id)}
          />
        )}
      />

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => router.push(`/service/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No services here yet"
            description="Try a different category to find what you're looking for."
          />
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
  chipList: {
    flexGrow: 0,
  },
  chipRow: {
    paddingHorizontal: ScreenPadding,
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  listContent: {
    padding: ScreenPadding,
    paddingTop: Spacing.xs,
  },
});
