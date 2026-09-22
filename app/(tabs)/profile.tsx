import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { FontFamily, Typography } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';

const MOCK_USER = {
  name: 'Enz Monz',
  email: 'enz.monz@email.com',
};

interface RowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

function Row({ icon, label, onPress, destructive = false }: RowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={19}
          color={destructive ? Colors.error : Colors.textSecondary}
        />
        <Text style={[styles.rowLabel, destructive && styles.rowLabelDanger]}>
          {label}
        </Text>
      </View>
      {!destructive && (
        <Ionicons name="chevron-forward" size={17} color={Colors.textMuted} />
      )}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const handleLogOut = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.name}>{MOCK_USER.name}</Text>
        <Text style={styles.email}>{MOCK_USER.email}</Text>

        <View style={styles.divider} />

        <Row
          icon="calendar-outline"
          label="Bookings"
          onPress={() => router.push('/(tabs)/bookings')}
        />
        <Row
          icon="notifications-outline"
          label="Notifications"
          onPress={() => Alert.alert('Notifications', 'Coming soon.')}
        />
        <Row
          icon="settings-outline"
          label="Settings"
          onPress={() => Alert.alert('Settings', 'Coming soon.')}
        />

        <View style={styles.divider} />

        <Row
          icon="log-out-outline"
          label="Log out"
          onPress={handleLogOut}
          destructive
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.huge,
  },
  title: {
    ...Typography.largeHeading,
    fontSize: 30,
    color: Colors.text,
    marginBottom: Spacing.xxxl,
  },
  name: {
    fontFamily: FontFamily.semibold,
    fontSize: 19,
    color: Colors.text,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  rowPressed: {
    opacity: 0.6,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.text,
  },
  rowLabelDanger: {
    color: Colors.error,
  },
});
