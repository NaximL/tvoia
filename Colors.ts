import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const useGstyle = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const NavBarTint = isDark ? 'white' : "#579fe7ff";

  const backgroundColor = isDark ? '#1a1a1f' : '#f7f7fa';
  const widgetColor = isDark ? "#1C1C1E" : "#fff"
  const accentColor = isDark ? '#579fe7ff' : '#007aff';




  const gstyles = StyleSheet.create({
    back: { backgroundColor },
    widgetColor: { backgroundColor: widgetColor },
    color: { color: isDark ? '#ffffff' : '#000000' },
  });

  return {
    gstyles,
    isDark,
    backgroundColor,
    accentColor,
    NavBarTint
  };
};