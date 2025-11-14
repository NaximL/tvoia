import { useGstyle } from '@/Colors';
import Button from '@/components/ui/buttons/button';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function SendMessage() {
  const { backgroundColor, isDark } = useGstyle();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const sendMail = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Відправлено:', { subject, message });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{
        width: "100%",
        alignItems: "center",
        top: 5
      }}>
        <View style={{
          backgroundColor: "#696969",
          width: 33,
          height: 5,
          borderRadius: 30,

        }}></View>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{
          position: "absolute",
          top: 17,
          left: 17,
          fontSize: 17,
          fontWeight: 400,
          color: "#2D8FF2"
        }}>Скасувати</Text>
      </TouchableOpacity>




      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >



        {/* <ScrollView contentContainerStyle={{ padding: 16 }}> */}
        <BlurView
          intensity={isDark ? 35 : 70}
          tint={isDark ? 'dark' : 'light'}
          style={styles.modalCard}
        >
          <Text style={styles.title}>Новий лист</Text>

          <Text style={styles.label}>Тема</Text>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder="Введіть тему"
            placeholderTextColor={isDark ? '#AAA' : '#888'}
            style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
          />

          <Text style={styles.label}>Повідомлення</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Введіть текст листа"
            placeholderTextColor={isDark ? '#AAA' : '#888'}
            multiline
            style={[styles.textArea, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
          />

          <Button
            style={styles.sendButton}
            One="#2D8FF2"
            Two="#37A0E0"
            Press={sendMail}
          >
            <Text style={styles.sendText}>Відправити</Text>
            <IconSymbol name="paperplane.fill" size={20} color="white" />
          </Button>
        </BlurView>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({

  modalCard: {
    borderRadius: 24,
    padding: 20,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: 'white',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
    color: '#AAA',
  },
  input: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: 'white',
  },
  textArea: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'white',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 24,
    height: 80,
  },
  sendText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,

  },
});