import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export function CustomText({ style, ...props }: RNTextProps) {
  return <RNText style={[{ fontFamily: 'Montserrat' }, style]} {...props} />;
}
