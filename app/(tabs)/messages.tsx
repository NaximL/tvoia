import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { TextInput } from 'react-native';
import { useGstyle } from '@/Colors';
import Button from '@/components/ui/buttons/button';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { SafeAreaView } from 'react-native-safe-area-context';

const messages = [
    { id: 1, sender: 'Олефіренко Світлана Іванівна', topic: 'Колоквіум', pred: "Фізика", date: 'Учора', isRead: true },
    { id: 2, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: 'Пʼятниця, 12:28', isRead: true },
    { id: 3, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', pred: "Фізика", date: '07.11, 11:10', isRead: false },
    { id: 4, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: '07.11, 00:00', isRead: true },
    { id: 5, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: 'Пʼятниця, 12:28', isRead: true },
    { id: 6, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', pred: "Фізика", date: '07.11, 11:10', isRead: false },
    { id: 7, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: '07.11, 00:00', isRead: true },
    { id: 8, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: 'Пʼятниця, 12:28', isRead: true },
    { id: 9, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', pred: "Фізика", date: '07.11, 11:10', isRead: false },
    { id: 10, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: '07.11, 00:00', isRead: true },
    { id: 11, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: 'Пʼятниця, 12:28', isRead: true },
    { id: 12, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', pred: "Фізика", date: '07.11, 11:10', isRead: false },
    { id: 13, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', pred: "Фізика", date: '07.11, 00:00', isRead: true },
];

const gradientsNoRead = ['#3290ee', '#2985e1'];

export default function MessagesScreen() {
    const { backgroundColor, isDark, accentColor } = useGstyle();
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setRefreshing(false), 900);
    };

    return (
        <SafeAreaView style={{ backgroundColor, flex: 1 }}>

            <BlurView tint={isDark ? 'dark' : 'light'} intensity={30} style={styles.BottomTab}>
                <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color={accentColor} />

                <View style={styles.BottomTabTextContainer}>
                    <Text style={styles.BottomTabText}>Оновлено щойно</Text>
                    <Text style={styles.BottomTabTextSmall}>10 непрочитаних</Text>
                </View>
                <Pressable onPress={() => router.push('/SendMessage')}>
                    <IconSymbol name="square.and.pencil" size={28} color={accentColor} />
                </Pressable>
            </BlurView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                <View>
                    <Text style={styles.sectionTitle}>Вхідні</Text>

                    <View style={styles.searchBar}>
                        <View style={styles.searchInner}>
                            <IconSymbol
                                name="magnifyingglass"
                                size={18}
                                color={isDark ? "#9d9d9d" : "#6c6c6c"}
                            />

                            <TextInput
                                style={[styles.searchInput, { color: isDark ? "#fff" : "#000" }]}
                                placeholder="Пошук"
                                placeholderTextColor={isDark ? "#8e8e93" : "#8e8e93"}
                                onChangeText={(text) => console.log(text)}
                            />

                            {/* <Pressable onPress={() => console.log("clear")}>
                                <IconSymbol
                                    name="xmark.circle.fill"
                                    size={18}
                                    color={isDark ? "#5c5c5c" : "#c1c1c1"}
                                />
                            </Pressable> */}

                        </View>
                    </View>
                    <View style={{
                        left: 0,
                        right: 0,
                        marginLeft: 16,
                        height: 1,
                        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                    }}></View>
                </View>
                {messages.map((msg) => (
                    <Animated.View
                        key={msg.id}
                        entering={ZoomIn.springify()}
                        exiting={ZoomOut.springify()}
                        layout={Layout.springify()}

                    >
                        <Pressable
                            onPress={() => Haptics.selectionAsync()}
                            style={({ pressed }) => ([, { opacity: pressed ? 0.85 : 1 }])}
                        >
                            <View style={styles.unreadDotContainer}>
                                {!msg.isRead && (
                                    //@ts-ignore
                                    <LinearGradient colors={gradientsNoRead} style={styles.unreadDot} />
                                )}
                            </View>
                            <View style={[styles.card, styles.cardContainer]}>
                                <View style={styles.row}>
                                    <Text
                                        style={[
                                            styles.sender,
                                            { color: isDark ? '#fff' : '#212121' },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {msg.sender}
                                    </Text>
                                    <View style={styles.dateConteiner}>
                                        <Text style={[styles.dateText, { color: isDark ? '#AAA' : '#666' }]}>
                                            {msg.date}
                                        </Text>
                                        <IconSymbol name="chevron.forward" weight='bold' size={16} color={isDark ? '#606060' : '#666'} />
                                    </View>
                                </View>
                                <Text style={[styles.topic, { color: isDark ? '#E7E7E7' : '#1A1A1F' }]}>
                                    {msg.topic}
                                </Text>
                                <Text style={[styles.topic, { fontWeight: '500', color: isDark ? '#E7E7E7' : '#1A1A1F' }]}>
                                    {msg.pred}
                                </Text>
                            </View>
                        </Pressable>
                    </Animated.View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "white",
        marginTop: 16,
        marginLeft: 16,
    },
    searchBar: {
        backgroundColor: '#1c1c1e',
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
        borderRadius: 12,

    },

    searchInner: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
    },

    cardContainer: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
    },
    unreadDotContainer: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: 16,
        alignItems: 'center',
    },
    card: {
        borderBottomWidth: 1,
        gap: 4,
        marginLeft: 18,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,

    },

    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 8,
    },

    sender: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
    },

    topic: {
        fontSize: 14,
        fontWeight: '600',
    },
    dateConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    dateText: {
        fontSize: 13,
        fontWeight: '400',
    },

    BottomTab: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        marginHorizontal: 10,
        borderRadius: 18,
        height: 50,
        backgroundColor: '#3c3c3c2a',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        zIndex: 1000,
        borderWidth: 0.5,
        overflow: 'hidden',
        borderColor: 'rgba(255,255,255,0.07)',
    },
    BottomTabTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomTabText: {
        fontSize: 14,
        fontWeight: '400',
        color: "#fff",
    },
    BottomTabTextSmall: {
        fontSize: 12,
        fontWeight: '400',
        color: "#939393",
    },
});