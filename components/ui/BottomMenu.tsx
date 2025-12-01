import { useGstyle } from "@/Colors";
import { BlurView } from "expo-blur";
import { GlassView } from "expo-glass-effect";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContextMenu from "./ContextMenu";
import { IconSymbol } from "./icon/Ios";
import * as Haptics from 'expo-haptics';


type Objects = {
    first: {
        icon: any;
    },
    central: {
        top: string;
        bottom: string;
    }
    end: {
        icon: any;
        action: () => void;
    }
}
type Props = {
    menuItems: any;
    BottomButton: Objects;
};



const BottomMenu = ({ menuItems, BottomButton }: Props) => {
    const { isDark, accentColor, textColor, LiquidGlass } = useGstyle();
    const { bottom } = useSafeAreaInsets();

    return LiquidGlass ? < GlassView
        style={
            [styles.BottomTab,
            {
                bottom: bottom + 55,
            }]
        }
    >
        <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
            <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                <IconSymbol name={BottomButton.first.icon} size={28} color={accentColor} />
            </ContextMenu>
        </Pressable >
        <View style={styles.BottomTabTextContainer}>
            <Text style={[styles.BottomTabText, { color: textColor }]}>{BottomButton.central.top}</Text>
            <Text style={styles.BottomTabTextSmall}>{BottomButton.central.bottom}</Text>
        </View>
        <Pressable onPress={BottomButton.end.action}>
            <IconSymbol name={BottomButton.end.icon} size={28} color={accentColor} />
        </Pressable>
    </GlassView >
        :
        <BlurView
            tint="default"
            intensity={20}
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
            <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
                <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                    <IconSymbol name={BottomButton.first.icon} size={28} color={accentColor} />
                </ContextMenu>
            </Pressable >
            <View style={styles.BottomTabTextContainer}>
                <Text style={[styles.BottomTabText, { color: textColor }]}>{BottomButton.central.top}</Text>
                <Text style={styles.BottomTabTextSmall}>{BottomButton.central.bottom}</Text>
            </View>
            <Pressable onPress={BottomButton.end.action}>
                <IconSymbol name={BottomButton.end.icon} size={28} color={accentColor} />
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