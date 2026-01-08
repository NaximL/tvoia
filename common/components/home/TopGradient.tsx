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


    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 20000 }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));
    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: -100,
                    left: -150,
                    right: -150,
                    // width:100,
                    height: 400,
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
                        colors={['#0A2540', '#1B3B6F', '#3A2A6A', '#5B2B82']}
                        // colors={['#0A2540', '#000000ff', '#ffffffff', '#ffffffff']}
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