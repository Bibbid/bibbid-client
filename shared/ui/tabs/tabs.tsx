import { tabsStyles } from './tabs.styles';
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
  use,
} from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

type TabContextType<T extends string> = {
  selected?: T;
  onSelect?: (value: T) => void | Dispatch<SetStateAction<T>>;
};

const TabContext = createContext<TabContextType<string>>({});

interface TabButtonGroupProps
  extends PropsWithChildren,
    TabContextType<string> {
  style?: StyleProp<ViewStyle>;
}

export function TabButtonGroup({
  selected,
  onSelect,
  children,
  style,
}: TabButtonGroupProps) {
  const [innerSelected, setInnerSelected] = useState<string>();

  return (
    <TabContext.Provider
      value={{
        selected: selected ?? innerSelected,
        onSelect: onSelect ?? setInnerSelected,
      }}>
      <View style={[tabsStyles.root, style]}>{children}</View>
    </TabContext.Provider>
  );
}

interface TabButtonProps<T extends string> extends PressableProps {
  value: T;
  label?: string;
}

export function TabButton<T extends string>({
  value,
  onPress,
  label,
  ...props
}: TabButtonProps<T>) {
  const { selected, onSelect } = use(TabContext);

  const isActive = selected === value;

  tabsStyles.useVariants({
    active: isActive,
  });

  return (
    <Pressable
      onPress={(event) => {
        onSelect?.(value);
        onPress?.(event);
      }}
      style={tabsStyles.button}
      {...props}>
      <Text style={tabsStyles.text}>{label}</Text>
    </Pressable>
  );
}
