import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Main app (tabs inside) */}
        <Stack.Screen name="main" />

        {/* Modals */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}