import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDropStore } from '@/store/DragStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { Drop, setDrop } = useDropStore()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ title: 'Статистика', headerShown: false }} />
ƒ
        <Stack.Screen
          name="SendMessage"
          options={{
            presentation: 'modal',
            title: 'Написати лист',
            headerShown: false,
          }}
        />
        <Stack.Screen name="diary" options={{ presentation: 'card', title: 'Щоденик' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
