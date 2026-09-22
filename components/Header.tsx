import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
}

export default function Header({
  title,
  showBack = true,
  onBack,
  right,
  style,
}: HeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={[styles.container, style]}>
        <View style={styles.side}>
          {showBack && (
            <Pressable
              onPress={onBack ?? (() => router.back())}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
            >
              <Ionicons name="arrow-back" size={20} color={Colors.text} />
            </Pressable>
          )}
        </View>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : (
          <View style={styles.flexGrow} />
        )}
        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ScreenPadding,
    height: 52,
  },
  side: {
    width: 40,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  flexGrow: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -Spacing.sm,
  },
  backButtonPressed: {
    opacity: 0.5,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.text,
  },
});
