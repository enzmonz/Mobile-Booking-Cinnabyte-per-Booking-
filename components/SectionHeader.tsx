import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  rule?: boolean;
}

export default function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  rule = false,
}: SectionHeaderProps) {
  return (
    <View style={[styles.wrapper, rule && styles.wrapperRule]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel && (
          <Pressable onPress={onActionPress} hitSlop={8}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.lg,
  },
  wrapperRule: {
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 19,
    color: Colors.text,
  },
  action: {
    ...Typography.bodyMedium,
    fontSize: 13,
    color: Colors.accentDark,
  },
});
