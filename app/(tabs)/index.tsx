import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Alert,
  Pressable,
} from 'react-native';

import { Widget } from '@/components/Pages/Statistics/Widget';
import { StatCard } from '@/components/Pages/Statistics/StatCard';
import { ActivityList } from '@/components/Pages/Statistics/ActivityList';
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
import useDragStore, { useDropStore } from '@/store/DragStore';






export default function Index() {
  const { backgroundColor } = useGstyle();
  const [refreshing, setRefreshing] = useState(false);

  const { Drag } = useDragStore()

  const router = useRouter();
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);





  useEffect(() => {
    if (Drag) {
      const delay = Math.random() * 300;
      setTimeout(() => {
        rotation.value = withRepeat(
          withSequence(
            withTiming(-1.3, { duration: 120 }),
            withTiming(1.3, { duration: 140 })
          ),
          -1,
          true
        );
        translateX.value = withRepeat(
          withSequence(
            withTiming(-0.8, { duration: 220 }),
            withTiming(0.8, { duration: 250 })
          ),
          -1,
          true
        );
        translateY.value = withRepeat(
          withSequence(
            withTiming(-0.8, { duration: 200 }),
            withTiming(0.8, { duration: 240 })
          ),
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

  const [items, setItems] = useState([
    {
      key: '1',
      type: 'widget',
      One: '#7D5FFF',
      Two: '#5C4DFF',
      Textc: 'Середній бал',
      Value: '12.00',
      Icon: 'school-outline',
    },
    {
      key: '2',
      type: 'widget',
      One: '#FF8A5B',
      Two: '#FF5C93',
      Textc: 'Повідомлення',
      Value: '0',
      Icon: 'mail-outline',
    },
    {
      key: '3',
      type: 'statsGroup',
      stats: [
        {
          color: '#00C4B4',
          icon: 'book-outline',
          title: '47',
          subtitle: 'Завдань на завтра',
        },
        {
          color: '#FFB84C',
          icon: 'trophy-outline',
          title: '1 з 32',
          subtitle: 'Місце в класі',
        },
      ],
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
      <Animated.View
        entering={ZoomIn.springify()}
        exiting={ZoomOut.springify()}
        layout={Layout.springify()}
        style={[
          styles.wrapper,
          wiggleStyle,
          { opacity: isActive ? 0.8 : 1 },
        ]}
      >
        <Pressable
          disabled={!Drag}
          onLongPress={() => {
            if (Drag) {
              Haptics.selectionAsync();

              drag();
            }
          }}
        >
          {item.type === 'widget' && (
            <Widget
              One={item.One}
              Two={item.Two}
              Textc={item.Textc}
              Value={item.Value}
              Icon={item.Icon}
            />
          )}
          {item.type === 'statsGroup' && (
            <View style={styles.statsRow}>
              {item.stats.map((s: any, i: any) => (
                <StatCard
                  key={i}
                  color={s.color}
                  icon={s.icon}
                  title={s.title}
                  subtitle={s.subtitle}
                />
              ))}
            </View>
          )}
          {item.type === 'activity' && <ActivityList router={router} />}
        </Pressable>
      </Animated.View>
    </ScaleDecorator>
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>


        <DraggableFlatList
          style={{ paddingTop: 10 }}
          data={items}
          onDragEnd={({ data }) => setItems(data)}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          activationDistance={Drag ? 1 : 9999}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
});