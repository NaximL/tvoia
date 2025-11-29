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
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

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
    <NativeTabs
      tintColor={NavBarTint}
      disableTransparentOnScrollEdge={true}
      
    >


      {Pages.map(screen =>
        <NativeTabs.Trigger
          key={screen.name}
          name={screen.name}
        >
          <Label>{screen.title}</Label>
          <Icon sf={{ default: screen.icon, selected: screen.icon_focus }} />
        </NativeTabs.Trigger>
      )
      }

    </NativeTabs >
  );
}