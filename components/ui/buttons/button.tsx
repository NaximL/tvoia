import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";

type Props = {
  One: string;
  Two: string;
  style?: StyleProp<ViewStyle>;
  Press: () => void;
  children: ReactNode;
};

const Button = ({ One, Two, style, Press, children }: Props) => {
  return (
    <TouchableOpacity onPress={Press} activeOpacity={0.8} style={style}>
      <LinearGradient
        colors={[One, Two]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 50, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;