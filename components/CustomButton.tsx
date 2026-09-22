import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Radius } from '@/constants/radius';

type ButtonVariant = 'primary' | 'outline' | 'dark' | 'danger';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;
  const spinnerColor =
    variant === 'primary' ? Colors.onAccent : Colors.text;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'dark' && styles.dark,
        variant === 'danger' && styles.danger,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' && styles.primaryText,
            variant === 'outline' && styles.outlineText,
            variant === 'dark' && styles.darkText,
            variant === 'danger' && styles.dangerText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dark: {
    backgroundColor: Colors.dark,
  },
  danger: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.error,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.text,
  },
  primaryText: {
    color: Colors.onAccent,
  },
  outlineText: {
    color: Colors.text,
  },
  darkText: {
    color: Colors.white,
  },
  dangerText: {
    color: Colors.error,
  },
});
