// app/(tabs)/home.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  // Ejemplo de menú de comida
  const menuItems = [
    { name: 'Pizza Margherita', price: '$8.99', description: 'Tomate, mozzarella, albahaca' },
    { name: 'Hamburguesa Clásica', price: '$6.50', description: 'Carne, queso, lechuga y tomate' },
    { name: 'Ensalada César', price: '$5.00', description: 'Lechuga, crutones, parmesano, aderezo César' },
    { name: 'Pasta Alfredo', price: '$7.75', description: 'Pasta con salsa cremosa de queso' },
    { name: 'Helado de Chocolate', price: '$3.50', description: 'Chocolate y crema' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Menú del Día
      </ThemedText>

      {menuItems.map((item, index) => (
        <ThemedView key={index} style={styles.itemContainer}>
          <ThemedText type="subtitle">{item.name} - {item.price}</ThemedText>
          <ThemedText type="default">{item.description}</ThemedText>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0', // Esto puedes cambiar para tema oscuro
  },
});
