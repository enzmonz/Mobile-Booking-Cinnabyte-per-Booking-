import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';
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
  const isFeatured = variant === 'featured';

  return (
    <Pressable
      style={({ pressed }) => [
        isFeatured ? styles.featuredCard : styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.image, isFeatured && styles.featuredImage]}>
        <Ionicons
          name={service.icon as keyof typeof Ionicons.glyphMap}
          size={isFeatured ? 30 : 36}
          color={Colors.textMuted}
        />
      </View>

      <Text style={styles.eyebrow}>{service.eyebrow}</Text>
      <Text
        style={[styles.name, isFeatured && styles.featuredName]}
        numberOfLines={1}
      >
        {service.name}
      </Text>
      <Text style={styles.provider} numberOfLines={1}>
        {service.provider}
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.price}>₱{service.price}</Text>
        <Text style={styles.duration}>{service.duration}</Text>
      </View>

      {!isFeatured && (
        <View style={styles.linkRow}>
          <Text style={styles.link}>View details</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.accentDark} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  featuredCard: {
    width: 168,
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 128,
    borderRadius: Radius.card - 4,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  featuredImage: {
    height: 92,
  },
  eyebrow: {
    ...Typography.eyebrow,
    fontSize: 10.5,
    color: Colors.textMuted,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 17,
    color: Colors.text,
    marginTop: 3,
  },
  featuredName: {
    fontSize: 14.5,
  },
  provider: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  price: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.text,
  },
  duration: {
    fontFamily: FontFamily.medium,
    fontSize: 12.5,
    color: Colors.textMuted,
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
