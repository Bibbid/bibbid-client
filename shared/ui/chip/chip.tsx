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
  iconSize?: number;
  customColor?: string;
};

export function Chip({
  type = 'solid',
  color = 'gray',
  iconSize = 18,
  customColor,
  label,
  leftIcon,
  rightIcon,
}: ChipProps) {
  chipStyles.useVariants({ type, color });

  return (
    <View style={chipStyles.container}>
      {leftIcon && (
        <ChipIcon
          Icon={leftIcon}
          color={customColor ?? chipIconColorMap[type][color]}
          size={iconSize}
        />
      )}
      <CustomText style={chipStyles.text}>{label}</CustomText>
      {rightIcon && (
        <ChipIcon
          Icon={rightIcon}
          color={customColor ?? chipIconColorMap[type][color]}
          size={iconSize}
        />
      )}
    </View>
  );
}

export function ChipIcon({
  Icon,
  color,
  size,
}: {
  Icon: LucideIcon;
  color: keyof UnistylesThemes['light']['color'] | string;
  size: number;
}) {
  const { theme } = useUnistyles();

  return (
    <Icon
      size={size}
      color={
        color in theme.color
          ? theme.color[color as keyof typeof theme.color]
          : color
      }
    />
  );
}
