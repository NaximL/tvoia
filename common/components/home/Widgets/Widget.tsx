import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { IconSymbol } from '@/common/ui/Icon';

type Head = {
  Icon: any;
  Text: string;
  time: string;
}

type Props = {
  children?: ReactNode;
  item: {
    color: string;
    Head: Head;
  },
};

export const Widget = ({ item, children }: Props) => {
  const safeColor = typeof item.color === 'string' ? item.color : '#8b8b8bff';

  return (
    <View style={styles.card}>
      <View style={styles.Top}>
        <View style={styles.Row}>
          <IconSymbol color={safeColor} name={item.Head.Icon ?? 'circle'} size={20} />
          <Text style={[{ color: safeColor }, styles.TopLeftText]}>{item.Head.Text}</Text>
        </View>
        <View style={styles.Row}>
          <Text style={{ color: "#888888ff", fontSize: 14 }}>{item.Head.time}</Text>
          <IconSymbol weight="medium" name="chevron.right" size={14} color={"#8888889c"} />
        </View>
      </View>

      <View style={styles.Bottom}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 32,
    backgroundColor: "#1c1c1e",
    padding: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    gap: 5,
    flexDirection: "column",

  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  TopLeftText: {
    fontSize: 18,
    fontWeight: "600",
  },
  Bottom: {
    flexDirection: "row",
    minHeight: 70,
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  BottomText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  BottomTextd: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6f6f6fc7",
  },

});