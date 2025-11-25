import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useGstyle } from '@/Colors';
import { useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon/Ios';
import RenderHTML from 'react-native-render-html';

const message = {
    id: 2,
    sender: 'Іванова Вікторія Віталіївна',
    topic: 'Завдання на урок',
    pred: 'Фізика',
    date: 'Пʼятниця, 12:28',
    content: `
    <p>Привіт! Це приклад повідомлення.</p>
    <p>Можна вставляти <b>жирний текст</b>, <i>курсив</i> та <u>підкреслений</u> текст.</p>
    <p>І навіть <a href="https://example.com">посилання</a>.</p>
  `,
    isRead: false,
    attachments: [
        { name: 'Файл1.pdf', url: '#' },
        { name: 'Завдання.docx', url: '#' },
    ],
};

export default function FullMessageVisual() {
    const { isDark, accentColor, BackgroundColorModal,gstyles } = useGstyle();
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: message.topic,
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.headerBackContainer}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={22} color={accentColor} />
                    {!message.isRead && (
                        <View style={styles.unreadDots}>
                            <Text style={styles.unreadText}>11</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: BackgroundColorModal }]}>
            
            <View style={styles.header}>
                <Text style={[styles.topicText, gstyles.color]}>{message.topic}</Text>
                <Text style={[styles.dateText, { color: isDark ? '#AAA' : '#666' }]}>{message.date}</Text>
            </View>

            
            <View style={styles.section}>
                <Text style={[styles.label, { color: accentColor }]}>Від:</Text>
                <Text style={[styles.value, gstyles.color]}>{message.sender}</Text>
            </View>

            
            <View style={styles.section}>
                <Text style={[styles.label, { color: accentColor }]}>Предмет:</Text>
                <Text style={[styles.value, gstyles.color]}>{message.pred}</Text>
            </View>
            
            <View style={styles.section}>
                <Text style={[styles.label, { color: accentColor }]}>Повідомлення:</Text>
                <View style={styles.bodyContainer}>
                    <RenderHTML
                        contentWidth={width - 40}
                        source={{ html: message.content }}
                        baseStyle={{ color: gstyles.color.color, fontSize: 16, lineHeight: 24 }}
                        tagsStyles={{
                            a: { color: '#3290ee', textDecorationLine: 'underline' },
                        }}
                    />
                </View>
            </View>

            {message.attachments.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.label, { color: accentColor }]}>Додані файли:</Text>
                    {message.attachments.map((file, i) => (
                        <Text key={i} style={[styles.attachment, { color: accentColor }]}>{file.name}</Text>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20 },
    header: { marginBottom: 20 },
    topicText: { fontSize: 24, fontWeight: '700' },
    dateText: { fontSize: 13, marginTop: 4 },
    section: { marginBottom: 24 },
    label: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
    value: { fontSize: 16 },
    bodyContainer: { position: 'relative' },
    attachment: { fontSize: 15, marginVertical: 4, textDecorationLine: 'underline' },
    headerBackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 10,
    },
    unreadDots: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',

        left: 24,
        backgroundColor: '#3290ee',
        paddingHorizontal: 7,
        paddingVertical: 2.5,
        borderRadius: 10,
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});