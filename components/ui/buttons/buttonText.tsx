import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";

type Props = {
    text: string;
    color: string;
    style?: StyleProp<TextStyle>;
    OnPress: () => void
}

const ButtonText = ({ text, color, style, OnPress }: Props) => {
    return (
        <TouchableOpacity onPress={OnPress}>
            <Text style={[style, { color: color }]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default ButtonText;