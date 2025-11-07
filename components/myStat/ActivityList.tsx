import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const activities = [
  {
    id: '1',
    date: '27 березня',
    subject: 'Створення гаджетів на Arduino',
    type: 'Екзамен',
    grade: 12,
    color: '#6C63FF',
  },
  {
    id: '2',
    date: '22 березня',
    subject: 'Відео лабораторія',
    type: 'Робота в класі',
    grade: 10,
    color: '#00B894',
  },
  {
    id: '3',
    date: '20 березня',
    subject: 'Фізика — рух тіла',
    type: 'Контрольна робота',
    grade: 8,
    color: '#F24E1E',
  },
];

export const ActivityList = () => (
  <View style={styles.container}>
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.title}>Оцінки</Text>
      <Ionicons name="chevron-forward" size={26} color="#fff" />
    </View>

    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View key={index} style={styles.item}>
          <View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>

          <View style={[styles.gradeBadge, { backgroundColor: item.color }]}>
            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        </View>
      )}
    />
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
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 20,
  },
  iconText: {
    color: '#aaa',
    fontSize: 14,
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
    width: 46,
    height: 46,
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