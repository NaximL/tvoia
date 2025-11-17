import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/components/ui/icon/Ios';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Host, ContextMenu, Button, Picker } from '@expo/ui/swift-ui';
import { padding } from '@expo/ui/swift-ui/modifiers';


type Props = {
  menuItems: any;

}
export const Header = ({ menuItems }: Props) => {
  const { accentColor } = useGstyle();

  return (
    <>
      <Pressable style={{ marginRight: 14 }} onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}>
        <Host>
          <ContextMenu>
            <ContextMenu.Items>
              {menuItems.map((item: any, index: number) =>
                <Button
                  key={index}
                  systemImage={item.icon}
                  onPress={item.action}>
                  {item.text}
                </Button>
              )}
            </ContextMenu.Items>
            <ContextMenu.Trigger>
              <IconSymbol name="ellipsis.circle" size={28} color={accentColor} />
            </ContextMenu.Trigger>
          </ContextMenu>
        </Host>
      </Pressable >
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 45,
    right: 5,
    width: 210,
    zIndex: 100,
  },
  dropdown: {
    borderRadius: 16,
    overflow: 'hidden',
    // width:210,
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