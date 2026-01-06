import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View, Share, Alert } from 'react-native';
import Animated, { Layout, FadeIn } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/common/ui/Icon';
import GlassView from '@/common/ui/GlassView';
import ContextMenu from '@/common/ui/ContextMenu';
import { useGstyle } from '@/Colors';

const scheduleData = [
    {
        day: 'Понеділок',
        date: '06.01',
        lessons: [
            { id: 1, time: '08:30 - 09:15', name: 'Українська мова', teacher: 'Іванова В.В.', room: '203', type: 'main' },
            { id: 2, time: '09:25 - 10:10', name: 'Математика', teacher: 'Петренко О.І.', room: '305', type: 'main' },
            { id: 3, time: '10:30 - 11:15', name: 'Фізика', teacher: 'Олефіренко С.І.', room: '401', type: 'main' },
            { id: 4, time: '11:35 - 12:20', name: 'Англійська мова', teacher: 'Коваленко М.П.', room: '210', type: 'main' },
            { id: 5, time: '12:30 - 13:15', name: 'Хімія', teacher: 'Сидоренко Л.В.', room: '302', type: 'main' },
        ]
    },
    {
        day: 'Вівторок',
        date: '07.01',
        lessons: [
            { id: 6, time: '08:30 - 09:15', name: 'Алгебра', teacher: 'Петренко О.І.', room: '305', type: 'main' },
            { id: 7, time: '09:25 - 10:10', name: 'Географія', teacher: 'Мельник Т.С.', room: '108', type: 'main' },
            { id: 8, time: '10:30 - 11:15', name: 'Історія України', teacher: 'Ткаченко Н.О.', room: '205', type: 'main' },
            { id: 9, time: '11:35 - 12:20', name: 'Фізкультура', teacher: 'Шевченко А.В.', room: 'Спортзал', type: 'secondary' },
            { id: 10, time: '12:30 - 13:15', name: 'Біологія', teacher: 'Якименко Н.О.', room: '301', type: 'main' },
        ]
    },
    {
        day: 'Середа',
        date: '08.01',
        lessons: [
            { id: 11, time: '08:30 - 09:15', name: 'Українська література', teacher: 'Іванова В.В.', room: '203', type: 'main' },
            { id: 12, time: '09:25 - 10:10', name: 'Геометрія', teacher: 'Петренко О.І.', room: '305', type: 'main' },
            { id: 13, time: '10:30 - 11:15', name: 'Інформатика', teacher: 'Бондаренко В.М.', room: '401', type: 'main' },
            { id: 14, time: '11:35 - 12:20', name: 'Англійська мова', teacher: 'Коваленко М.П.', room: '210', type: 'main' },
        ]
    },
    {
        day: 'Четвер',
        date: '09.01',
        lessons: [
            { id: 15, time: '08:30 - 09:15', name: 'Фізика', teacher: 'Олефіренко С.І.', room: '401', type: 'main' },
            { id: 16, time: '09:25 - 10:10', name: 'Хімія', teacher: 'Сидоренко Л.В.', room: '302', type: 'main' },
            { id: 17, time: '10:30 - 11:15', name: 'Всесвітня історія', teacher: 'Ткаченко Н.О.', room: '205', type: 'main' },
            { id: 18, time: '11:35 - 12:20', name: 'Зарубіжна література', teacher: 'Романенко К.П.', room: '208', type: 'secondary' },
            { id: 19, time: '12:30 - 13:15', name: 'Мистецтво', teacher: 'Савченко О.Л.', room: '105', type: 'secondary' },
        ]
    },
    {
        day: 'Пʼятниця',
        date: '10.01',
        lessons: [
            { id: 20, time: '08:30 - 09:15', name: 'Математика', teacher: 'Петренко О.І.', room: '305', type: 'main' },
            { id: 21, time: '09:25 - 10:10', name: 'Англійська мова', teacher: 'Коваленко М.П.', room: '210', type: 'main' },
            { id: 22, time: '10:30 - 11:15', name: 'Біологія', teacher: 'Якименко Н.О.', room: '301', type: 'main' },
            { id: 23, time: '11:35 - 12:20', name: 'Фізкультура', teacher: 'Шевченко А.В.', room: 'Спортзал', type: 'secondary' },
            { id: 24, time: '12:30 - 13:15', name: 'Класна година', teacher: 'Іванова В.В.', room: '203', type: 'secondary' },
        ]
    },
];

const Schedule = () => {
    const { backgroundColor, isDark, textColor, widgetColor,accentColor } = useGstyle();
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [weekOffset, setWeekOffset] = useState(0);

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setRefreshing(false), 900);
    };

    const shareSchedule = async () => {
        const currentDay = scheduleData[selectedDay];
        let message = `📚 Розклад на ${currentDay.day} (${currentDay.date})\n\n`;

        currentDay.lessons.forEach((lesson, index) => {
            message += `${index + 1}. ${lesson.time}\n`;
            message += `   ${lesson.name}\n`;
            message += `   ${lesson.teacher} • Каб. ${lesson.room}\n\n`;
        });

        try {
            await Share.share({
                message: message,
                title: `Розклад на ${currentDay.day}`,
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
            console.log(error);
        }
    };

    const switchWeek = (direction: 'current' | 'next' | 'prev') => {
        Haptics.selectionAsync();

        if (direction === 'current') {
            setWeekOffset(0);
        } else if (direction === 'next') {
            setWeekOffset(weekOffset + 1);
        } else {
            setWeekOffset(weekOffset - 1);
        }
    };

    const menuItems: any = [
        {
            icon: 'square.and.arrow.up',
            text: 'Поділитися розкладом',
            action: shareSchedule
        },
    ];

    const getGradientColors = (type: string) => {
        if (type === 'secondary') {
            return isDark ? ['#4A4A4A', '#3A3A3A'] : ['#E8E8E8', '#D8D8D8'];
        }
        return isDark ? ['#2C5F8D', '#1E4A6F'] : ['#4A90E2', '#357ABD'];
    };

    const getWeekInfo = () => {
        const baseWeek = 18;
        const currentWeek = baseWeek + weekOffset;

        // Розрахунок дат тижня
        const baseDate = new Date(2026, 0, 6); // 06.01.2026
        const offsetDays = weekOffset * 7;
        const weekStart = new Date(baseDate.getTime() + offsetDays * 24 * 60 * 60 * 1000);
        const weekEnd = new Date(weekStart.getTime() + 4 * 24 * 60 * 60 * 1000);

        const formatDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return `${day}.${month}`;
        };

        return {
            week: currentWeek,
            dateRange: `${formatDate(weekStart)} - ${formatDate(weekEnd)}`
        };
    };

    const weekInfo = getWeekInfo();

    return (
        <SafeAreaView style={{ backgroundColor, flex: 1 }}>
            <View style={[styles.bottomTab, { bottom: bottom + 60 }]}>

                <GlassView isInteractive={true} style={{ padding: 13, borderRadius: 44 }}>
                    <Pressable onPress={() => switchWeek('prev')}>
                        <IconSymbol weight="medium" name="chevron.left" size={29} color={textColor} />
                    </Pressable>
                </GlassView>


                <GlassView isInteractive={true} style={styles.centerInfo}>
                    <Pressable onPress={() => switchWeek('current')}>
                        <View style={styles.centerInfoContent}>
                            <Text style={[styles.centerInfoTop, { color: textColor }]}>
                                Тиждень {weekInfo.week}
                            </Text>
                            <Text style={[styles.centerInfoBottom, { color: isDark ? '#939393' : '#666' }]}>
                                {weekInfo.dateRange}
                            </Text>
                            {weekOffset !== 0 && (
                                <Text style={[styles.currentWeekHint, { color: '#3290ee' }]}>
                                    Натисни для поточного
                                </Text>
                            )}
                        </View>
                    </Pressable>
                </GlassView>

                {/* Наступний тиждень */}
                <GlassView isInteractive={true} style={{ padding: 13, borderRadius: 44 }}>
                    <Pressable onPress={() => switchWeek('next')}>
                        <IconSymbol weight="medium" name="chevron.right" size={29} color={textColor} />
                    </Pressable>
                </GlassView>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, { color: textColor }]}>Розклад</Text>
                        <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                            <GlassView isInteractive={true} style={styles.shareButton}>
                                <IconSymbol weight="medium" name="square.and.arrow.up" size={22} color={textColor} />
                            </GlassView>
                        </ContextMenu>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.daysContainer}
                >
                    {scheduleData.map((day, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setSelectedDay(index);
                                Haptics.selectionAsync();
                            }}
                        >
                            <View
                                style={[
                                    styles.dayChip,
                                    {
                                        backgroundColor: selectedDay === index
                                            ? accentColor
                                            : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayChipText,
                                        {
                                            color: selectedDay === index
                                                ? '#fff'
                                                : textColor,
                                            fontWeight: selectedDay === index ? '700' : '600'
                                        }
                                    ]}
                                >
                                    {day.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.dayChipDate,
                                        {
                                            color: selectedDay === index
                                                ? 'rgba(255,255,255,0.85)'
                                                : (isDark ? '#AAA' : '#666')
                                        }
                                    ]}
                                >
                                    {day.date}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                <View style={styles.lessonsContainer}>
                    {scheduleData[selectedDay].lessons.map((lesson, index) => (
                        <Animated.View
                            key={lesson.id}
                            entering={FadeIn.delay(index * 50)}
                            layout={Layout.springify()}
                        >
                            <Pressable
                                onPress={() => {
                                    Haptics.selectionAsync();
                                    Alert.alert(
                                        lesson.name,
                                        `👨‍🏫 ${lesson.teacher}\n🏫 Кабінет: ${lesson.room}\n⏰ ${lesson.time}`,
                                        [
                                            { text: 'Понял', style: 'cancel' },
                                        ]
                                    );
                                }}
                                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                            >
                                <View
                                    style={[styles.lessonCard, { backgroundColor: widgetColor }]}
                                >
                                    <View style={styles.lessonNumber}>
                                        <Text style={styles.lessonNumberText}>{index + 1}</Text>
                                    </View>

                                    <View style={styles.lessonContent}>
                                        <View style={styles.lessonHeader}>
                                            <Text style={styles.lessonTime}>{lesson.time}</Text>
                                            <View style={styles.roomBadge}>
                                                <IconSymbol name="building.2" size={12} color="#fff" />
                                                <Text style={styles.roomText}>{lesson.room}</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.lessonName} numberOfLines={1}>
                                            {lesson.name}
                                        </Text>

                                        <View style={styles.teacherRow}>
                                            <IconSymbol name="person.circle" size={14} color="rgba(255,255,255,0.7)" />
                                            <Text style={styles.teacherText} numberOfLines={1}>
                                                {lesson.teacher}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 16,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    shareButton: {
        padding: 10,
        borderRadius: 30,
    },
    currentWeekHint: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: 2,
    },
    daysContainer: {
        paddingHorizontal: 16,
        gap: 10,
        marginBottom: 20,
    },
    dayChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        minWidth: 120,
        alignItems: 'center',
    },
    dayChipText: {
        fontSize: 15,
        marginBottom: 2,
    },
    dayChipDate: {
        fontSize: 12,
    },
    lessonsContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    lessonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        gap: 12,
    },
    lessonNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonNumberText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    lessonContent: {
        flex: 1,
        gap: 6,
    },
    lessonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lessonTime: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        fontWeight: '500',
    },
    roomBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    roomText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    lessonName: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    teacherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    teacherText: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    bottomTab: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginHorizontal: 22,
        borderRadius: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
    },
    centerInfo: {
        padding: 12,
        borderRadius: 44,
        minWidth: 160,
    },
    centerInfoContent: {
        alignItems: 'center',
    },
    centerInfoTop: {
        fontSize: 14,
        fontWeight: '600',
    },
    centerInfoBottom: {
        fontSize: 12,
        fontWeight: '400',
    },
});

export default Schedule;