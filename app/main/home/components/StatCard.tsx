import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGstyle } from '@/Colors';

type Props = {
  
  icon: string;
  title: string;
  subtitle: string;
}

export const StatCard = ({ icon, title, subtitle }: Props) => {
  const { isDark, textColor, widgetColor } = useGstyle();

  const iconBg = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)';
  const textCol = isDark ? '#fff' : '#000';
  const subtitleCol = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)';

  return (
    <View style={[styles.card, { backgroundColor: widgetColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        {/* @ts-ignore */}
        <Ionicons name={icon} size={26} color={textCol} />
      </View>

      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: textCol }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleCol }]}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
    transform: [{ scale: 1 }],
  },
  iconContainer: {
    padding: 10,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  textBlock: {
    marginTop: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});