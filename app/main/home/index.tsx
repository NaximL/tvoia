import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, Alert, Pressable } from 'react-native';
import { Widget } from '../../../common/components/home/Widget';
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
import TopGradient from '@/common/components/home/TopGradient';
import Header from '@/common/components/home/Headers/Header';


type WidgetItem = {
  key: string;
  type: 'widget';
  suf: string;
  color: string
  Text: string;
  typecontent: string;
  Value: string;
  Icon: string;
  time: string;
};
type StatsGroupItem = { key: string; type: 'statsGroup'; stats: { color?: string; icon: string; title: string; subtitle: string }[] };
type ActivityItem = { key: string; type: 'activity' };
type Item = WidgetItem | StatsGroupItem | ActivityItem;

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

  const [items, setItems] = useState<Item[]>([
    {
      key: '1',
      type: 'widget',
      Text: 'Середній бал',
      Value: '12.00',
      Icon: 'star.circle.fill',
      typecontent: "chart",
      suf: "Балів",
      color: "#ff5100ff",
      time: "66:66"
    },
    {
      key: '2',
      type: 'widget',
      Text: 'Повідомлення',
      Value: '0',
      Icon: 'mail.fill',
      typecontent: "lastm",
      suf: "Непрочитані",
      color: "#0088ffff",
      time: "23:49"
    },
    {
      key: '3',
      type: 'widget',
      Text: 'Місце в класі',
      Value: '1 з 32',
      Icon: 'trophy.fill',
      typecontent: "lastm",
      suf: "Місце",
      color: "#00ff73ff",
      time: "21:49"
    },
    { key: '4', type: 'activity' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      Alert.alert('🔄 Оновлено', 'Дані успішно перезавантажені!');
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
              {item.type === 'widget' && (
                <Widget
                  suf={item.suf}
                  color={item.color}
                  typecontent={item.typecontent}
                  Text={item.Text}
                  Value={item.Value}
                  Icon={item.Icon}
                  time={item.time}
                />
              )}
              {item.type === 'activity' && <ActivityList router={router} />}
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