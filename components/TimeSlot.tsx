import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Radius } from '@/constants/radius';

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
    <Pressable
      style={({ pressed }) => [
        styles.slot,
        selected && styles.selectedSlot,
        !available && styles.disabledSlot,
        pressed && available && styles.pressedSlot,
      ]}
      onPress={onPress}
      disabled={!available}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    flexBasis: '48%',
    height: 50,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedSlot: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  disabledSlot: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
  },
  pressedSlot: {
    opacity: 0.75,
  },
  text: {
    fontFamily: FontFamily.medium,
    fontSize: 14.5,
    color: Colors.text,
  },
  selectedText: {
    fontFamily: FontFamily.semibold,
    color: Colors.onAccent,
  },
  disabledText: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
