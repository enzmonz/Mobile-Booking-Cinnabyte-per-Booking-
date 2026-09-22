import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BookingsProvider } from '@/context/BookingsContext';
import Colors from '@/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BookingsProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.background },
            headerShadowVisible: false,
            headerTintColor: Colors.text,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="service/[id]"
            options={{ title: 'Service Details' }}
          />
          <Stack.Screen
            name="booking/date"
            options={{ title: 'Choose a Date' }}
          />
          <Stack.Screen
            name="booking/time"
            options={{ title: 'Choose a Time' }}
          />
          <Stack.Screen
            name="booking/confirmation"
            options={{ title: 'Confirm Booking' }}
          />
          <Stack.Screen
            name="booking/success"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="booking/[id]"
            options={{ title: 'Booking Details' }}
          />
        </Stack>
      </BookingsProvider>
    </SafeAreaProvider>
  );
}
