import React, { useState, useEffect, ReactNode } from 'react';
import { View, StyleSheet, RefreshControl, Alert, Pressable, Text } from 'react-native';
import { Widget } from '../../../common/components/home/Widgets/Widget';
import { ActivityList } from '../../../common/components/home/ActivityList';
import { useGstyle } from '@/Colors';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Layout,
  ZoomIn,
  ZoomOut,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import useDragStore from '@/store/DragStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopGradient from '@/common/components/home/Headers/TopGradient';
import Header from '@/common/components/home/Headers/Header';
import Message from '@/common/components/home/Widgets/Bodys/Message';
import Chart from '@/common/components/home/Widgets/Bodys/Right/Chart';
import TextLeft from '@/common/components/home/Widgets/Bodys/TextLeft';


type Head = {
  Icon: any;
  Text: string;
  time: string;
}
type WidgetItem = {
  key: string;
  Head: Head;
  commponent: React.JSX.Element;
  color: string;
};


export default function Index() {
  const { gstyles, isDark, widgetColor } = useGstyle();
  const [refreshing, setRefreshing] = useState(false);
  const { Drag, setDrag } = useDragStore();
  const router = useRouter();

  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (Drag) {
      const delay = Math.random() * 300;
      setTimeout(() => {
        rotation.value = withRepeat(
          withSequence(withTiming(-1.3, { duration: 120 }), withTiming(1.3, { duration: 140 })),
          -1,
          true
        );
        translateX.value = withRepeat(
          withSequence(withTiming(-0.8, { duration: 220 }), withTiming(0.8, { duration: 250 })),
          -1,
          true
        );
        translateY.value = withRepeat(
          withSequence(withTiming(-0.8, { duration: 200 }), withTiming(0.8, { duration: 240 })),
          -1,
          true
        );
      }, delay);
    } else {
      cancelAnimation(rotation);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      rotation.value = withTiming(0, { duration: 200 });
      translateX.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
    }
  }, [Drag]);

  const wiggleStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const [items, setItems] = useState<WidgetItem[]>([
    {
      key: '1',
      color: "#ff5100ff",
      Head: {
        Icon: 'star.circle.fill',
        Text: 'Середній бал',
        time: "00:00",
      },
      commponent:
        <TextLeft
          value='12.00'
          suffix='Балів'
        >
          <Chart
            data={[
              { value: 20, color: "#8b8b8bff" },
              { value: 10, color: "#8b8b8bff" },
              { value: 28, color: "#8b8b8bff" },
              { value: 43, color: "rgb(208, 51, 45)" },
              { value: 6, color: "#8b8b8bff" },
              { value: 30, color: "#8b8b8bff" },
            ]}

          />
        </TextLeft>,
    },
    {
      key: '2',
      color: "#0088ffff",
      Head: {
        Icon: 'mail.fill',
        Text: 'Повідомлення',
        time: "23:49"
      },
      commponent:
        <TextLeft
          value='0'
          suffix='Непрочитані'
        >
          <Message messages={
            [
              {
                who: "Олексій Яременко",
                body: "Люблю свою сімку"
              },
              {
                who: "Олексій Яременко Яременко",
                body: "Люблю свою сімку"
              },
              {
                who: "Олексій Яременко",
                body: "Люблю свою сімкуЛюблю свою сімку"
              },
            ]} />
        </TextLeft>,
    },
    {
      key: '3',
      color: "#00ff73ff",
      Head: {
        Icon: 'trophy.fill',
        Text: 'Місце в класі',
        time: "21:49"
      },
      commponent: <TextLeft
        value='1 з 31'
        suffix='Місце'
      >
      </TextLeft>,
    },
    {
      key: '4',
      color: "rgb(0, 183, 255)",
      Head: {
        Icon: 'graduationcap.fill',
        Text: 'Остані оцінки',
        time: "21:49"
      },
      commponent: <ActivityList />,
    }
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      Alert.alert('🔄 Оновлено', 'Дані ускпішно перезавантажені!');
      setRefreshing(false);
    }, 1200);
  };

  const renderItem = ({ item, drag, isActive }: any) => (
    <ScaleDecorator key={item.key}>
      <View style={styles.wrapper}>
        <Animated.View
          entering={ZoomIn.springify()}
          exiting={ZoomOut.springify()}
          layout={Layout.springify()}
          style={{ opacity: isActive ? 0.8 : 1 }}
        >
          <Animated.View style={wiggleStyle}>
            <Pressable
              disabled={!Drag}
              onLongPress={() => Drag && Haptics.selectionAsync().then(() => drag())}
            >
              <Widget item={item} >
                {item.commponent}
              </Widget>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </ScaleDecorator>
  );

  return (
    <SafeAreaView style={{ flex: 1, ...gstyles.back }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TopGradient />
        <DraggableFlatList
          data={items}
          onDragEnd={({ data }) => setItems(data)}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          activationDistance={Drag ? 1 : 9999}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={<Header />}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 50 }}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 6 },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 12 },
});