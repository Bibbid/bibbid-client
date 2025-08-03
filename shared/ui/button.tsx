import {
  Pressable,
  Text,
  type TextProps,
  type PressableProps,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

type ButtonVariant =
  | 'solid-gray'
  | 'solid-light'
  | 'solid-white'
  | 'outlined-gray'
  | 'outlined-white'
  | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
}

interface ButtonTextProps extends TextProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const useButtonColors = (variant: ButtonVariant) => {
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

    return colorMap[variant] || colorMap['solid-gray'];
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

  styles.useVariants({ variant, size });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.button, animatedStyle, style]}
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
  styles.useVariants({ variant, size });

  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        'solid-gray': {},
        'solid-light': {},
        'solid-white': {},
        'outlined-gray': {
          borderWidth: 1,
          borderColor: theme.color['gray-4'],
        },
        'outlined-white': {
          borderWidth: 1,
          borderColor: theme.color['opacity-white-80'],
        },
        ghost: {},
      },
      size: {
        sm: {
          paddingHorizontal: 12,
          height: 32,
        },
        md: {
          paddingHorizontal: 18,
          height: 40,
        },
        lg: {
          paddingHorizontal: 22,
          height: 48,
        },
        xl: {
          paddingHorizontal: 24,
          height: 54,
        },
      },
    },
  },
  text: {
    fontWeight: '600',
    variants: {
      variant: {
        'solid-gray': {
          color: 'white',
        },
        'solid-light': {
          color: 'white',
        },
        'solid-white': {
          color: theme.color['gray-3'],
        },
        'outlined-gray': {
          color: 'white',
        },
        'outlined-white': {
          color: 'white',
        },
        ghost: {
          color: 'white',
        },
      },
      size: {
        sm: {
          fontSize: theme.fontSize['sm'],
        },
        md: {
          fontSize: theme.fontSize['md'],
        },
        lg: {
          fontSize: theme.fontSize['lg'],
        },
        xl: {
          fontSize: theme.fontSize['xl'],
        },
      },
    },
  },
}));
