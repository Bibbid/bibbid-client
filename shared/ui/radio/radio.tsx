import { CustomText } from '../text';
import { radioStyles } from './radio.styles';
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
  View,
  type ViewStyle,
} from 'react-native';

type RadioContextType<T extends string> = {
  selected?: T;
  onSelect?: (value: T) => void | Dispatch<SetStateAction<T>>;
};

const RadioContext = createContext<RadioContextType<string>>({});

interface RadioButtonGroupProps
  extends PropsWithChildren,
    RadioContextType<string> {
  style?: StyleProp<ViewStyle>;
}

export function RadioButtonGroup({
  selected,
  onSelect,
  children,
  style,
}: RadioButtonGroupProps) {
  const [innerSelected, setInnerSelected] = useState<string>();

  return (
    <RadioContext.Provider
      value={{
        selected: selected ?? innerSelected,
        onSelect: onSelect ?? setInnerSelected,
      }}>
      <View style={style}>{children}</View>
    </RadioContext.Provider>
  );
}

interface RadioButtonProps<T extends string> extends PressableProps {
  value: T;
  label?: string;
}

export function RadioButton<T extends string>({
  value,
  onPress,
  label,
  disabled,
  ...props
}: RadioButtonProps<T>) {
  const { selected, onSelect } = use(RadioContext);

  const isActive = selected === value;
  const isDisabled = disabled ?? false;

  radioStyles.useVariants({
    active: isActive,
    disabled: isDisabled,
  });

  return (
    <Pressable
      onPress={() => {
        onSelect?.(value);
      }}
      style={radioStyles.wrapper}
      disabled={disabled}
      {...props}>
      <View style={radioStyles.container}>
        <View style={radioStyles.indicator} />
      </View>
      <CustomText style={radioStyles.label}>{label}</CustomText>
    </Pressable>
  );
}
