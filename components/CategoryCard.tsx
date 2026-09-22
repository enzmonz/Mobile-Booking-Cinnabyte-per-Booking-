import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Radius } from '@/constants/radius';
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
    <Pressable
      style={({ pressed }) => [
        styles.pill,
        selected && styles.pillSelected,
        pressed && styles.pillPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={category.icon as keyof typeof Ionicons.glyphMap}
        size={16}
        color={selected ? Colors.onAccent : Colors.textSecondary}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  pillPressed: {
    opacity: 0.75,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.text,
  },
  labelSelected: {
    color: Colors.onAccent,
    fontFamily: FontFamily.semibold,
  },
});
