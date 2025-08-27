import { StyleSheet } from 'react-native-unistyles';

export const inputStyles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 6,
  },
  root: {
    height: 44,
    width: '100%',
    backgroundColor: theme.color['gray-2'],
    borderRadius: theme.radius['md'],
    paddingHorizontal: 14,
    color: theme.color['gray-5'],
    borderWidth: 1,
    borderColor: 'transparent',
    variants: {
      isFocused: {
        true: {
          borderColor: theme.color['gray-6'],
          color: theme.color['gray-11'],
        },
      },
      isError: {
        true: {
          borderWidth: 1,
          borderColor: theme.color['red-3'],
          color: theme.color['red-3'],
        },
      },
      isDisabled: {
        true: {
          backgroundColor: theme.color['opacity-white-2'],
          color: theme.color['opacity-white-16'],
        },
      },
    },
  },
  description: {
    fontSize: theme.fontSize['xs'],
    color: theme.color['gray-6'],
    variants: {
      isError: {
        true: {
          color: theme.color['red-3'],
        },
      },
      isDisabled: {
        true: {
          color: theme.color['opacity-white-8'],
        },
      },
    },
  },
  count: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -20 }],
    fontSize: theme.fontSize['xs'],
    color: theme.color['gray-6'],
    variants: {
      isDisabled: {
        true: {
          color: theme.color['opacity-white-8'],
        },
      },
      isFocused: {
        true: {
          color: theme.color['gray-11'],
        },
      },
      isError: {
        true: {
          color: theme.color['red-3'],
        },
      },
    },
  },
}));
