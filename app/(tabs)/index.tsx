import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import Colors from '@/constants/colors';
import {
  fetchCategories,
  fetchFeaturedServices,
  fetchPopularServices,
  fetchServicesBySearch,
} from '@/data/api';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  const categories = useMemo(() => fetchCategories(), []);
  const featuredServices = useMemo(() => fetchFeaturedServices(), []);
  const popularServices = useMemo(() => fetchPopularServices(), []);
  const searchResults = useMemo(
    () => (query.trim() ? fetchServicesBySearch(query) : []),
    [query]
  );

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
        <Text style={styles.appName}>BookIt</Text>
        <Text style={styles.greeting}>{getGreeting()} 👋</Text>
        <Text style={styles.subtitle}>What would you like to book?</Text>

        <SearchBar value={query} onChangeText={setQuery} />

        {query.trim() ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Search Results ({searchResults.length})
            </Text>
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
              <Text style={styles.sectionTitle}>Categories</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalGap}
              >
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => goToCategory(category.id)}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Services</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalGap}
              >
                {featuredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    variant="featured"
                    onPress={() => goToService(service.id)}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Services</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  horizontalGap: {
    gap: 12,
    paddingRight: 4,
  },
  listGap: {
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
