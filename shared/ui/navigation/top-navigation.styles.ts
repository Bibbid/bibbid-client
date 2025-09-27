import { StyleSheet } from 'react-native-unistyles';

export const topNavigationStyles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.color['gray-1'],
    padding: 12,
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['medium'],
  },
  blank: {
    width: 40,
    height: '100%',
  },
}));
