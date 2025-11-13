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
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Header } from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { useGstyle } from '@/Colors';

const messages = [
    { id: 1, sender: 'Олефіренко Світлана Іванівна', topic: 'Колоквіум', date: '11.11.2025 13:04', isRead: true },
    { id: 2, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', date: '11.11.2025 12:28', isRead: true },
    { id: 3, sender: 'Якименко Наталія Олегівна', topic: 'УЛ_10М_07_11', date: '07.11.2025 11:10', isRead: false },
    { id: 4, sender: 'Іванова Вікторія Віталіївна', topic: 'Завдання на урок', date: '07.11.2025 08:00', isRead: true },
];

const gradientsRead = ['#2D8FF2', '#4fb3e1']; 
const gradientsNoRead = ['#FF4B4B', '#ec647f'];


const MessagesScreen = () => {
    const { backgroundColor, isDark } = useGstyle();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <Header
                Textheader="Повідомлення"
                menuItems={[{ icon: 'arrow.clockwise', text: 'Оновити', action: onRefresh }]}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ padding: 16 }}
            >
                {messages.map((msg) => (
                    <Animated.View
                        key={msg.id}
                        entering={ZoomIn.springify()}
                        exiting={ZoomOut.springify()}
                        layout={Layout.springify()}
                        style={{ marginBottom: 12 }}
                    >
                        <Pressable onPress={() => Haptics.selectionAsync()}>
                            <BlurView
                                intensity={isDark ? 25 : 70}
                                tint={isDark ? 'dark' : 'light'}
                                style={[
                                    styles.card,
                                    {
                                        borderColor: isDark
                                            ? 'rgba(255,255,255,0.08)'
                                            : 'rgba(0,0,0,0.05)',
                                    },
                                ]}
                            >
                                <LinearGradient
                                    /*@ts-ignore*/
                                    colors={msg.isRead ? gradientsRead : gradientsNoRead}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.bubble}
                                >
                                    <Text style={styles.sender}>{msg.sender}</Text>
                                </LinearGradient>

                                <Text style={[styles.topic, { color: isDark ? '#E7E7E7' : '#1A1A1F' }]}>{msg.topic}</Text>
                                <Text style={[styles.date, { color: isDark ? '#AAA' : '#555' }]}>{msg.date}</Text>
                            </BlurView>
                        </Pressable>
                    </Animated.View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 16,
        overflow: 'hidden',
        borderWidth: 1,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
    },
    bubble: {
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 5,
    },
    sender: { fontSize: 14, fontWeight: '600', color: '#fff' },
    topic: { fontSize: 16, fontWeight: '500', lineHeight: 22, marginBottom: 4 },
    date: { fontSize: 13, fontWeight: '400' },
});