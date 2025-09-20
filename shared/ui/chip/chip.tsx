import { CustomText } from '../text';
import {
  chipIconColorMap,
  chipStyles,
  type ChipVariantsProps,
} from './chip.styles';
import { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { UnistylesThemes, useUnistyles } from 'react-native-unistyles';

type ChipProps = ChipVariantsProps & {
  label: string;
  leftIcon?: LucideIcon | React.FC<SvgProps>;
  rightIcon?: LucideIcon | React.FC<SvgProps>;
  iconWidth?: number;
  iconHeight?: number;
  customColor?: string;
};

export function Chip({
  type = 'solid',
  color = 'gray',
  iconWidth = 18,
  iconHeight = 18,
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
          width={iconWidth}
          height={iconHeight}
        />
      )}
      <CustomText style={chipStyles.text}>{label}</CustomText>
      {rightIcon && (
        <ChipIcon
          Icon={rightIcon}
          color={customColor ?? chipIconColorMap[type][color]}
          width={iconWidth}
          height={iconHeight}
        />
      )}
    </View>
  );
}

export function ChipIcon({
  Icon,
  color,
  width,
  height,
}: {
  Icon: LucideIcon | React.FC<SvgProps>;
  color: keyof UnistylesThemes['light']['color'] | string;
  width: number;
  height: number;
}) {
  const { theme } = useUnistyles();

  return (
    <Icon
      width={width}
      height={height}
      color={
        color in theme.color
          ? theme.color[color as keyof typeof theme.color]
          : color
      }
    />
  );
}
