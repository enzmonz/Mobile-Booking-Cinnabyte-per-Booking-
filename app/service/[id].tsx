import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';
import { Radius } from '@/constants/radius';
import { fetchServiceById } from '@/data/api';

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = fetchServiceById(id);

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Service" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Service not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.image}>
          <Ionicons
            name={service.icon as keyof typeof Ionicons.glyphMap}
            size={64}
            color={Colors.textMuted}
          />
        </View>

        <Text style={styles.eyebrow}>{service.eyebrow}</Text>
        <Text style={styles.name}>{service.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={Colors.accentDark} />
          <Text style={styles.ratingText}>{service.rating}</Text>
        </View>

        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.divider} />

        <View style={styles.priceDurationRow}>
          <Text style={styles.price}>₱{service.price}</Text>
          <Text style={styles.duration}>{service.duration}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Provider</Text>
        <Text style={styles.value}>{service.provider}</Text>

        <Text style={[styles.label, styles.labelSpaced]}>Location</Text>
        <Text style={styles.value}>{service.location}</Text>

        <View style={styles.divider} />
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Book appointment"
          onPress={() =>
            router.push({
              pathname: '/booking/date',
              params: { serviceId: service.id },
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
  image: {
    height: 220,
    borderRadius: Radius.card,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  eyebrow: {
    ...Typography.eyebrow,
    color: Colors.textMuted,
  },
  name: {
    ...Typography.largeHeading,
    fontSize: 28,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
  },
  ratingText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xxl,
  },
  priceDurationRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: Colors.text,
  },
  duration: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  label: {
    ...Typography.eyebrow,
    color: Colors.textMuted,
  },
  labelSpaced: {
    marginTop: Spacing.xl,
  },
  value: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
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
