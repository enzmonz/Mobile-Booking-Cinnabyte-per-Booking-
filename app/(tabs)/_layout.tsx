import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ColorValue, StyleSheet, View } from 'react-native';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';

function TabIcon({
  name,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: ColorValue;
  focused: boolean;
}) {
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={name} size={22} color={color} />
      <View style={[styles.dot, focused && styles.dotActive]} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="compass-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="calendar-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingTop: 8,
  },
  tabItem: {
    paddingTop: 2,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'transparent',
  },
  dotActive: {
    backgroundColor: Colors.accentDark,
  },
});
