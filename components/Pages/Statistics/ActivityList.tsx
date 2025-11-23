// ActivityList.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Router } from 'expo-router';
import { useGstyle } from '@/Colors';

export const ActivityList = ({ router }: { router: Router }) => {
  const { gstyles, isDark } = useGstyle();

  const gradeColor: Record<string, string> = isDark
    ? {
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
    }
    : {
      Н: "#D32F2F",
      "Н/О": "#F57C00",
      "Н/А": "#666666",
      0: "#F57C00",
      1: "#FFA000",
      2: "#FFB300",
      3: "#FFD966",
      4: "#FFF59D",
      5: "#E6FFB3",
      6: "#C8E37A",
      7: "#C8E37A",
      8: "#A0D755",
      9: "#A0D755",
      10: "#69C835",
      11: "#69C835",
      12: "#30C759",
    };

  const activities = [
    { id: '1', date: '27 березня', subject: 'Створення гаджетів на Arduino', type: 'Екзамен', grade: 12 },
    { id: '2', date: '22 березня', subject: 'Відео лабораторія', type: 'Робота в класі', grade: 10 },
    { id: '3', date: '20 березня', subject: 'Фізика — рух тіла', type: 'Контрольна робота', grade: 8 },
  ];

  return (
    <View style={[styles.container, gstyles.widgetColor]}>
      <Pressable style={{ flexDirection: "row" }} onPress={() => router.push("/diary")}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Оцінки</Text>
        <Ionicons name="chevron-forward" size={26} color={isDark ? '#fff' : '#000'} />
      </Pressable>

      {activities.map((item, index) => (
        <View key={index} style={[styles.item, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f0f0f0' }]}>
          <View style={{ width: '85%' }}>
            <Text style={[styles.date, { color: isDark ? '#888' : '#666' }]}>{item.date}</Text>
            <Text style={[styles.subject, { color: isDark ? '#fff' : '#000' }]}>{item.subject}</Text>
            <Text style={[styles.type, { color: isDark ? '#aaa' : '#444' }]}>{item.type}</Text>
          </View>

          <View style={[styles.gradeBadge, { backgroundColor: gradeColor[item.grade] || '#6C63FF' }]}>
            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 24, marginHorizontal: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 10 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, letterSpacing: 0.3 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 16, marginBottom: 10 },
  date: { fontSize: 13 },
  subject: { fontSize: 16, fontWeight: '600', marginTop: 2 },
  type: { fontSize: 13 },
  gradeBadge: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 6 },
  gradeText: { color: 'white', fontWeight: '700', fontSize: 18 },
});