import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { fetchServiceById } from '@/data/api';

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = fetchServiceById(id);

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Service not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.image, { backgroundColor: service.color }]}>
          <Text style={styles.icon}>{service.icon}</Text>
        </View>

        <Text style={styles.name}>{service.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <Text style={styles.ratingText}>{service.rating}</Text>
        </View>

        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.priceDurationRow}>
          <Text style={styles.price}>₱{service.price}</Text>
          <View style={styles.durationPill}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.duration}>{service.duration}</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Provider</Text>
          <Text style={styles.infoValue}>{service.provider}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{service.location}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Book Now"
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
    padding: 20,
    paddingBottom: 20,
  },
  image: {
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 72,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginTop: 14,
  },
  priceDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  duration: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  infoBlock: {
    marginTop: 18,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 4,
  },
  footer: {
    padding: 20,
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
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
