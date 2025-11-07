import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>MyStat</Text>
    {/* <View style={styles.icons}>

      <TouchableOpacity style={{ marginLeft: 16 }}>
        <Ionicons name="notifications-outline" size={28} color="#ccc" />
        <Text style={styles.notif}>
          1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ marginLeft: 16, }, styles.avatar]}>
        <Ionicons name="settings-outline" size={28} color="#ccc" />
      </TouchableOpacity>
    </View> */}
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notif: {
    position:"absolute",
    right:-7,
    bottom:-5,
    color:"white",
    backgroundColor:"red",
    paddingInline:5,
    paddingHorizontal:5,
    borderRadius:'50%'
  },  
  avatar: {
    width: 34,
    // height: 34,
    borderRadius: 17,
    marginLeft: 16,
  },
});