import { StyleSheet } from 'react-native-unistyles';

export const tabsStyles = StyleSheet.create((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 2,
  },
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    variants: {
      active: {
        true: {
          backgroundColor: theme.color['gray-3'],
        },
        false: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  text: {
    color: theme.color['gray-5'],
    fontSize: theme.fontSize['sm'],
    variants: {
      active: {
        true: {
          color: theme.color['gray-11'],
          fontWeight: 600,
        },
        false: {
          color: theme.color['opacity-white-16'],
        },
      },
    },
  },
}));
