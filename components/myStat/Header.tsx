import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGstyle } from '@/Colors';


export const Header = ({ editMode, setEditMode }: any) => {
  const { gstyles, isDark } = useGstyle();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, gstyles.color]}>Статистика</Text>

      <TouchableOpacity
        onPress={() => setEditMode((prev: boolean) => !prev)}
        style={[
          styles.editButton,
          { backgroundColor: '#5151512e' },
        ]}
      >
        <Ionicons
          name={editMode ? 'checkmark' : 'swap-vertical-outline'}
          size={22}
          color="white"
        />
        <View
          style={{
            position: 'absolute',
            top: 1,
            left: 1,
            width: '100%',
            height: '100%',
            borderTopWidth: 0.5,
            borderLeftWidth: 0.5,
            borderColor: 'rgba(87, 87, 95, 0.5)',
            borderTopLeftRadius: 40,
            zIndex: 2,

          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: '100%',
            height: '100%',
            borderBottomWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor: 'rgba(87, 87, 95, 0.5)',
            borderBottomRightRadius: 80,
            zIndex: 2
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

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
  editButton: {
    padding: 12,
    borderRadius: "50%",
    zIndex: 0
  },
});

