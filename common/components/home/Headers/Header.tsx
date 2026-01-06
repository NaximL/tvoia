import { useGstyle } from "@/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import BottomHeader from "./BottomHeader";
import TopGradient from "../TopGradient";


const Header = () => {
    const { gstyles } = useGstyle()

    return (
        <>
            {/* <TopGradient /> */}
            <View style={styles.row}>
                <Text style={[styles.Title, gstyles.color]}>Статистика</Text>
                <View style={styles.Avatar}>
                    <Image
                        source={{ uri: "https://avatar.iran.liara.run/public" }}
                        style={styles.AvatarIco}
                    />
                </View>
            </View>
            <BottomHeader />
        </>
    );
}

export default Header;


const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingHorizontal: 24,
        zIndex: 100,
        justifyContent: "space-between",
        alignItems: "center"
    },
    Title: {
        fontSize: 38,
        fontWeight: 700,
    },
    Avatar: {

    },
    AvatarIco: {
        width: 42,
        height: 42,
        borderRadius: 64,
    }
});