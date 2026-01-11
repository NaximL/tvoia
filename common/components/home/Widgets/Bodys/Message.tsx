import { StyleSheet, Text, View } from "react-native";

type Message = {
    who: string;
    body: string;
}
type Props = {
    messages: Array<Message>;
}

const Message = ({ messages }: Props) => {
    return (
        <View style={styles.BottomList}>
            {messages.map((message, index) => (
                <View key={index} style={styles.messageItem}>
                    <Text style={styles.senderName} numberOfLines={1}>{message.who}</Text>
                    <Text style={styles.messageText} numberOfLines={1}>{message.body}</Text>
                </View>
            ))}

        </View>
    );
}

export default Message;


const styles = StyleSheet.create({
    BottomList: {
        gap: 8,
        minWidth: 140,
    },
    messageItem: {
        gap: 2,
    },
    senderName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
        width:160,
    },
    messageText: {
        fontSize: 12,
        color: "#8e8e93",
        fontWeight: "400",
        width:140,
    },
});