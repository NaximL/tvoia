import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useGstyle } from '@/Colors';
import { IconSymbol } from '@/common/ui/Icon';
//@ts-ignore
import { BarChart } from 'react-native-svg-charts';
import { Rect, G } from 'react-native-svg';

type Props = {
  Text: string;
  typecontent: string;
  color: string;
  suf: string;
  Value: string;
  Icon: any;
  time: string;
};

export const Widget = ({ typecontent, color, suf, Text: Texts, Value, Icon, time }: Props) => {
  const { isDark } = useGstyle();
  const data = [
    { value: 20, color: "#8b8b8bff" },
    { value: 45, color: color },
    { value: 28, color: "#8b8b8bff" },
    { value: 43, color: "#8b8b8bff" },
    { value: 6, color: "#8b8b8bff" },
    { value: 30, color: "#8b8b8bff" },
  ];


  const CustomBar = ({ x, y, bandwidth, data }: any) => (
    <G>
      {data.map((item: any, index: number) => {
        const barHeight = y(0) - y(item.value);
        return (
          <Rect
            key={index}
            x={x(index)}
            y={y(item.value)}
            width={bandwidth}
            height={barHeight}
            rx={3}
            ry={3}
            fill={item.color}
          />
        );
      })}
    </G>
  );

  return (
    <View style={styles.card}>
      <View style={styles.Top}>
        <View style={styles.Row}>
          <IconSymbol color={color} name={Icon} size={20} />
          <Text style={[{ color: color }, styles.TopLeftText]}>{Texts}</Text>
        </View>
        <View style={styles.Row}>
          <Text style={{ color: "#888888ff", fontSize: 14 }}>{time}</Text>
          <IconSymbol weight="medium" name="chevron.right" size={14} color={"#8888889c"} />
        </View>
      </View>

      <View style={styles.Bottom}>
        <Text style={styles.BottomText}>
          {Value} <Text style={styles.BottomTextd}>{suf}</Text>
        </Text>

        {typecontent === "chart" ?
          <BarChart
            style={{ width: 100, height: 60, marginTop: 12 }}
            data={data}
            yAccessor={({ item }: any) => item.value}
            spacingInner={0.4}
            gridMin={0}
            animate
            contentInset={{ top: 0, bottom: 0 }}
            svg={{ fill: 'transparent' }}
          >
            <CustomBar />
          </BarChart>
          :
          <View style={styles.BottomList}>
            <View style={styles.messageItem}>
              <Text style={styles.senderName} numberOfLines={1}>Якименко</Text>
              <Text style={styles.messageText} numberOfLines={1}>понял</Text>
            </View>

            <View style={styles.messageItem}>
              <Text style={styles.senderName} numberOfLines={1}>Петренко</Text>
              <Text style={styles.messageText} numberOfLines={1}>Привіт, як справи?</Text>
            </View>
          </View>
        }


      </View>
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
  BottomList: {
    gap: 8,
    minWidth: 140,
  },
  messageItem: {
    gap: 2,
  },
  senderName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  messageText: {
    fontSize: 12,
    color: "#8e8e93",
    fontWeight: "400",
  },
});