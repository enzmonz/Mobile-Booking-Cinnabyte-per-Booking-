import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

interface SkeletonBlockProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export function SkeletonBlock({
  width = '100%',
  height = 14,
  radius = 6,
  style,
}: SkeletonBlockProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, opacity },
        styles.block,
        style,
      ]}
    />
  );
}

export function SkeletonServiceCard() {
  return (
    <View style={styles.card}>
      <SkeletonBlock height={140} radius={Radius.card} />
      <View style={styles.cardBody}>
        <SkeletonBlock width="35%" height={11} />
        <SkeletonBlock width="70%" height={18} style={styles.gapTop} />
        <SkeletonBlock width="45%" height={13} style={styles.gapTop} />
      </View>
    </View>
  );
}

export function SkeletonBookingCard() {
  return (
    <View style={styles.bookingCard}>
      <SkeletonBlock width="30%" height={11} radius={Radius.pill} />
      <SkeletonBlock width="65%" height={17} style={styles.gapTop} />
      <SkeletonBlock width="40%" height={13} style={styles.gapTop} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.surfaceMuted,
  },
  card: {
    marginBottom: Spacing.xl,
  },
  cardBody: {
    paddingTop: Spacing.md,
  },
  bookingCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.card,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  gapTop: {
    marginTop: Spacing.sm,
  },
});
