import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SymbolViewProps } from 'expo-symbols';
import ContextMenu from '@/components/ui/ContextMenu';

export default function SendMessage() {
  const { gstyles, BackgroundColorModal, isDark, accentColor } = useGstyle();
  const [subject, setSubject] = useState('');
  const [theme, setTheme] = useState('Новий лист');
  const [message, setMessage] = useState('');
  const [IsReady, setIsReady] = useState(false);

  const [receiverType, setReceiverType] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (subject.trim().length === 0) {
      setTheme('Новий лист');
      setIsReady(false);
    } else {
      setTheme(subject);
      setIsReady(true);
    }
  }, [subject]);

  const receiverTypeMenu: { text: string; icon: SymbolViewProps['name'] }[] = [
    { text: 'Учні свого класу', icon: 'person.3.sequence.fill' },
    { text: 'Вчителі', icon: 'person.crop.rectangle.stack.fill' },
  ];

  const studentsMenu: { text: string; icon: SymbolViewProps['name'] }[] = [
    { text: 'Іван Петренко', icon: 'person' },
    { text: 'Марія Коваль', icon: 'person' },
    { text: 'Антон Лоза', icon: 'person' },
  ];

  const teachersMenu: { text: string; icon: SymbolViewProps['name'] }[] = [
    { text: 'Вчитель: Математика', icon: 'person.crop.circle' },
    { text: 'Вчитель: Українська', icon: 'person.crop.circle' },
    { text: 'Вчитель: Фізика', icon: 'person.crop.circle' },
  ];

  const selectedList = receiverType === 'Учні свого класу' ? studentsMenu : teachersMenu;

  const sendMail = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Відправлено:', { subject, message, receiver, receiverType });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: BackgroundColorModal }}>

      <View style={styles.grabberWrapper}>
        <View style={styles.grabber} />
      </View>


      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Скасувати</Text>
      </TouchableOpacity>




      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View entering={FadeInDown.delay(120)} style={styles.container}>

          <View style={styles.topBar}>
            <Text style={[styles.title, gstyles.color]}>{theme}</Text>

            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: IsReady ? accentColor : 'rgba(100,100,100,0.7)' }
              ]}
              onPress={sendMail}
              disabled={!IsReady}
            >
              <IconSymbol
                name="arrow.up"
                size={22}
                color={BackgroundColorModal}
                weight="bold"
              />
            </TouchableOpacity>
          </View>


          <Text style={styles.label}>Кому:</Text>

          <ContextMenu onPress={(item) => {
            setReceiverType(item.text);
            setReceiver(null);
            setIsReady(false);
          }} Menu={receiverTypeMenu}>
            <View
              style={[
                styles.inputRow,
                {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(0,0,0,0.05)'
                }
              ]}
            >
              <Text style={[styles.inputText, gstyles.color]}>
                {receiverType ?? 'Кому відправити?'}
              </Text>
              <IconSymbol name="chevron.down" size={18} color="#888" />
            </View>
          </ContextMenu>

          {receiverType && (
            <ContextMenu style={{ marginTop: 10 }} onPress={(item) => {
              setReceiver(item.text);
              setIsReady(true);
            }} Menu={selectedList}>
              <View
                style={[
                  styles.inputRow,
                  {
                    backgroundColor: isDark
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(0,0,0,0.05)'
                  }
                ]}
              >
                <Text style={[styles.inputText, gstyles.color]}>
                  {receiver ?? 'Оберіть отримувача'}
                </Text>
                <IconSymbol name="chevron.down" size={18} color="#888" />
              </View>
            </ContextMenu>
          )}


          <View
            style={[
              styles.subjectWrapper,
              { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)', marginTop: 10 }
            ]}
          >
            <Text style={styles.label}>Тема:</Text>
            <TextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholderTextColor="#8e8e93"
              style={[styles.input, gstyles.color]}
            />
          </View>


          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor="#8e8e93"
            style={[
              styles.textarea, gstyles.color,
              {
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
              }
            ]}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  grabberWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5
  },
  grabber: {
    backgroundColor: '#696969',
    width: 33,
    height: 5,
    borderRadius: 30
  },
  cancelBtn: {
    position: 'absolute',
    top: 17,
    left: 17
  },
  cancelText: {
    fontSize: 17,
    color: '#2D8FF2',
    fontWeight: '400'
  },
  container: {
    borderRadius: 24,
    padding: 20,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    marginTop: 38
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 4,
    flexShrink: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
    flexShrink: 1,
    maxWidth: '80%'
  },
  sendButton: {
    width: 38,
    height: 38,
    maxWidth: 38,
    maxHeight: 38,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 0,
    overflow: 'hidden',
  },
  label: {
    color: '#AAA',
    fontSize: 14,
    marginRight: 6,
    marginBottom: 6
  },
  inputRow: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputText: {
    fontSize: 16
  },
  subjectWrapper: {
    borderTopWidth: 0.3,
    paddingTop: 14,
    marginBottom: 10,
    flexDirection: 'row'
  },
  input: {
    color: 'white',
    fontSize: 16,
    width: '100%',
  },
  textarea: {
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    height: 500,
    borderTopWidth: 0.3,



  }
});