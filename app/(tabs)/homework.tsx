import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useGstyle } from '@/Colors';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Header } from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';

const Homework = () => {
  const { backgroundColor, isDark } = useGstyle();
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date();

  const formatDate = (date: Date) => {
    const days = [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'П’ятниця',
      'Субота',
    ];
    return `${date.getDate()}.${date.getMonth() + 1} (${days[date.getDay()]})`;
  };

  const menuItems = [
    { icon: 'arrow.clockwise', text: 'Оновити список', action: () => { Haptics.selectionAsync(); alert('Список оновлено 🔄'); } },
    { icon: 'line.3.horizontal.decrease.circle', text: 'Сортувати за предметом', action: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); alert('Відсортовано 🧮'); } },
    { icon: 'checkmark.circle', text: 'Показати виконані', action: () => { Haptics.selectionAsync(); alert('Показано ✅'); } },
    { icon: 'calendar', text: 'За датою подачі', action: () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); alert('Відображено 🗓️'); } },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const subjectGradients: { [key: string]: { One: string; Two: string } } = {
    'Математика': { One: '#2196F3', Two: '#64B5F6' },
    'Алгебра': { One: '#2196F3', Two: '#64B5F6' },
    'Геометрія': { One: '#1078cd', Two: '#4b8fc7' },
    'Біологія': { One: '#4CAF50', Two: '#81C784' },
    'Хімія': { One: '#FF9800', Two: '#FFC107' },
    'Фізика': { One: '#9C27B0', Two: '#BA68C8' },
    'Історія': { One: '#FF5722', Two: '#FF8A65' },
    'Географія': { One: '#00BCD4', Two: '#26C6DA' },
    'Англійська': { One: '#B388FF', Two: '#8C9EFF' }, 
    'Українська': { One: '#FBC02D', Two: '#e6d960' },
    'Зар. література': { One: '#FFB74D', Two: '#FFCC80' },
    'Фізкультура': { One: '#43A047', Two: '#81C784' },
    'Інформатика': { One: '#3F51B5', Two: '#7986CB' },
    'Громад': { One: '#009688', Two: '#4DB6AC' },
    'Урок-дискусія': { One: '#E91E63', Two: '#F48FB1' },
    'Технології': { One: '#795548', Two: '#A1887F' },
    'Колоквіум': { One: '#F44336', Two: '#E57373' },
  };

  const getGradient = (subject: string) => {
    for (const key in subjectGradients) {
      if (subject.includes(key)) return subjectGradients[key];
    }

    return isDark ? { One: '#555', Two: '#888' } : { One: '#ccc', Two: '#eee' };
  };

  const lessons = [
    {
      id: 18778206,
      subject: 'Геометрія',
      task: 'https://www.youtube.com/watch?v=BDcb0-_mfI0\nзаписати правила в зошит',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18779703,
      subject: 'Англійська мова',
      task: 'Life Vision B1 Unit 6.5 | Quizlet\nвивчити слова',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18779691,
      subject: 'Англійська мова',
      task: 'Life Vision B1 Unit 6.5 | Quizlet',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18780402,
      subject: 'Інформатика',
      task: 'На с.70 дати відповіді на питання 1-7.\nРозв\'язати задачу №3 на с.70.',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18780387,
      subject: 'Інформатика',
      task: 'Прочитати с.67-70. На с. 70 розв\'язати задачі 1 та 2.',

      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18760875,
      subject: 'Алгебра',
      task: '№ 15.21',

      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18761435,
      subject: 'Алгебра',
      task: '№ 15.31',

      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18730133,
      subject: 'Українська мова',
      task: 'За підручником опрацьовуємо с.51-52, с.57-59, 63-65. Теми для виступу: 1. Чи потрібна людині філософія в епоху штучного інтелекту? 2. Штучний інтелект - це порятунок людства чи шлях у безодню? 3. Свобода чи дисципліна: що важливіше для суспільства? Обираємо одну з тем і складаємо план виступу',

      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18655411,
      subject: 'Біологія',
      task: 'опрацювати п. 14, 15\nвиконати тестування https://www.classtime.com/code/FUU4XZ',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
  ];

  const groupedLessons = lessons.reduce((acc: any, lesson) => {
    const dateStr = lesson.date.toDateString();
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(lesson);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedLessons)
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  const renderSection = (date: Date) => {
    const data = groupedLessons[date.toDateString()];
    if (!data || data.length === 0) return null;

    const title =
      date.toDateString() === today.toDateString()
        ? 'Сьогодні'
        : date.toDateString() === new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toDateString()
          ? 'Завтра'
          : '';
    return (
      <View key={date.toDateString()} style={{ marginBottom: 10 }}>
        <View style={styles.sectionHeaderWrap}>

          {title === "" ?
            <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>{formatDate(date)}</Text>
            :
            <>
              <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>{title}</Text>
              <Text style={[styles.sectionDate, { color: isDark ? '#aaa' : '#555' }]}>{formatDate(date)}</Text>
            </>
          }

        </View>

        {data.map((lesson: any, index: number) => {
          const gradient = getGradient(lesson.subject);
          return (
            <Animated.View
              key={lesson.id}
              entering={ZoomIn.springify()}
              exiting={ZoomOut.springify()}
              layout={Layout.springify()}
              style={[styles.cardWrap, { marginBottom: index === data.length - 1 ? 4 : 14 }]} // остання карточка менш відступ
            >
              <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <BlurView intensity={isDark ? 25 : 70} tint={isDark ? 'dark' : 'light'} style={[styles.card, { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
                  <LinearGradient colors={[gradient.One, gradient.Two]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerBubble}>
                    <Text style={styles.lessonTitle}>{lesson.subject}</Text>
                  </LinearGradient>

                  <Text style={[styles.taskText, { color: isDark ? '#E7E7E7' : '#1A1A1F' }]}>{lesson.task}</Text>
                </BlurView>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <Header Textheader="Домашнє завдання" menuItems={menuItems} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
      >
        {sortedDates.map((date, i) => (
          <React.Fragment key={i}>
            {i > 0 && <View style={styles.separator} />}
            {renderSection(date)}
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homework;

const styles = StyleSheet.create({
  cardWrap: { marginBottom: 14 },
  card: { borderRadius: 24, padding: 18, overflow: 'hidden', borderWidth: 1, shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
  headerBubble: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginBottom: 10 },
  lessonTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  taskText: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
  sectionHeaderWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  sectionDate: { fontSize: 13, fontWeight: '500' },
  separator: { height: 1, backgroundColor: 'rgba(150,150,150,0.2)', marginVertical: 12 },
});