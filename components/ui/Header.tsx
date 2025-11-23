import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Host, ContextMenu, Button } from '@expo/ui/swift-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  menuItems: any[];
  style?: any;
};

export const Header = ({ menuItems, style }: Props) => {
  const { isDark } = useGstyle();
  const { top } = useSafeAreaInsets();

  return (


    <Pressable
      style={[styles.menuButton, { top: top }, style]}
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
    >
      <Host style={{ borderRadius: 44, }}>
        <ContextMenu>
          <ContextMenu.Items>
            {menuItems.map((item, index) => (
              <Button key={index} systemImage={item.icon} onPress={item.action}>
                {item.text}
              </Button>
            ))}
          </ContextMenu.Items>

          <ContextMenu.Trigger>

            <BlurView tint={isDark ? "dark" : "light"} intensity={20} style={styles.buttonBackground}>
              {/* <View > */}
              <IconSymbol name="ellipsis" size={28} color={"white"} />

              {/* </View> */}

              <View
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 1,
                  width: '90%',
                  height: '50%',
                  borderTopWidth: 10,
                  borderLeftWidth: 10,
                  borderColor: isDark ? 'rgba(87, 87, 95, 0.5)' : 'rgba(184, 184, 184, 0.5)',
                  borderTopLeftRadius: 40,
                  zIndex: 2,

                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: '90%',
                  height: '50%',
                  borderBottomWidth: 0.05,
                  borderRightWidth: 0.05,
                  borderColor: isDark ? 'rgba(87, 87, 95, 0.5)' : 'rgba(184, 184, 184, 0.5)',
                  borderBottomRightRadius: 40,
                  zIndex: 2
                }}
              />
            </BlurView>

          </ContextMenu.Trigger>
        </ContextMenu>
      </Host>
    </Pressable>



  );
};

const styles = StyleSheet.create({

  menuButton: {
    position: "absolute",
    top: 50,
    right: 16,
    width: 44,
    height: 44,
    zIndex: 1000,
    borderRadius: 44,

    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonBackground: {
    backgroundColor: "rgba(12, 12, 12, 0.3)",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    overflow: "hidden"
  },
});