import { Button, Host, ContextMenu as ContextMenus, Text } from "@expo/ui/swift-ui";
import { SymbolViewProps } from "expo-symbols";
import * as Haptics from 'expo-haptics';
import { StyleProp, ViewStyle } from "react-native";

type Props = {
    Menu: { text: string; icon: SymbolViewProps['name'] }[];
    children: React.ReactNode;
    onPress?: (item: any, index?: number) => void;
    style?: StyleProp<ViewStyle>;
}

const ContextMenu = ({ Menu, children, onPress, style }: Props) => {
    return (
        <Host style={style}>
            <ContextMenus>
                <ContextMenus.Items>
                    {Menu.map((item, index) => (
                        <Button
                            key={index}
                            systemImage={item.icon}
                            onPress={() => {
                                onPress && onPress(item, index);
                                Haptics.selectionAsync();
                            }}
                        >
                            {item.text}
                        </Button>
                    ))}
                </ContextMenus.Items>
                <ContextMenus.Trigger>
                    {children}
                </ContextMenus.Trigger>
            </ContextMenus>
        </Host>

    );
}

export default ContextMenu;