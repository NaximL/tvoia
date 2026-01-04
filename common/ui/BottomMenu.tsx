import { useGstyle } from "@/Colors";
import { BlurView } from "expo-blur";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContextMenu from "./ContextMenu";
import { IconSymbol } from "./Icon";
import * as Haptics from 'expo-haptics';
import GlassView from "./GlassView";


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

    return <GlassView
        isInteractive={true}
        style={
            [styles.BottomTab,
            {
                bottom: bottom + 60,
            }]
        }
    >
        <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}>
            <ContextMenu Menu={menuItems} onPress={(item) => item.action()}>
                <IconSymbol name={BottomButton.first.icon} size={28} color="#fff" />
            </ContextMenu>
        </Pressable >

        <View style={styles.BottomTabTextContainer}>
            <Text style={[styles.BottomTabText, { color: textColor }]}>{BottomButton.central.top}</Text>
            <Text style={styles.BottomTabTextSmall}>{BottomButton.central.bottom}</Text>
        </View>

        <Pressable onPress={BottomButton.end.action}>
            <IconSymbol name={BottomButton.end.icon} size={28} color="#fff" />
        </Pressable>
    </GlassView >
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