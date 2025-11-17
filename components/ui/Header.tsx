import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View, Text
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Host, ContextMenu, Button } from '@expo/ui/swift-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  menuItems: any[];
  style?: any;
};

export const Header = ({ menuItems, style }: Props) => {
  const { accentColor, backgroundColor } = useGstyle();
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={40} tint="dark" style={[styles.container, style,{top:top}]}>
      <View style={styles.inner}>
        {/* Title */}
        <Text style={styles.title}>Статистика</Text>

        {/* Menu */}
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
        >
          <Host>
            <ContextMenu>
              <ContextMenu.Items>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    systemImage={item.icon}
                    onPress={item.action}
                  >
                    {item.text}
                  </Button>
                ))}
              </ContextMenu.Items>

              <ContextMenu.Trigger>
                <IconSymbol name="ellipsis.circle" size={28} color={accentColor} />
              </ContextMenu.Trigger>
            </ContextMenu>
          </Host>
        </Pressable>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    
    left: 0,
    width: "100%",
    paddingTop: 18,
    paddingBottom: 5,
    height: "auto",
    // paddingHorizontal: 16,
    justifyContent: 'flex-end',
    // borderRadius: 20,
    overflow: "hidden"
  },
  inner: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: "white",

  },
  menuButton: {
    position: "absolute",
    right: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});