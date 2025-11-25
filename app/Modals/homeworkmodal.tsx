// HomeworkScreen.tsx
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Linking } from 'react-native';
import { useGstyle } from '@/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import RenderHTML from 'react-native-render-html';

interface HomeworkScreenParams {
    subject: string;
    task: string;
    files?: string[];
}

export default function HomeworkScreen() {
    const { isDark, accentColor, BackgroundColorModal, gstyles } = useGstyle();
    const { width } = useWindowDimensions();
    const router = useRouter();
    const params = useLocalSearchParams<HomeworkScreenParams>();
    const { subject, task, files } = params;

    useEffect(() => {
        router.setOptions?.({
            title: subject || 'Домашнє завдання',
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.headerBackContainer}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={22} color={accentColor} />
                </TouchableOpacity>
            ),
        });
    }, [router, subject]);

    if (!subject || !task) return null;

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: BackgroundColorModal }]}>
            <BlurView intensity={50} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />

            <View style={styles.section}>
                <Text style={[styles.label, { color: accentColor }]}>Предмет:</Text>
                <Text style={[styles.value, gstyles.color]}>{subject}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.label, { color: accentColor }]}>Завдання:</Text>
                <View style={styles.bodyContainer}>
                    <RenderHTML
                        contentWidth={width - 40}
                        source={{ html: `<p>${task}</p>` }}
                        baseStyle={{ color: gstyles.color.color, fontSize: 16, lineHeight: 24 }}
                    />
                </View>
            </View>

            {files && files.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.label, { color: accentColor }]}>Додані файли:</Text>
                    {files.map((file, i) => (
                        <TouchableOpacity key={i} onPress={() => Linking.openURL(file)}>
                            <Text style={[styles.attachment, { color: accentColor }]}>{file.split('/').pop()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20 },
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
});