import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
  variant?: 'list' | 'featured';
}

export default function ServiceCard({
  service,
  onPress,
  variant = 'list',
}: ServiceCardProps) {
  if (variant === 'featured') {
    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <View
          style={[styles.featuredImage, { backgroundColor: service.color }]}
        >
          <Text style={styles.featuredIcon}>{service.icon}</Text>
        </View>
        <Text style={styles.featuredName} numberOfLines={1}>
          {service.name}
        </Text>
        <Text style={styles.featuredMeta}>
          ₱{service.price} • {service.duration}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      <View style={[styles.image, { backgroundColor: service.color }]}>
        <Text style={styles.icon}>{service.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>
        <Text style={styles.meta}>
          ₱{service.price} • {service.duration}
        </Text>
        <CustomButton title="View" onPress={onPress} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
    shadowColor: Colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 34,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  meta: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 6,
  },
  button: {
    height: 36,
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
  },
  featuredCard: {
    width: 160,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  featuredImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featuredIcon: {
    fontSize: 32,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  featuredMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
  },
});
