import { CustomText } from '../text';
import { inputStyles } from './input.styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

interface InputProps extends TextInputProps {
  mode?: 'default' | 'bottom-sheet';
  isError?: boolean;
  description?: string;
  showMaxLength?: boolean;
}

const INPUT_STATE = {
  FOCUSED: 1,
  DISABLED: 2,
  ERROR: 3,
  DEFAULT: 0,
} as const;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedBottomSheetTextInput =
  Animated.createAnimatedComponent(BottomSheetTextInput);

const AnimatedText = Animated.createAnimatedComponent(CustomText);

export default function Input({
  mode = 'default',
  placeholder = 'Enter text',
  description,
  showMaxLength = false,
  isError = false,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useAnimatedTheme();

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    let targetValue = 0;

    if (isError) {
      targetValue = INPUT_STATE.ERROR;
    } else if (!editable) {
      targetValue = INPUT_STATE.DISABLED;
    } else if (isFocused) {
      targetValue = INPUT_STATE.FOCUSED;
    } else {
      targetValue = INPUT_STATE.DEFAULT;
    }

    animationProgress.value = withTiming(targetValue, { duration: 200 });
  }, [isFocused, isError, editable, animationProgress]);

  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animationProgress.value,
        [0, 1, 2, 3],
        [
          theme.value.color['gray-2'],
          theme.value.color['gray-2'],
          theme.value.color['opacity-white-2'],
          theme.value.color['gray-2'],
        ]
      ),
      borderColor: interpolateColor(
        animationProgress.value,
        [0, 1, 2, 3],
        [
          'transparent',
          theme.value.color['gray-6'],
          'transparent',
          theme.value.color['red-3'],
        ]
      ),
    };
  });

  const animatedTextInputStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animationProgress.value,
        [0, 1, 2, 3],
        [
          theme.value.color['gray-5'],
          theme.value.color['gray-11'],
          theme.value.color['opacity-white-16'],
          theme.value.color['red-3'],
        ]
      ),
    };
  });

  const animatedDescriptionStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animationProgress.value,
        [0, 1, 2, 3],
        [
          theme.value.color['gray-6'],
          theme.value.color['gray-6'],
          theme.value.color['opacity-white-8'],
          theme.value.color['red-3'],
        ]
      ),
    };
  });

  const animatedCountStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animationProgress.value,
        [0, 1, 2, 3],
        [
          theme.value.color['gray-6'],
          theme.value.color['gray-11'],
          theme.value.color['opacity-white-8'],
          theme.value.color['red-3'],
        ]
      ),
    };
  });

  return (
    <View style={inputStyles.container}>
      <Animated.View style={[inputStyles.root, animatedRootStyle]}>
        {mode === 'default' ? (
          <AnimatedTextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              {
                flex: 1,
                backgroundColor: 'transparent',
                fontFamily: 'Montserrat-Regular',
                lineHeight: 1,
              },
              animatedTextInputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.value.color['gray-5']}
            editable={editable}
            {...props}
          />
        ) : (
          <AnimatedBottomSheetTextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              {
                flex: 1,
                backgroundColor: 'transparent',
                fontFamily: 'Montserrat-Regular',
                lineHeight: 1,
              },
              animatedTextInputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.value.color['gray-5']}
            editable={editable}
            {...props}
          />
        )}
      </Animated.View>
      {description && (
        <AnimatedText
          style={[inputStyles.description, animatedDescriptionStyle]}>
          {description}
        </AnimatedText>
      )}
      {showMaxLength && (
        <AnimatedText style={[inputStyles.count, animatedCountStyle]}>
          {props.value ? props.value.length : 0}/{props.maxLength}
        </AnimatedText>
      )}
    </View>
  );
}
