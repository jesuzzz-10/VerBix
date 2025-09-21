import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Primer tab: Comida */}
      <Tabs.Screen
        name="comida" // app/(tabs)/comida.tsx
        options={{
          title: 'Comida',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="fork.knife" color={color} />,
        }}
      />

      {/* Segundo tab: Bebidas */}
      <Tabs.Screen
        name="bebidas" // app/(tabs)/bebidas.tsx
        options={{
          title: 'Bebidas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cup.and.saucer" color={color} />,
        }}
      />
    </Tabs>
  );
}
