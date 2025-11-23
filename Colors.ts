import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const useGstyle = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);


  const backgroundColor = isDark ? '#000' : '#f7f7fa';
  const widgetColor = isDark ? "#1C1C1E" : "#fff";
  const accentColor = isDark ? '#007bffff' : '#007aff';
  const textColor = isDark ? "#ffffff" : "#000000";
  const NavBarTint = accentColor;


  const gstyles = StyleSheet.create({
    back: { backgroundColor },
    widgetColor: { backgroundColor: widgetColor },
    color: { color: textColor },
  });

  return {
    gstyles,
    isDark,
    backgroundColor,
    widgetColor,
    accentColor,
    NavBarTint,
    textColor
  };
};