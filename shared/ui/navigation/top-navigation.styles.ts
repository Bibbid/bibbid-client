import { StyleSheet } from 'react-native-unistyles';

export const topNavigationStyles = StyleSheet.create((theme) => ({
  container: {
    zIndex: 50,
    backgroundColor: theme.color['gray-1'],
    padding: 12,
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blank: {
    width: 40,
    height: '100%',
  },
}));
