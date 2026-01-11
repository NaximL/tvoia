import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";


type Props = {
    value: string;
    suffix: string;
    children?: ReactNode
}

const TextLeft = ({
    value,
    suffix,
    children
}: Props) => {


    return (
        <>
            <Text style={styles.BottomText}>
                {value} <Text style={styles.BottomTextd}>{suffix}</Text>
            </Text>
            {!children ?
                <View>
                </View> :
                children}
        </>
    );
}

export default TextLeft;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        borderRadius: 32,
        backgroundColor: "#1c1c1e",
        padding: 17,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        gap: 5,
        flexDirection: "column",
    },
    Top: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    Row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    TopLeftText: {
        fontSize: 18,
        fontWeight: "600",
    },
    Bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-end',
    },
    BottomText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
    },
    BottomTextd: {
        fontSize: 18,
        fontWeight: "600",
        color: "#6f6f6fc7",
    },

});