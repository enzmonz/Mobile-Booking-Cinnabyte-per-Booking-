import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

interface ErrorStateProps {
  title?: string;
  description: string;
  onRetry: () => void;
}

export default function ErrorState({
  title = 'Something went wrong.',
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle-outline" size={22} color={Colors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <CustomButton
        title="Try again"
        onPress={onRetry}
        variant="outline"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.huge,
    paddingHorizontal: Spacing.xxl,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.cardTitle,
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xxl,
  },
});
