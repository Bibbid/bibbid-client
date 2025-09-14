import { StyleSheet } from 'react-native-unistyles';

export const bottomNavigationStyles = StyleSheet.create((theme) => ({
  safeArea: {
    position: 'absolute',
    backgroundColor: theme.color['gray-2'],
    bottom: 0,
    width: '100%',
    paddingHorizontal: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  item: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: theme.fontSize['xs'],
    color: theme.color['gray-5'],
    variants: {
      active: {
        true: {
          color: theme.color['gray-11'],
        },
      },
    },
  },
}));
