import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';

const MOCK_USER = {
  name: 'Enz Monz',
  email: 'enz.monz@email.com',
};

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  isLast?: boolean;
}

function MenuItem({
  icon,
  label,
  onPress,
  destructive = false,
  isLast = false,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isLast && styles.menuItemNoBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={destructive ? Colors.error : Colors.text}
        />
        <Text style={[styles.menuLabel, destructive && styles.menuLabelDestructive]}>
          {label}
        </Text>
      </View>
      {!destructive && (
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const initials = MOCK_USER.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{MOCK_USER.name}</Text>
          <Text style={styles.email}>{MOCK_USER.email}</Text>
        </View>

        <View style={styles.menuGroup}>
          <MenuItem
            icon="calendar-outline"
            label="My Bookings"
            onPress={() => router.push('/(tabs)/bookings')}
          />
          <MenuItem
            icon="settings-outline"
            label="Settings"
            onPress={() => Alert.alert('Settings', 'Coming soon!')}
          />
          <MenuItem
            icon="notifications-outline"
            label="Notifications"
            onPress={() => Alert.alert('Notifications', 'Coming soon!')}
            isLast
          />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem
            icon="log-out-outline"
            label="Log Out"
            onPress={handleLogOut}
            destructive
            isLast
          />
        </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 18,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.text,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  menuGroup: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemNoBorder: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  menuLabelDestructive: {
    color: Colors.error,
  },
});
