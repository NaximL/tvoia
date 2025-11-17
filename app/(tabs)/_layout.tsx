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

  const { gstyles, NavBarTint, accentColor } = useGstyle();
  const { Drag, setDrag } = useDragStore();


  const HeaderTop = (item: any) => {

    return (
      <View style={{ zIndex: 10000 }} >
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
          }
        },
        // { icon: 'plus', text: 'Додати', action: () => alert('Додати виджети') },
        { icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },
      ]
    },
    { name: "homework", title: "Завдання", icon: "doc.text", icon_focus: "doc.text.fill", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
    { name: "messages", title: "Листи", icon: "envelope", icon_focus: "envelope.fill", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
    { name: "schedule", title: "Розклад", icon: "calendar", icon_focus: "calendar", menuItems: [{ icon: 'gear', text: 'Налаштування', action: () => alert('Налаштування виджетів') },] },
  ]

  return (


    <NativeTabs
    // screenOptions={{
    //   headerStyle: gstyles.back,
    //   tabBarActiveTintColor: NavBarTint,
    //   tabBarButton: HapticTab,
    // }}
    >


      {Pages.map(screen =>
        <NativeTabs.Trigger
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,

            // headerRight: () => HeaderTop(screen),
            // headerTitle: () =>
            // tabBarIcon: ({ color, focused }) =>
            // <IconSymbol size={28} name={focused ? screen.icon_focus : screen.icon} color={color} />,
          }}
        >
          

          <Icon sf={{ default: screen.icon, selected: screen.icon_focus }} />
          <Label>{screen.title}</Label>
        </NativeTabs.Trigger>
      )}
    </NativeTabs>


  );
}