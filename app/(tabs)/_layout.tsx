import React, { useRef, useEffect, useState } from 'react';
import { Pressable, Animated, Text, Platform, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { useGstyle } from '@/Colors';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

const Pages: any[] = [
  { name: 'index', title: 'Статистика', icon: 'house', icon_focus: 'house.fill' },
  { name: 'homework', title: 'Завдання', icon: 'doc.text', icon_focus: 'doc.text.fill' },
  { name: 'messages/Messages', title: 'Листи', icon: 'envelope', icon_focus: 'envelope.fill' },
  { name: 'schedule', title: 'Розклад', icon: 'calendar', icon_focus: 'calendar' },
];

export default function TabLayout() {
  const { NavBarTint, accentColor, isDark, LiquidGlass } = useGstyle();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bubbleAnim, {
      toValue: selectedIndex,
      useNativeDriver: true,
      stiffness: 180,
      damping: 20,
      mass: 0.5,
    }).start();
  }, [selectedIndex]);

  const handlePress = (index: number, originalPress?: any) => {
    setSelectedIndex(index);
    originalPress?.();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const onLayoutTab = (e: any) => setTabWidth(e.nativeEvent.layout.width);



  return (
    LiquidGlass ?
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {

              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 32,
              marginHorizontal: 20,
              paddingHorizontal: 10,
              height: 68,
              borderRadius: 50,
              overflow: 'hidden',

              borderWidth: 0.5,
              borderColor: "rgba(215, 215, 215, 0.1)",

              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,

              backgroundColor: isDark ? 'rgba(69, 69, 69, 0.18)' : "rgba(255, 255, 255, 0.5)"

            },
            tabBarBackground: () => (

              // < View style={StyleSheet.absoluteFill} >
              <BlurView
                tint={"default"}
                intensity={20}
                style={StyleSheet.absoluteFill}
              />
              // </View>

            ),
          }}
        >
          {
            Pages.map((screen, index) => (
              <Tabs.Screen
                key={screen.name}
                name={screen.name}
                options={{
                  tabBarButton: (props) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <Pressable
                        onLayout={index === 0 ? onLayoutTab : undefined}
                        onPress={() => handlePress(index, props.onPress)}
                        style={{

                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 15,
                        }}
                      >
                        <IconSymbol
                          name={isSelected ? screen.icon_focus : screen.icon}
                          size={32}
                          color={isSelected ? accentColor : isDark ? '#cdcdcd' : '#000000'}
                        />
                        <Text
                          style={{
                            fontSize: 11,
                            color: isSelected ? accentColor : isDark ? '#cdcdcd' : '#000000',
                            fontWeight: '600',
                          }}
                        >
                          {screen.title}
                        </Text>
                      </Pressable>
                    );
                  },
                }}
              />
            ))
          }
        </Tabs >


        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 36,
              width: tabWidth * 1.1,
              height: 60,
              borderRadius: 50,
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(137,137,137,0.1)',
              borderWidth: 0,
              borderColor: isDark
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.04)',

              transform: [
                {
                  translateX: bubbleAnim.interpolate({
                    inputRange: [0, Pages.length - 1],
                    outputRange: [
                      14 + tabWidth * 0.13,
                      14 + (Pages.length - 1) * tabWidth + tabWidth * 0.11,
                    ],
                  }),
                },
                // { translateY: - },
              ],
            }}
          />
        )}
      </View >
      :
      < NativeTabs
        tintColor={NavBarTint}
        disableTransparentOnScrollEdge={true}

      >


        {
          Pages.map(screen =>
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
