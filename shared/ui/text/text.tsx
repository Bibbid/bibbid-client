import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface CustomTextProps extends RNTextProps {
  weight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const fontWeights = {
  '100': 'Montserrat-Thin',
  '200': 'Montserrat-ExtraLight',
  '300': 'Montserrat-Light',
  '400': 'Montserrat-Regular',
  '500': 'Montserrat-Medium',
  '600': 'Montserrat-SemiBold',
  '700': 'Montserrat-Bold',
  '800': 'Montserrat-ExtraBold',
  '900': 'Montserrat-Black',
};

export function CustomText({ style, weight, ...props }: CustomTextProps) {
  return (
    <RNText
      style={[style, { fontFamily: fontWeights[weight ?? '400'] }]}
      {...props}
    />
  );
}
