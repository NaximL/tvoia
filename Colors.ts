import { useEffect, useState } from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";

export const useGstyle = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const iosVersion: number = Platform.OS === 'ios' ? parseFloat(Platform.Version as string) : 0;
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  //#161617ff
  //#1a1a1c
  const backgroundColor = isDark ? '#000' : '#f7f7fa';
  const homeworkwidgetColor = isDark ? "#121213ff" : "#fff";
  const widgetColor = isDark ? "#1C1C1E" : "#fff";
  const accentColor = isDark ? '#3290ee' : '#007aff';
  const textColor = isDark ? "#ffffff" : "#000000";
  const BackgroundColorModal = isDark ? "#1c1c1e" : "#f2f2f7";

  const SearchBarColor = isDark ? "#2c2c2eff" : "#e5e5ea";

  const NavBarTint = accentColor;

  const LiquidGlass = Platform.OS === 'ios' && iosVersion < 26.0;

  const gstyles = StyleSheet.create({
    back: { backgroundColor },
    widgetColor: { backgroundColor: widgetColor },
    color: { color: textColor },
  });

  return {
    gstyles,
    isDark,
    backgroundColor,
    homeworkwidgetColor,
    widgetColor,
    accentColor,
    NavBarTint,
    BackgroundColorModal,
    SearchBarColor,
    textColor,
    LiquidGlass

  };
};