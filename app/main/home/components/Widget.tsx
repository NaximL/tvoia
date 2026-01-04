
// Widget.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useGstyle } from '@/Colors';

type Props = {
  One?: string;
  Two?: string;
  Textc: string;
  Value: string;
  Icon: any;
}

export const Widget = ({ One, Two, Textc, Value, Icon = "text" }: Props) => {
  const { isDark , widgetColor} = useGstyle();
  const gradientStart = One || widgetColor
  const gradientEnd = Two || widgetColor;

  const iconBg = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <BlurView intensity={25} tint={isDark ? "dark" : "light"} style={styles.blur}>
          <View style={styles.left}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
              <Ionicons name={Icon} size={30} color={textColor} />
            </View>
            <View>
              <Text style={[styles.label, { color: textColor }]}>{Textc}</Text>
              <Text style={[styles.score, { color: textColor }]}>{Value}</Text>
            </View>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 24,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
    padding: 10,
    borderRadius: 16,
    marginRight: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  score: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});