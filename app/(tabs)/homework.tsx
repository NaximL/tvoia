import { useGstyle } from '@/Colors';
import BottomMenu from '@/components/ui/BottomMenu';
import ContextMenu from '@/components/ui/ContextMenu';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut, FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Homework() {
  const { backgroundColor, isDark, homeworkwidgetColor, SearchBarColor, textColor, accentColor } = useGstyle();
  const [refreshing, setRefreshing] = useState(false);
  const [Searchs, setSearchs] = useState(false);

  const [search, setSearch] = useState('');
  const today = new Date();
  const router = useRouter();
  const formatDate = (date: Date) => {
    const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'];
    return `${date.getDate()}.${date.getMonth() + 1} (${days[date.getDay()]})`;
  };

  const onRefresh = () => {
    setRefreshing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const [filter, setFilter] = useState<'all' | 'today' | 'unfinished'>('all');

  const menuItems: any = [
    { icon: 'tray', text: 'Всі', action: () => setFilter('all') },
    { icon: 'calendar', text: 'На сьогодні', action: () => setFilter('today') },
    { icon: 'clock', text: 'Невиконані', action: () => setFilter('unfinished') },
  ];

  const subjectGradients: Record<string, { One: string; Two: string }> = {
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
  const searchInputRef = useRef<TextInput>(null);

  const getGradient = (subject: string) => {
    for (const key in subjectGradients) {
      if (subject.includes(key)) return subjectGradients[key];
    }
    return isDark ? { One: '#444', Two: '#666' } : { One: '#ddd', Two: '#eee' };
  };
  const lessons = [
    // === НА СЬОГОДНІ (2025-11-25) ===
    {
      id: 20000101,
      subject: 'Фізика',
      task: 'Параграф 12, впр. №3, 4\nпідготувати міні-відповідь до теми "Третій закон Ньютона"',
      date: new Date('2025-11-25T00:00:00+02:00'),
    },
    {
      id: 20000102,
      subject: 'Історія України',
      task: 'Опрацювати §7, скласти конспект (10–12 речень)',
      date: new Date('2025-11-25T00:00:00+02:00'),
    },


    {
      id: 20000201,
      subject: 'Хімія',
      task: 'Вивчити рівняння реакцій до параграфу 18\nвирішити №5, 6, 7',
      date: new Date('2025-11-26T00:00:00+02:00'),
    },
    {
      id: 20000202,
      subject: 'Географія',
      task: 'Підготувати мапу-план “Південна Америка”\nвивчити материки та країни',
      date: new Date('2025-11-26T00:00:00+02:00'),
    },


    {
      id: 20000301,
      subject: 'Українська література',
      task: 'Прочитати “Тигролови” до 10 розділу\nвиписати 5 цитат',
      date: new Date('2025-11-24T00:00:00+02:00'),
    },
    {
      id: 20000302,
      subject: 'Алгебра',
      task: '№ 12.4, 12.5, 12.6 (домашня контрольна)',
      date: new Date('2025-11-24T00:00:00+02:00'),
    },
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
      subject: 'Математика «За лаштунками шкільної математики»',
      task: '№ 15.31',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18730133,
      subject: 'Українська мова',
      task: 'За підручником опрацьовуємо с.51-52, с.57-59, 63-65. ...',
      date: new Date('2025-11-13T00:00:00+02:00'),
    },
    {
      id: 18655411,
      subject: 'Біологія',
      task: 'опрацювати п. 14, 15\nвиконати тестування https://www.classtime.com/code/FUU4XZ',
      date: new Date('2025-11-13T00:00:00+02:00'),
      files: ['https://example.com/file1.pdf', 'https://example.com/file2.pdf'],
    },
  ];


  const filteredLessons = lessons.filter((l: any) => {
    const q = search.trim().toLowerCase();
    if (q) {
      const text = `${l.subject} ${l.task}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    if (filter === 'today') return l.date.toDateString() === today.toDateString();
    if (filter === 'unfinished') return (l as any).done !== true;
    return true;
  });

  const grouped = filteredLessons.reduce((acc: any, l) => {
    const key = l.date.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(l);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime());

  const renderSection = (date: Date) => {
    const sectionData = grouped[date.toDateString()];
    const title = date.toDateString() === today.toDateString()
      ? 'Сьогодні'
      : date.toDateString() === new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toDateString()
        ? 'Завтра'
        : formatDate(date);

    return (
      <View key={date.toDateString()} style={{ marginBottom: 28 }}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>{title}</Text>
        {sectionData.map((lesson: any) => {
          const g = getGradient(lesson.subject);
          return (
            <Animated.View key={lesson.id} entering={ZoomIn.springify()} exiting={ZoomOut.springify()} layout={Layout.springify()}>
              <Pressable onPress={() => {
                router.push({ pathname: '/Modals/homeworkmodal', params: { subject: lesson.subject, task: lesson.task, files: lesson.files } });
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}>
                <BlurView intensity={isDark ? 20 : 45} tint={isDark ? 'dark' : 'light'} style={[styles.card, { backgroundColor: homeworkwidgetColor, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <LinearGradient colors={[g.One, g.Two]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.subjectBubble, { maxWidth: '70%' }]}>
                      <Text style={styles.subjectText} numberOfLines={2}>{lesson.subject}</Text>
                    </LinearGradient>
                    {lesson.files?.length > 0 && (
                      <LinearGradient colors={["rgb(1, 137, 255)", "rgb(34, 152, 255)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.subjectBubble}>
                        <Text style={styles.subjectText}>{lesson.files.length} файла</Text>
                      </LinearGradient>
                    )}
                  </View>
                  <Text style={[styles.taskText, { color: isDark ? '#EDEDED' : '#1A1A1F' }]}>{lesson.task}</Text>
                </BlurView>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    );
  };








  const BottomButton = {
    first: {
      icon: "line.3.horizontal.decrease.circle"
    },
    central: {
      top: "Фільтр:",
      bottom: filter === 'all' ? 'Всі' : filter === 'today' ? 'Сьогодні' : 'Невиконані'
    },
    end: {
      icon: "magnifyingglass",
      action: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setSearchs(true); setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {Searchs && (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View style={[styles.searchBar, { backgroundColor: SearchBarColor || (isDark ? '#2b2b2b' : '#efefef') }]}>
            <View style={styles.searchInner}>
              <IconSymbol name="magnifyingglass" size={18} color={isDark ? '#9d9d9d' : '#6c6c6c'} />
              <TextInput
                ref={searchInputRef}
                value={search}
                onChangeText={setSearch}
                placeholder="Пошук"
                placeholderTextColor={isDark ? '#8e8e93' : '#8e8e93'}
                style={[styles.searchInput, { color: isDark ? '#fff' : '#000' }]}
              />
            </View>
          </View>
        </Animated.View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ padding: 18 }}>
        {sortedDates.map(d => renderSection(d))}
      </ScrollView>


      <BottomMenu menuItems={menuItems} BottomButton={BottomButton} />
      {/* <BlurView tint='default' intensity={30} style={[styles.BottomTab, { borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0, 0, 0, 0.1)', backgroundColor: isDark ? 'rgba(60,60,60,0.14)' : 'rgba(179,179,179,0.08)' }]}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); }}>
          <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
            <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color={accentColor} />
          </ContextMenu>
        </Pressable>

        <View style={styles.BottomTabTextContainer}>
          <Text style={[styles.BottomTabText, { color: textColor }]}>Фільтр:</Text>
          <Text style={styles.BottomTabTextSmall}></Text>
        </View>

        <Pressable onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setSearchs(true); setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        }}>
          <IconSymbol name={} size={28} color={accentColor} />
        </Pressable>
      </BlurView> */}


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 14,
    marginLeft: 0,
  },

  sectionTitleSmall: {
    fontSize: 20,
    fontWeight: '700',
  },

  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },

  subjectBubble: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 12,

    alignSelf: 'flex-start',
  },



  subjectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  taskText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },

  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  BottomTab: {
    position: 'absolute',

    left: 0,
    right: 0,
    marginHorizontal: 16,
    borderRadius: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    zIndex: 1000,
    borderWidth: 0.5,
    overflow: 'hidden',
  },

  BottomTabTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  BottomTabText: {
    fontSize: 14,
    fontWeight: '400',
  },

  BottomTabTextSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: '#939393',
  },

  createButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});