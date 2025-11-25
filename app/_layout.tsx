import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGstyle } from '@/Colors';

export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { BackgroundColorModal } = useGstyle();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Modals/SendMessage" options={{
          presentation: 'modal', headerShown: false,
          headerStyle: { backgroundColor: BackgroundColorModal }
        }} />
        <Stack.Screen name="Modals/diary" options={{
          presentation: 'modal', title: 'Щоденик',
          headerStyle: { backgroundColor: BackgroundColorModal }
        }} />
        <Stack.Screen name="Modals/homeworkmodal" options={{
          presentation: 'modal', title: 'Домашка',
          headerStyle: { backgroundColor: BackgroundColorModal }
        }} />
        <Stack.Screen name="Modals/Message" options={{
          presentation: 'card', title: 'Повідомлення',
          headerStyle: { backgroundColor: BackgroundColorModal },
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}