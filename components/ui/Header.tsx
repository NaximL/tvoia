import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = {
  menuItems: any;
  menuvis: boolean;
  menuset: (state: boolean) => void
}
export const Header = ({ menuItems, menuvis, menuset }: Props) => {
  const { gstyles, isDark } = useGstyle();

  const containerAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef<Animated.Value[]>(menuItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (menuvis) {

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
    } else {
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
      ]).start();
    }
  }, [menuvis]);

  const containerStyle = {
    transform: [
      {
        scale: containerAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }),
      },
      {
        translateY: containerAnim.interpolate({ inputRange: [0, 1], outputRange: [-30, 3] }),
      },
    ],
    opacity: containerAnim,
  };

  return (
    <>
      <Animated.View style={[styles.dropdownContainer, containerStyle]}>
        <View style={styles.dropdown}>
          {menuItems.map((item: any, i: any) => {
            const itemStyle = {
              opacity: itemAnims[i],
              transform: [
                { translateY: itemAnims[i].interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
              ],
            };
            return (
              <Animated.View key={i} style={itemStyle}>
                <TouchableOpacity activeOpacity={0.3} style={styles.menuItem} onPress={() => { item.action(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); }}>
                  <Text style={styles.menuText}>{item.text}</Text>
                  <IconSymbol name={item.icon} size={20} color="black" style={{ marginRight: 12 }} />
                </TouchableOpacity>
                {i < menuItems.length - 1 && <View style={styles.divider} />}
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: "center",
    zIndex: 100,
  },
  dropdown: {
    borderRadius: 16,
    overflow: 'hidden',
    minWidth: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 0.3,
    backgroundColor: "#fff",
    borderColor: 'rgba(255,255,255,0.2)'
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  menuText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 500
  },
  divider: {
    height: 0.3,
    backgroundColor: 'rgb(152, 152, 152)',
  },
});