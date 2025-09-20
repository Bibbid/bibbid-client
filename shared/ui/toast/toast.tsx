import { CircleCheck, Info } from 'lucide-react-native';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import _Toast, {
  BaseToast,
  ToastConfig,
  ToastShowParams,
} from 'react-native-toast-message';
import { COLOR_TOKEN } from '~/theme';

const baseToastStyle: StyleProp<ViewStyle> = {
  shadowOffset: undefined,
  shadowOpacity: undefined,
  shadowRadius: undefined,
  elevation: undefined,
  borderLeftWidth: 0,
  width: 320,
  minHeight: 45,
  height: 'auto',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: COLOR_TOKEN['gray-2'],
  borderRadius: 8,
};

const baseContentContainerStyle: StyleProp<ViewStyle> = {
  paddingHorizontal: 0,
  marginLeft: 8,
  rowGap: 4,
};

const baseTextStyle: StyleProp<TextStyle> = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: 400,
  color: 'white',
  marginBottom: 0,
  fontFamily: 'Montserrat-Regular',
} as const;

const toastConfig: ToastConfig = {
  default: ({ text1Style, text2Style, ...props }) => {
    const mergedText1Style =
      typeof text1Style === 'object'
        ? { ...baseTextStyle, ...text1Style }
        : baseTextStyle;

    const mergedText2Style =
      typeof text2Style === 'object'
        ? { ...baseTextStyle, ...text2Style }
        : baseTextStyle;

    return (
      <BaseToast
        style={baseToastStyle}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={mergedText1Style}
        text2Style={mergedText2Style}
        renderLeadingIcon={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Info color="white" size={18} />
          </View>
        )}
        {...props}
      />
    );
  },
  success: ({ text1Style, text2Style, ...props }) => {
    const mergedText1Style =
      typeof text1Style === 'object'
        ? { ...baseTextStyle, ...text1Style }
        : baseTextStyle;

    const mergedText2Style =
      typeof text2Style === 'object'
        ? { ...baseTextStyle, ...text2Style }
        : baseTextStyle;

    return (
      <BaseToast
        style={baseToastStyle}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={mergedText1Style}
        text2Style={mergedText2Style}
        text1NumberOfLines={3}
        text2NumberOfLines={3}
        renderLeadingIcon={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <CircleCheck color={COLOR_TOKEN['green-3']} size={18} />
          </View>
        )}
        {...props}
      />
    );
  },
  error: ({ text1Style, text2Style, ...props }) => {
    const mergedText1Style =
      typeof text1Style === 'object'
        ? { ...baseTextStyle, ...text1Style }
        : baseTextStyle;

    const mergedText2Style =
      typeof text2Style === 'object'
        ? { ...baseTextStyle, ...text2Style }
        : baseTextStyle;

    return (
      <BaseToast
        style={baseToastStyle}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={mergedText1Style}
        text2Style={mergedText2Style}
        text1NumberOfLines={3}
        text2NumberOfLines={3}
        renderLeadingIcon={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Info color={COLOR_TOKEN['red-3']} size={18} />
          </View>
        )}
        {...props}
      />
    );
  },
  warn: ({ text1Style, text2Style, ...props }) => {
    const mergedText1Style =
      typeof text1Style === 'object'
        ? { ...baseTextStyle, ...text1Style }
        : baseTextStyle;

    const mergedText2Style =
      typeof text2Style === 'object'
        ? { ...baseTextStyle, ...text2Style }
        : baseTextStyle;

    return (
      <BaseToast
        style={baseToastStyle}
        contentContainerStyle={baseContentContainerStyle}
        text1Style={mergedText1Style}
        text2Style={mergedText2Style}
        text1NumberOfLines={3}
        text2NumberOfLines={3}
        renderLeadingIcon={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Info color={COLOR_TOKEN['yellow-3']} size={18} />
          </View>
        )}
        {...props}
      />
    );
  },
};

function Toast() {
  return (
    <_Toast
      config={toastConfig}
      type="default"
      topOffset={70}
      bottomOffset={72}
      position="bottom"
    />
  );
}

type OmittedToastProps = 'text1' | 'text2' | 'text1Style' | 'text2Style';

type ToastMessageType = {
  text1: string;
  text2?: string;
  text1Style?: StyleProp<TextStyle>;
  text2Style?: StyleProp<TextStyle>;
};

function showToast({
  text1,
  text2,
  text1Style,
  text2Style,
  onPress,
  ...props
}: Omit<ToastShowParams, OmittedToastProps> & ToastMessageType) {
  return _Toast.show({
    text1,
    text2,
    text1Style,
    text2Style,
    onPress: () => {
      onPress?.();
      _Toast.hide();
    },
    ...props,
  });
}

export { showToast, Toast };
