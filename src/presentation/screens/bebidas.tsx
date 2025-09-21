// app/(tabs)/explore.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function DrinksScreen() {
  // Ejemplo de bebidas por categoría
  const drinksMenu = [
    {
      category: 'Refrescos',
      items: [
        { name: 'Coca-Cola', price: '$2.00' },
        { name: 'Fanta Naranja', price: '$2.00' },
      ],
    },
    {
      category: 'Jugos Naturales',
      items: [
        { name: 'Jugo de Naranja', price: '$3.00' },
        { name: 'Jugo de Manzana', price: '$3.00' },
      ],
    },
    {
      category: 'Bebidas Calientes',
      items: [
        { name: 'Café', price: '$1.50' },
        { name: 'Té', price: '$1.50' },
      ],
    },
    {
      category: 'Licores',
      items: [
        { name: 'Whisky', price: '$5.00' },
        { name: 'Vodka', price: '$5.00' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Menú de Bebidas
      </ThemedText>

      {drinksMenu.map((section, index) => (
        <Collapsible key={index} title={section.category}>
          {section.items.map((drink, i) => (
            <ThemedView key={i} style={styles.itemContainer}>
              <ThemedText type="subtitle">{drink.name} - {drink.price}</ThemedText>
            </ThemedView>
          ))}
        </Collapsible>
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
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});
