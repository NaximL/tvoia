import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { GlassView } from 'expo-glass-effect';
import { TextInput } from 'react-native';
import { useGstyle } from '@/Colors';

import { IconSymbol } from '@/components/ui/icon/Ios';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ContextMenu from '@/components/ui/ContextMenu';
import BottomMenu from '@/components/ui/BottomMenu';


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
    const { backgroundColor, isDark, SearchBarColor, textColor } = useGstyle();
    const { bottom } = useSafeAreaInsets();

    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const [Vhid, setVhid] = useState(0);
    const onRefresh = () => {
        setRefreshing(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setRefreshing(false), 900);
    };
    const menuItems: any = [
        { icon: 'arrow.up.arrow.down', text: 'Всі повідомлення', action: () => alert('Показати всі') },
        { icon: 'envelope.open', text: 'Непрочитані', action: () => alert('Фільтр: непрочитані') },
        { icon: 'checkmark.seal', text: 'Позначити як прочитані', action: () => alert('Позначено як прочитані') },
        { icon: 'trash', text: 'Видалити обране', action: () => alert('Видалено') },
        { icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування фільтрів') },
    ]

    const Vhud: any = [
        { icon: 'tray', iconSelected: 'checkmark', text: 'Вхідні', action: () => alert('Показати всі') },
        { icon: 'paperplane', iconSelected: 'checkmark', text: 'Вихідні', action: () => alert('Показати відправлені') },
    ];



    return (
        <SafeAreaView style={{ backgroundColor, flex: 1 }}>

            <BottomMenu menuItems={menuItems} />
            {/* <GlassView
                style={
                    [styles.BottomTab,
                    {
                        bottom: bottom + 55,
                        // borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0, 0, 0, 0.1)',
                        // backgroundColor: isDark ? 'rgba(60, 60, 60, 0.165)' : 'rgba(255, 255, 255, 0.5)',

                    }]}
            >
                <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
                    <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                        <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color={accentColor} />
                    </ContextMenu>
                </Pressable>
                <View style={styles.BottomTabTextContainer}>
                    <Text style={[styles.BottomTabText, { color: textColor }]}>Оновлено щойно</Text>
                    <Text style={styles.BottomTabTextSmall}>10 непрочитаних</Text>
                </View>
                <Pressable onPress={() => router.push('/Modals/SendMessage')}>
                    <IconSymbol name="square.and.pencil" size={28} color={accentColor} />
                </Pressable>
            </GlassView> */}



            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                <View style={{
                    alignItems: 'flex-start',
                    marginTop: 16,
                    marginHorizontal: 16,
                }}>
                    <ContextMenu Menu={Vhud} onPress={(item: any, index: any) => { setVhid(index); item.action() }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Text style={[styles.sectionTitle, { color: textColor }]}>{Vhud[Vhid].text}</Text>
                            {/* <IconSymbol name="chevron.down" weight="bold" size={20} color={textColor} /> */}
                        </View>
                    </ContextMenu>
                </View>

                <View style={[styles.searchBar, { backgroundColor: SearchBarColor }]}>
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
                    </View>
                </View>
                <View style={{
                    left: 0,
                    right: 0,
                    marginLeft: 16,
                    height: 1,
                    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }}></View>

                {
                    messages.map((msg) => (
                        <Animated.View
                            key={msg.id}
                            entering={ZoomIn.springify()}
                            exiting={ZoomOut.springify()}
                            layout={Layout.springify()}
                        >
                            <Pressable
                                onPress={() => { Haptics.selectionAsync(); router.push("/Modals/Message") }}
                                style={({ pressed }) => ([, { opacity: pressed ? 0.85 : 1 }])}
                            >

                                <View style={styles.unreadDotContainer}>
                                    {!msg.isRead && (
                                        //@ts-ignore
                                        <LinearGradient colors={gradientsNoRead} style={styles.unreadDot} />
                                    )}
                                </View>
                                <View style={[styles.card, { borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : "rgba(44, 44, 44, 0.1)" }, styles.cardContainer]}>
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
                                            <IconSymbol name="chevron.forward" weight='bold' size={16} color={isDark ? '#606060' : '#66666666'} />
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
                    ))
                }
            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    cancelBtn: {

    },
    cancelText: {
        fontSize: 17,
        color: '#2D8FF2',
        fontWeight: '400'
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "white",
    },
    searchBar: {
        //#2f2e33
        // backgroundColor: '#1c1c1e',

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
        left: 2,
        top: 21,
        width: 16,
        alignItems: 'center',
    },
    card: {
        gap: 4,
        marginLeft: 18,
        borderBottomWidth: 0.8,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,

    },

    unreadDot: {
        width: 9,
        height: 9,
        borderRadius: 10,
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

        left: 0,
        right: 0,
        marginHorizontal: 22,
        borderRadius: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        zIndex: 1000,
        // borderWidth: 0.5,
        // overflow: 'hidden',
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