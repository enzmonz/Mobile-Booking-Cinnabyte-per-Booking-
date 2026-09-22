import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '@/constants/colors';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  selected?: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  category,
  selected = false,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  selectedContainer: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  selectedLabel: {
    color: Colors.primary,
  },
});
