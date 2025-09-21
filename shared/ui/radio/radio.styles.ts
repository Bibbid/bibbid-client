import { StyleSheet } from 'react-native-unistyles';

export const radioStyles = StyleSheet.create((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    variants: {
      active: {
        true: {},
        false: {},
      },
      disabled: {},
    },
  },
  container: {
    position: 'relative',
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1.25,
    borderColor: theme.color['gray-5'],
    backgroundColor: 'transparent',
    variants: {
      active: {
        true: {
          backgroundColor: 'white',
          borderColor: 'white',
        },
        false: {
          backgroundColor: 'transparent',
          borderColor: theme.color['gray-5'],
        },
      },
      disabled: {
        true: {
          backgroundColor: theme.color['opacity-white-16'],
          borderColor: theme.color['opacity-white-4'],
        },
      },
    },
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateY: '-50%' }, { translateX: '-50%' }],
    width: 10,
    height: 10,
    borderRadius: 9999,
    zIndex: 1,
    backgroundColor: 'transparent',
    variants: {
      active: {
        true: {
          backgroundColor: theme.color['gray-1'],
        },
        false: {
          backgroundColor: 'transparent',
        },
      },
      disabled: {
        true: {
          backgroundColor: theme.color['gray-1'],
        },
      },
    },
  },
  label: {
    color: theme.color['gray-5'],
    fontSize: theme.fontSize['md'],
    variants: {
      active: {
        true: {
          color: 'white',
        },
        false: {
          color: theme.color['gray-6'],
        },
      },
      disabled: {
        true: {
          color: theme.color['gray-3'],
        },
      },
    },
  },
}));
