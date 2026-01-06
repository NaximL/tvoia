import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    interpolateColor,
    useAnimatedProps,
} from "react-native-reanimated";
import type { ColorValue } from "react-native";
import { useGstyle } from "@/Colors";
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const TopGradient = () => {
    const { gstyles } = useGstyle();
    const rotation = useSharedValue(0);
    const palette = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 20000 }),
            -1,
            false
        );

        palette.value = withRepeat(
            withTiming(1, { duration: 15000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const animatedProps = useAnimatedProps<{
        colors: readonly [ColorValue, ColorValue, ColorValue, ColorValue];
    }>(() => ({
        colors: [
            interpolateColor(
                palette.value,
                [0, 1],
                ['#0A2540', '#1E4D8B']
            ),
            interpolateColor(
                palette.value,
                [0, 1],
                ['#1B3B6F', '#6D3A7C']
            ),
            interpolateColor(
                palette.value,
                [0, 1],
                ['#3A2A6A', '#8B3A3A']
            ),
            interpolateColor(
                palette.value,
                [0, 1],
                ['#5B2B82', '#2A1F3D']
            ),
        ],
    }));
    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: -300,
                    left: -150,
                    right: -150,
                    height: 600,
                    overflow: "hidden",
                    
                }}
            >
                <Animated.View
                    style={[
                        animatedStyle,
                        {
                            width: 800,
                            height: 800,
                            alignSelf: "center",
                        },
                    ]}
                >
                    <AnimatedLinearGradient
                        colors={['#000', '#000', '#000', '#000']}
                        animatedProps={animatedProps}
                        locations={[0, 0.35, 0.65, 1]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            width: "100%",
                            height: "100%",
                            opacity: 0.65,
                        }}
                    />
                </Animated.View>
            </View>

            <LinearGradient
                colors={[
                    "transparent",
                    "transparent",
                    "#00000030",
                    "#00000070",
                    gstyles.back.backgroundColor,
                ]}
                locations={[0, 0.3, 0.55, 0.75, 1]}
                style={{
                    position: "absolute",
                    top: -50,
                    left: 0,
                    right: 0,
                    height: 350,
                    pointerEvents: "none",
                }}
            />
        </>
    );
};

export default TopGradient;