import { useGstyle } from "@/Colors";
import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContextMenu from "./ContextMenu";
import { IconSymbol } from "./icon/Ios";
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";
type Props = {
    menuItems: any;
};

const BottomMenu = ({ menuItems, }: Props) => {
    const { isDark, accentColor, textColor, LiquidGlass } = useGstyle();
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    return isLiquidGlassAvailable() ? < GlassView
        style={
            [styles.BottomTab,
            {
                bottom: bottom + 55,
            }]
        }
    >
        <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
            <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color={accentColor} />
            </ContextMenu>
        </Pressable >
        <View style={styles.BottomTabTextContainer}>
            <Text style={[styles.BottomTabText, { color: textColor }]}>Оновлено щойно</Text>
            <Text style={styles.BottomTabTextSmall}>10 непрочитаних</Text>
        </View>
        <Pressable onPress={() => router.push('/Modals/SendMessage')}>
            <IconSymbol name="square.and.pencil" size={28} color={accentColor} />
        </Pressable>
    </GlassView >
        :
        <BlurView
            tint={isDark ? "dark" : "light"}
            style={
                [styles.BottomTab,
                {
                    bottom: bottom + 70,
                    borderWidth: 0.5,
                    overflow: "hidden",
                    borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark ? 'rgba(60, 60, 60, 0.165)' : 'rgba(255, 255, 255, 0.5)',

                }]
            }
        >
            < Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
                <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                    <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color={accentColor} />
                </ContextMenu>
            </Pressable >
            <View style={styles.BottomTabTextContainer}>
                <Text style={[styles.BottomTabText, { color: textColor }]}>Оновлено щойно</Text>
                <Text style={styles.BottomTabTextSmall}>10 непрочитаних</Text>
            </View>
            <Pressable onPress={() => router.push('/Modals/SendMessage')}>
                <IconSymbol name="square.and.pencil" size={28} color={accentColor} />
            </Pressable>
        </BlurView >


}

export default BottomMenu;



const styles = StyleSheet.create({

    BottomTab: {
        position: 'absolute',

        left: 0,
        right: 0,
        marginHorizontal: 22,
        borderRadius: 50,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        zIndex: 1000,
    },
    BottomTabTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomTabText: {
        fontSize: 14,
        fontWeight: '400',
        color: "#fff",
    },
    BottomTabTextSmall: {
        fontSize: 12,
        fontWeight: '400',
        color: "#939393",
    },
});