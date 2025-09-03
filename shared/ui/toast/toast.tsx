import { Info } from 'lucide-react-native';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
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
        renderLeadingIcon={() => <Info color="white" size={18} />}
        {...props}
      />
    );
  },

  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: (props) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'pink' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: (props) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17
  //     }}
  //     text2Style={{
  //       fontSize: 15
  //     }}
  //   />
  // ),
};

function Toast() {
  return <_Toast config={toastConfig} type="default" topOffset={70} />;
}

type OmittedToastProps = 'text1' | 'text2' | 'text1Style' | 'text2Style';

type ToastMessageType = {
  text1: string;
  text2?: string;
  text1Style?: StyleProp<TextStyle>;
  text2Style?: StyleProp<TextStyle>;
};

/**
 * 상단 토스트
 * - 클릭 이벤트 시 토스트 닫기를 기본으로 합니다
 */
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
      _Toast.hide(); // 클릭 시 토스트 닫기를 기본으로 합니다
    },
    ...props,
  });
}

export { showToast, Toast };
