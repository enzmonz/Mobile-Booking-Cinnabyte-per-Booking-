import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ServiceCard from '@/components/ServiceCard';
import Colors from '@/constants/colors';
import { fetchCategories, fetchServices } from '@/data/api';

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
        <Text style={styles.title}>Services</Text>
      </View>

      <FlatList
        horizontal
        data={[{ id: 'all', name: 'All', icon: '✨' }, ...categories]}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={styles.chipList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory === item.id && styles.chipSelected,
            ]}
            onPress={() => setSelectedCategory(item.id)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === item.id && styles.chipTextSelected,
              ]}
            >
              {item.icon} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => router.push(`/service/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No services in this category.</Text>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
  },
  chipList: {
    flexGrow: 0,
  },
  chipRow: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  chipTextSelected: {
    color: Colors.white,
  },
  listContent: {
    padding: 20,
    paddingTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 40,
  },
});
