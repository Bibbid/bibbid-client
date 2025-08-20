import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

export type ButtonVariantsProps = UnistylesVariants<typeof buttonStyles>;

export const buttonStyles = StyleSheet.create((theme) => ({
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
