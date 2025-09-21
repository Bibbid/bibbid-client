import { StyleSheet } from 'react-native-unistyles';

export const bottomSheetStyles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 16.5,
  },
  background: {
    backgroundColor: theme.color['gray-1'],
  },
  handle: {},
  handleIndicator: {
    backgroundColor: 'transparent',
  },
}));
