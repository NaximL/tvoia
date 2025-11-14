import { format, isToday, isYesterday, parseISO } from "date-fns";
import { uk } from "date-fns/locale";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";


const dummyDiary = [
  { id: '1', subjectMatter: "Математика", grade: 'Н', systemicGradeType: "Test", lessonCreatedOn: "2025-11-13T09:30:00" },
  { id: '2', subjectMatter: "Фізика", grade: 0, systemicGradeType: "ClassWork", lessonCreatedOn: "2025-11-13T10:00:00" },
  { id: '3', subjectMatter: "Хімія", grade: 1, systemicGradeType: "Homework", lessonCreatedOn: "2025-11-12T08:20:00" },
  { id: '4', subjectMatter: "Біологія", grade: 2, systemicGradeType: "Test", lessonCreatedOn: "2025-11-12T09:15:00" },
  { id: '5', subjectMatter: "Географія", grade: 3, systemicGradeType: "ClassWork", lessonCreatedOn: "2025-11-11T11:00:00" },
  { id: '6', subjectMatter: "Історія", grade: 4, systemicGradeType: "Homework", lessonCreatedOn: "2025-11-11T12:30:00" },
  { id: '7', subjectMatter: "Англійська", grade: 5, systemicGradeType: "Test", lessonCreatedOn: "2025-11-10T09:00:00" },
  { id: '8', subjectMatter: "Фізкультура", grade: 6, systemicGradeType: "ClassWork", lessonCreatedOn: "2025-11-10T10:30:00" },
  { id: '9', subjectMatter: "Музика", grade: 7, systemicGradeType: "Homework", lessonCreatedOn: "2025-11-09T08:00:00" },
  { id: '10', subjectMatter: "Образотворче", grade: 8, systemicGradeType: "Test", lessonCreatedOn: "2025-11-09T09:30:00" },
  { id: '11', subjectMatter: "Література", grade: 9, systemicGradeType: "ClassWork", lessonCreatedOn: "2025-11-08T11:00:00" },
  { id: '12', subjectMatter: "Математика", grade: 10, systemicGradeType: "Homework", lessonCreatedOn: "2025-11-08T12:45:00" },
  { id: '13', subjectMatter: "Фізика", grade: 11, systemicGradeType: "Test", lessonCreatedOn: "2025-11-07T09:00:00" },
  { id: '14', subjectMatter: "Хімія", grade: 12, systemicGradeType: "ClassWork", lessonCreatedOn: "2025-11-07T10:30:00" },
];


const systemicGradeTypeMap: Record<string, string> = {
  Notebook: "Зошит",
  Oral: "Усна відповідь",
  Simplework: "Звичайне завдання",
  Test: "Тест",
  TestWork: "Тест",
  Essay: "Твір",
  SubjectGrade: "Предметна оцінка",
  Homework: "Домашнє завдання",
  TheoreticalWork: "Теоритична робота",
  ClassWork: "Класна робота",
  PracticalWork: "Практична робота",
  "Additional test": "Додатковий тест",
  Controlwork: "Контрольна робота",
  LaboratoryWork: "Лабораторна робота",
  IndependentWork: "Самостійна робота",
  ProjectWork: "Проєктна робота",
  CreativeWork: "Творча робота",
  Moduletest: "Модульна контрольна",
  Summativeassessment: "Підсумкове оцінювання",
  Semesterassessment: "Семестрове оцінювання",
  Yearlyassessment: "Річне оцінювання",
  Thematicassessment: "Тематичне оцінювання",
  Diagnosticwork: "Діагностична робота",
  Behavior: "Поведінка",
  Other: "Інше",
  undefined: "Немає",
  null: "Немає",
};

function groupByDate(data: any[]) {
  const groups: Record<string, any[]> = {};
  data.forEach((item) => {
    const date = parseISO(item.lessonCreatedOn);
    let key = "";
    if (isToday(date)) key = "Сьогодні";
    else if (isYesterday(date)) key = "Вчора";
    else key = format(date, "dd MMMM", { locale: uk });
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return Object.entries(groups).map(([title, data]) => ({ title, data }));
}

export default function Diary() {
  const [diary] = useState(dummyDiary);
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const sections = groupByDate(diary);

  const gradeColorLight: Record<string | number, string> = {
    Н: "#FF3B30",
    "Н/О": "#FF6F00",
    "Н/А": "#999999",
    0: "#d20000",
    1: "#d20000",
    2: "#d20000",
    3: "#d21500",
    4: "#d21500",
    5: "#d23f00",
    6: "#d2a500",
    7: "#d2bd00",
    8: "#a9c24d",
    9: "#A0D755",
    10: "#69C835",
    11: "#69C835",
    12: "#30C759",
  };

  const getGradeColor = (grade: number | string) => gradeColorLight[grade] || "#6C63FF";

  const renderItem = ({ item }: any) => {
    const gradeType = systemicGradeTypeMap[item.systemicGradeType] || "-";
    const color = getGradeColor(item.grade);

    return (
      <Pressable style={styles.item} onPress={() => { }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subject}>{item.subjectMatter}</Text>
          <Text style={styles.type}>{gradeType}</Text>
        </View>
        <View style={[styles.gradeBadge, { backgroundColor: color }]}>
          <Text style={styles.gradeText}>{item.grade}</Text>
        </View>
      </Pressable>
    );
  };

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.line} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#F5F5F7" }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButtonText: { fontSize: 17, color: "#2D8FF2" },
  sectionHeader: { paddingVertical: 8 },
  sectionTitle: { fontSize: 14.5, fontWeight: "600", color: "#888" },
  line: { height: 1, backgroundColor: "#ccc", marginTop: 4 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  date: { color: "#888", fontSize: 13 },
  subject: { color: "white", fontSize: 16, fontWeight: "600", marginTop: 2 },
  type: { color: "#aaa", fontSize: 13 },
  gradeBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  gradeText: { color: "white", fontWeight: "700", fontSize: 18 },
});