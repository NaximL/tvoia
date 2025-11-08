import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type Props = {
  One: string;
  Two: string;
  Textc: string;
  Value: string;
  Icon: any;
}

export const Widget = ({ One, Two, Textc, Value, Icon = "text" }: Props) => (
  <View style={[styles.wrapper, { shadowColor: One }]}>
    <LinearGradient
      colors={[One, Two]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <BlurView intensity={25} tint="dark" style={styles.blur}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Ionicons name={Icon} size={30} color="#fff" />
          </View>
          <View>
            <Text style={styles.label}>{Textc}</Text>
            <Text style={styles.score}>{Value}</Text>
          </View>
        </View>

      </BlurView>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 24,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 16,
    marginRight: 14,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  score: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});