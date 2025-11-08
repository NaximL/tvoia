import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
} from 'react-native';
import { useGstyle } from '@/Colors';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol.ios'; // путь к твоему компоненту IconSymbol

export const Header = ({ editMode, setEditMode }: any) => {
  const { gstyles, isDark } = useGstyle();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<Parameters<typeof IconSymbol>[0]['name']>('ellipsis');

  const menuItems = [
    {
      icon: 'arrow.up.arrow.down',
      text: editMode ? 'Готово' : 'Змінити порядок',
      action: () => { setEditMode(!editMode); },
    },
    {
      icon: 'plus',
      text: 'Додати',
      action: () => { alert('Додати виджети'); },
    },
    {
      icon: 'gear',
      text: 'Налаштування',
      action: () => { alert('Налаштування виджетів'); },
    },
  ];

  const containerAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef<Animated.Value[]>(menuItems.map(() => new Animated.Value(0))).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(containerAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.stagger(
          30,
          itemAnims
            .map(anim =>
              Animated.timing(anim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
              })
            )
            .reverse()
        ),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      containerAnim.setValue(0);
      itemAnims.forEach(anim => anim.setValue(0));

      Animated.spring(containerAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
        tension: 120,
      }).start();

      Animated.stagger(
        50,
        itemAnims.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 6,
            tension: 100,
          })
        )
      ).start();
    }
  };

  const containerStyle = {
    transform: [
      {
        scale: containerAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
      },
      {
        translateX: containerAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }),
      },
      {
        translateY: containerAnim.interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }),
      },
    ],
    opacity: containerAnim,
  };

  return (
    <BlurView
      intensity={40}
      tint={isDark ? 'dark' : 'light'}
      style={styles.header}
    >
      <Text style={[styles.title, gstyles.color]}>Статистика</Text>

      <View style={{ position: 'relative' }}>
        <TouchableOpacity onPress={toggleMenu} style={styles.editButton}>
          <IconSymbol name={selectedIcon} size={26} color="white" />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: 'rgba(87, 87, 95, 0.5)',
              borderTopLeftRadius: 40,
              zIndex: 2,

            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              borderBottomWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: 'rgba(87, 87, 95, 0.5)',
              borderBottomRightRadius: 80,
              zIndex: 2
            }}
          />
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View style={[styles.dropdownContainer, containerStyle]}>
            <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={styles.dropdown}>
              {menuItems.map((item, i) => {
                const itemStyle = {
                  opacity: itemAnims[i],
                  transform: [
                    { translateY: itemAnims[i].interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
                  ],
                };
                return (
                  <React.Fragment key={i}>
                    <Animated.View style={itemStyle}>
                      <Pressable
                        style={styles.menuItem}
                        onPress={() => {
                          item.action();
                          toggleMenu();
                        }}
                      >
                        {/*@ts-ignore*/}
                        <IconSymbol name={item.icon} size={20} color="white" style={{ marginRight: 12 }} />
                        <Text style={styles.menuText}>{item.text}</Text>
                      </Pressable>
                    </Animated.View>
                    {i < menuItems.length - 1 && <View style={styles.divider} />}
                  </React.Fragment>
                );
              })}
            </BlurView>
          </Animated.View>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 100,
    marginHorizontal: 16,
    borderRadius: 18,
    // paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 70,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
  },
  editButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(39,39,47,0.8)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    zIndex: 100,
  },
  dropdown: {
    borderRadius: 16,
    overflow: 'hidden',
    minWidth: 200,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
});