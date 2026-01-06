import GlassView from "@/common/ui/GlassView";
import { IconSymbol } from "@/common/ui/Icon";
import useDragStore from "@/store/DragStore";
import { Pressable, Text, View } from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
} from "react-native-reanimated";


const BottomHeader = () => {
    const { Drag, setDrag } = useDragStore();
    return (
        <View style={{
            marginTop: 30,
            marginBottom: 10,
            left: 0,
            right: 0,
            zIndex: 100,
            paddingHorizontal: 24,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        }}>
            {Drag ? (
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(150)}
                >
                    <GlassView
                        isInteractive={true}
                        glassEffectStyle="clear"
                        style={{
                            flexDirection: "row",
                            gap: 3,
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <IconSymbol size={18} color="#fff" name="plus" weight="bold" />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: "#ffffffff"
                            }}
                        >
                            Додати
                        </Text>
                    </GlassView>
                </Animated.View>
            ) : (
                <Animated.Text
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(150)}
                    style={{
                        fontSize: 26,
                        fontWeight: "700",
                        color: "#ffffffff"
                    }}
                >
                    Закріплені
                </Animated.Text>
            )}
            <Pressable onPress={() => setDrag(!Drag)}>
                <GlassView
                    isInteractive={true}
                    glassEffectStyle="clear"
                    style={{
                        padding: 10,
                        borderRadius: 50
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            color: "#ffffffff"
                        }}
                    >
                        {Drag ? "Готово" : "Змінити"}
                    </Text>
                </GlassView>

            </Pressable>
        </View>

    );
}

export default BottomHeader;