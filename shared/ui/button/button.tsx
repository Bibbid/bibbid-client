import { CustomText, type CustomTextProps } from '../text';
import { buttonStyles, type ButtonVariantsProps } from './button.styles';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

type ButtonProps = ButtonVariantsProps & PressableProps & {};

type ButtonTextProps = ButtonVariantsProps & CustomTextProps;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const useButtonColors = (variant: ButtonVariantsProps['variant']) => {
  const theme = useAnimatedTheme();

  return useDerivedValue(() => {
    const colorMap = {
      'solid-gray': {
        baseColor: theme.value.color['gray-2'],
        pressedColor: theme.value.color['gray-1'],
      },
      'solid-light': {
        baseColor: theme.value.color['gray-3'],
        pressedColor: theme.value.color['gray-2'],
      },
      'solid-white': {
        baseColor: 'white',
        pressedColor: theme.value.color['opacity-white-80'],
      },
      'outlined-gray': {
        baseColor: 'transparent',
        pressedColor: theme.value.color['opacity-white-4'],
      },
      'outlined-white': {
        baseColor: 'transparent',
        pressedColor: theme.value.color['opacity-white-8'],
      },
      ghost: {
        baseColor: 'transparent',
        pressedColor: 'transparent',
      },
    };

    return colorMap[variant ?? 'solid-gray'];
  });
};

export function Button({
  onPress,
  variant = 'solid-gray',
  size = 'md',
  style,
  ...props
}: ButtonProps) {
  const pressProgress = useSharedValue(0);
  const colors = useButtonColors(variant);

  const handlePressIn = () => {
    pressProgress.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    pressProgress.value = withTiming(0, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        pressProgress.value,
        [0, 1],
        [colors.value.baseColor, colors.value.pressedColor]
      ),
    };
  });

  buttonStyles.useVariants({ variant, size });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[buttonStyles.button, animatedStyle, style]}
      {...props}
    />
  );
}

export function ButtonText({
  children,
  variant,
  size,
  ...props
}: ButtonTextProps) {
  buttonStyles.useVariants({ variant, size });

  return (
    <CustomText style={buttonStyles.text} weight="600" {...props}>
      {children}
    </CustomText>
  );
}
