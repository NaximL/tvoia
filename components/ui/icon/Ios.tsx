import { Platform, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';

type IconSymbolProps = {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: any;
  weight?: SymbolWeight;
};

// SF Symbols → MaterialIcons mapping
const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>['name']> = {
  // Home / Dashboard
  'house': 'home',
  'house.fill': 'home',

  // Mail / Messages
  'envelope': 'email',
  'envelope.fill': 'email',

  'square.and.pencil': 'edit',
  'paperplane.fill': 'send',

  // Documents / Homework
  'doc.text': 'description',
  'doc.text.fill': 'description',

  // Calendar / Schedule
  'calendar': 'calendar-today',
  'calendar.fill': 'calendar-today',
  'ellipsis': 'more-horiz',
  // Settings
  'gear': 'settings',

  // School / Stats
  'graduationcap': 'school',
  'graduationcap.fill': 'school',

  // Misc / Code
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',

  // Trophy / Achievements
  'trophy': 'emoji-events',
  'trophy.fill': 'emoji-events',

  // Book
  'book': 'menu-book',
  'book.fill': 'menu-book',

  // User / Profile
  'person': 'person',
  'person.fill': 'person',

  // Help fallback
  'questionmark': 'help-outline',
};
export function IconSymbol({ name, size = 24, color, style, weight = 'regular' }: IconSymbolProps) {
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        weight={weight}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={[
          { width: size, height: size },
          style,
        ]}
      />
    );
  } else {
    const mappedName = MAPPING[name] || 'help-outline';
    return <MaterialIcons name={mappedName} size={size} color={color as string} style={style as StyleProp<TextStyle>} />;
  }
}