import { CustomText } from '../text';
import {
  chipIconColorMap,
  chipStyles,
  type ChipVariantsProps,
} from './chip.styles';
import { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { UnistylesThemes, useUnistyles } from 'react-native-unistyles';

type ChipProps = ChipVariantsProps & {
  label: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
};

export function Chip({
  type = 'solid',
  color = 'gray',
  label,
  leftIcon,
  rightIcon,
}: ChipProps) {
  chipStyles.useVariants({ type, color });

  return (
    <View style={chipStyles.container}>
      {leftIcon && (
        <ChipIcon Icon={leftIcon} color={chipIconColorMap[type][color]} />
      )}
      <CustomText style={chipStyles.text}>{label}</CustomText>
      {rightIcon && (
        <ChipIcon Icon={rightIcon} color={chipIconColorMap[type][color]} />
      )}
    </View>
  );
}

export function ChipIcon({
  Icon,
  color,
}: {
  Icon: LucideIcon;
  color: keyof UnistylesThemes['light']['color'] | 'white';
}) {
  const { theme } = useUnistyles();

  return (
    <Icon size={18} color={color === 'white' ? 'white' : theme.color[color]} />
  );
}
