import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '@/constants/colors';

interface TimeSlotProps {
  time: string;
  available: boolean;
  selected: boolean;
  onPress: () => void;
}

export default function TimeSlot({
  time,
  available,
  selected,
  onPress,
}: TimeSlotProps) {
  return (
    <TouchableOpacity
      style={[
        styles.slot,
        selected && styles.selectedSlot,
        !available && styles.disabledSlot,
      ]}
      onPress={onPress}
      disabled={!available}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
          !available && styles.disabledText,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  slot: {
    flexBasis: '48%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  disabledSlot: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  selectedText: {
    color: Colors.white,
  },
  disabledText: {
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});
