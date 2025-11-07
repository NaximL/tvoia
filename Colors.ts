import { useColorScheme } from "react-native";



export const Gstyle = () => {
    const isDark: boolean = useColorScheme() === 'dark';
    const backgroundColor = isDark ? '#1a1a1f' : '#f7f7fa';
    return {
        backgroundColor
    }
}
// export const backcolor = isDark ? "#0C0C0D" : "#fcfcfcff"
