import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';


import { useGstyle } from '@/Colors';
import Button from '@/components/ui/buttons/button';
import { IconSymbol } from '@/components/ui/icon/Ios';

const messages = [
    { id: 1, sender: 'Олефіренко Світлана Іванівна', topic: 'Колоквіум', date: '11.11.2025 13:04', isRead: true },
    { id: 2, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', date: '11.11.2025 12:28', isRead: true },
    { id: 3, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', date: '07.11.2025 11:10', isRead: false },
    { id: 4, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', date: '07.11.2025 08:00', isRead: true },
];

const gradientsNoRead = ['#FF4B4B', '#ec647f'];

export default function MessagesScreen() {
    const { backgroundColor, isDark } = useGstyle();
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setRefreshing(false), 900);
    };

    return (
        <View style={{ backgroundColor, flex: 1 }}>

            <Button
                style={styles.fab}
                One="#898989"
                Two="#545454"
                Press={() => router.push('/SendMessage')}
            >
                <IconSymbol name="square.and.pencil" size={26} color="white" />
            </Button>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {messages.map((msg) => (
                    <Animated.View
                        key={msg.id}
                        entering={ZoomIn.springify()}
                        exiting={ZoomOut.springify()}
                        layout={Layout.springify()}
                        style={{ marginBottom: 12 }}
                    >
                        <Pressable
                            onPress={() => Haptics.selectionAsync()}
                            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                        >
                            <BlurView
                                intensity={isDark ? 35 : 70}
                                tint={isDark ? 'dark' : 'light'}
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor: "#1d1d23",
                                        borderColor: isDark
                                            ? 'rgba(255,255,255,0.07)'
                                            : 'rgba(0,0,0,0.05)',
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    {!msg.isRead && (
                                        //@ts-ignore
                                        <LinearGradient colors={gradientsNoRead} style={styles.unreadDot} />
                                    )}
                                    <Text
                                        style={[
                                            styles.sender,
                                            { color: isDark ? '#fff' : '#212121' },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {msg.sender}
                                    </Text>
                                </View>

                                <Text style={[styles.topic, { color: isDark ? '#E7E7E7' : '#1A1A1F' }]}>
                                    {msg.topic}
                                </Text>

                                <Text style={[styles.date, { color: isDark ? '#AAA' : '#666' }]}>
                                    {msg.date}
                                </Text>
                            </BlurView>
                        </Pressable>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 54,
        height: 54,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,

        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },

    card: {
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        overflow: 'hidden',

        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 14,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },

    unreadDot: {
        width: 14,
        height: 14,
        borderRadius: 8,
    },

    sender: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
    },

    topic: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },

    date: {
        fontSize: 13,
        fontWeight: '400',
    },
});