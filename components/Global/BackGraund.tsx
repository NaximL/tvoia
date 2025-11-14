import { useGstyle } from "@/Colors";
import { useDropStore } from "@/store/DragStore";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";


const BackGraund = () => {
    const { Drop, setDrop } = useDropStore()
    const { isDark } = useGstyle()
    return Drop && (
        <Pressable
            onPress={() => setDrop(false)}
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 0.5,
                backgroundColor: 'rgba(0,0,0,0.2)',
            }}
        >
            <BlurView
                tint={isDark ? "dark" : "light"}
                intensity={40}
                style={{ flex: 1, zIndex: 1, }}
            />
        </Pressable>

    )

}

export default BackGraund;