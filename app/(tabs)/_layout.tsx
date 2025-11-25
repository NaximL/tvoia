import { Tabs } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { useGstyle } from '@/Colors';
import { Pressable, Animated, Text, Dimensions } from 'react-native';
import { SymbolViewProps } from 'expo-symbols';
import useDragStore, { useDropStore } from '@/store/DragStore';
import { Header } from '@/components/ui/Header';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';

type ContextMenuItem = {
  icon: SymbolViewProps['name'];
  text: string;
  action: () => void
}

type Pages = {
  name: string;
  title: string;
  icon: SymbolViewProps['name'];
  icon_focus: SymbolViewProps['name'];
  menuItems?: Array<ContextMenuItem>
}

export default function TabLayout() {

  const { backgroundColor, NavBarTint, accentColor } = useGstyle();
  const { Drag, setDrag } = useDragStore();
  const { Drop, setDrop } = useDropStore();


  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: Drop ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [Drop]);

  const animatedStyle: any = {
    fontSize: animValue.interpolate({ inputRange: [0, 1], outputRange: [18, 20] }),
    color: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [accentColor, '#fff']
    }),
    fontWeight: '600',

  };

  const HeaderTop = (item: any) => {

    return (
      <View style={{ zIndex: 10000 }} >

        <Pressable style={{ padding: 5 }} onPress={() => {
          setDrop(!Drop);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}>
          <Animated.Text style={animatedStyle}>
            {item.title}
          </Animated.Text>
        </Pressable>

        <Header menuItems={item.menuItems} />
      </View>
    );
  };

  const Pages: Array<Pages> = [
    {
      name: "index",
      title: "Статистика",
      icon: "house",
      icon_focus: "house.fill",
      menuItems: [
        {
          icon: 'arrow.up.arrow.down',
          text: Drag ? 'Готово' : 'Змінити порядок',
          action: () => {
            setDrag(!Drag);
            setDrop(!Drop);
          }
        },
        // { icon: 'plus', text: 'Додати', action: () => alert('Додати виджети') },
        { icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },
      ]
    },
    { name: "homework", title: "Завдання", icon: "doc.text", icon_focus: "doc.text.fill", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
    { name: "messages/Messages", title: "Листи", icon: "envelope", icon_focus: "envelope.fill", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
    { name: "schedule", title: "Розклад", icon: "calendar", icon_focus: "calendar", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
  ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: NavBarTint,
        tabBarButton: HapticTab,
        headerShown: false,
      }}
    >


      {Pages.map(screen =>
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{

            title: screen.title,
            headerTitle: () => HeaderTop(screen),
            tabBarIcon: ({ color, focused }) =>
              <IconSymbol size={28} name={focused ? screen.icon_focus : screen.icon} color={color} />,
          }}
        />
      )}

    </Tabs>
  );
}