import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StatCard = ({ color, icon, title, subtitle }: any) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={26} color="white" />
    </View>
    
    <View style={styles.textBlock}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 22,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    transform: [{ scale: 1 }],
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  textBlock: {
    marginTop: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
});