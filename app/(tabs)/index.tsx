import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  Alert,
  Pressable,
} from 'react-native';
import { Header } from '@/components/myStat/Header';
import { Widget } from '@/components/myStat/Widget';
import { StatCard } from '@/components/myStat/StatCard';
import { ActivityList } from '@/components/myStat/ActivityList';
import { useGstyle } from '@/Colors';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function Index() {
  const { backgroundColor } = useGstyle();
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    <ScaleDecorator>
      <Animated.View
        entering={ZoomIn.springify()}
        exiting={ZoomOut.springify()}
        layout={Layout.springify()}
        style={[styles.wrapper, { opacity: isActive ? 0.8 : 1 }]}
      >
        <Pressable
          disabled={!editMode}
          onLongPress={() => {
            if (editMode) {
              Haptics.selectionAsync();
              drag();
            }
          }}
        >
          {item.type === 'widget' && <Widget {...item} />}
          {item.type === 'statsGroup' && (
            <View style={styles.statsRow}>
              {item.stats.map((s: any, i: number) => (
                <StatCard key={i} {...s} />
              ))}
            </View>
          )}
          {item.type === 'activity' && <ActivityList />}
        </Pressable>
      </Animated.View>
    </ScaleDecorator>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Header editMode={editMode} setEditMode={setEditMode} />
        <DraggableFlatList
          data={items}
          onDragEnd={({ data }) => setItems(data)}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          activationDistance={editMode ? 1 : 9999}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { marginVertical: 4 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
});