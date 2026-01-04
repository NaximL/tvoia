import { useGstyle } from "@/Colors";
import { BlurView } from "expo-blur";
import { GlassView as Gl } from "expo-glass-effect";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    isInteractive?: boolean;
    tint?: string;
}

const GlassView = ({ style, children, isInteractive, tint }: Props) => {
    const { LiquidGlass, isDark } = useGstyle();
    return (
        <>
            {LiquidGlass ?
                <Gl
                    tintColor={tint}
                    isInteractive={isInteractive}
                    style={style}
                >
                    {children}
                </Gl>
                :
                <BlurView
                    tint="default"
                    intensity={20}
                    style={
                        {
                            //@ts-ignore
                            ...style,
                            borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0, 0, 0, 0.1)',
                            backgroundColor: isDark ? 'rgba(60, 60, 60, 0.165)' : 'rgba(255, 255, 255, 0.5)',
                        }
                    }
                >
                    {children}
                </BlurView>
            }
        </>
    );
}

export default GlassView;