import { useGstyle } from '@/Colors';
import { Stack } from 'expo-router';

export default function ModalLayout() {
  const { BackgroundColorModal, textColor } = useGstyle();
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
        headerStyle: {
          backgroundColor: BackgroundColorModal,
        },
        headerTitleStyle: {
          color: textColor
        }
      }}
    />
  );
}