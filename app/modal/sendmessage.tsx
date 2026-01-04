import { useGstyle } from '@/Colors';
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
import { SymbolViewProps } from 'expo-symbols';
import { IconSymbol } from '@/common/ui/Icon';
import GlassView from '@/common/ui/GlassView';
import ContextMenu from '@/common/ui/ContextMenu';
// import ContextMenu from '@/components/ui/ContextMenu';

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

      <View style={{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 20
      }}>
        <GlassView isInteractive={true} style={{
          backgroundColor: "rgba(100,100,100,0.7)",
          borderRadius: 44,
          width: 43,
          height: 43,
          justifyContent: "center"
        }}>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.back()}>
            <IconSymbol name="xmark" size={24} color="#fff" />
          </TouchableOpacity>
        </GlassView>

        <GlassView
          tint={IsReady ? accentColor : 'rgba(100,100,100,0.7)'}
          isInteractive={true} style={{
            borderRadius: 44,
            width: 43,
            height: 43,
            justifyContent: "center"
          }}>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.back()}>
            <IconSymbol
              name="arrow.up"
              size={28}
              color={IsReady ? "#e8e8e8ff" : "#71717181"}
              weight="medium"
            />
          </TouchableOpacity>
        </GlassView>
      </View>



      <KeyboardAvoidingView
        style={[{ flex: 1 }, styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* <View style={ }> */}
        <View style={styles.topBar}>
          <Text style={[styles.title, gstyles.color]}>{theme}</Text>


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

      </KeyboardAvoidingView>
    </View >
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
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 4,
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
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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