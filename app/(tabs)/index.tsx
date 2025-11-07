import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, Alert } from 'react-native';
import { Header } from '@/components/myStat/Header'
import { ScoreCard } from '@/components/myStat/ScoreCard'
import { StatCard } from '@/components/myStat/StatCard'
import { ActivityList } from '@/components/myStat/ActivityList'
import { Gstyle } from '@/Colors';




export default function index() {
  const {backgroundColor} = Gstyle()
  const [Refresh, setRefresh] = useState(false);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={Refresh}
          onRefresh={() => {Alert.alert('Прикол', 'перезагрузка'); setRefresh(false);}}
          tintColor="#5B5EFF"
          colors={['#5B5EFF']}
          progressBackgroundColor="#ffffff"
          style={{ backgroundColor: '#ffffff' }}
        />
      }
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <Header />
      <ScoreCard />

      <View style={{ flexDirection: 'row', marginHorizontal: 12, marginTop: 12 }}>
        <StatCard color="#5B5EFF" icon="checkmark-done-outline" title="47" subtitle="Завдання до виконання" />
        <StatCard color="#F24E1E" icon="star-outline" title="1/32" subtitle="Місце в класі" />
      </View>

      <ActivityList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
});