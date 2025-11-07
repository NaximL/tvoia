import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const gradeColorLight: Record<string, string> = {
  Н: "#FF3B30",
  "Н/О": "#FF6F00",
  "Н/А": "#999999",
  0: "#FF6F00",
  1: "#FFB300",
  2: "#FFC233",
  3: "#FFD966",
  4: "#FFEFAA",
  5: "#FAFFD8",
  6: "#C8E37A",
  7: "#C8E37A",
  8: "#A0D755",
  9: "#A0D755",
  10: "#69C835",
  11: "#69C835",
  12: "#30C759",
};

const activities = [
  {
    id: '1',
    date: '27 березня',
    subject: 'Створення гаджетів на Arduino',
    type: 'Екзамен',
    grade: 12,
  },
  {
    id: '2',
    date: '22 березня',
    subject: 'Відео лабораторія',
    type: 'Робота в класі',
    grade: 10,
  },
  {
    id: '3',
    date: '20 березня',
    subject: 'Фізика — рух тіла',
    type: 'Контрольна робота',
    grade: 8,
  },
];

export const ActivityList = () => (
  <View style={styles.container}>
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.title}>Оцінки</Text>
      <Ionicons name="chevron-forward" size={26} color="#fff" />
    </View>

    {activities.map((item, index) => {
      const color = gradeColorLight[item.grade] || '#6C63FF';
      return (
        <View key={index} style={styles.item}>
          <View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>

          <View style={[styles.gradeBadge, { backgroundColor: color }]}>
            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  date: {
    color: '#888',
    fontSize: 13,
  },
  subject: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  type: {
    color: '#aaa',
    fontSize: 13,
  },
  gradeBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  gradeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});