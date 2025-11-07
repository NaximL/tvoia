import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const useGstyle = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const backgroundColor = isDark ? '#1a1a1f' : '#f7f7fa';

  const gstyles = StyleSheet.create({
    back: { backgroundColor },
    color: { color: isDark ? '#ffffff' : '#000000' },
  });

  return {
    gstyles,
    isDark,
    backgroundColor
  };
};