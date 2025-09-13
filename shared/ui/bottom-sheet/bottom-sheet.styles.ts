import { StyleSheet } from 'react-native-unistyles';

export const bottomSheetStyles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 16.5,
  },
  background: {
    backgroundColor: theme.color['gray-2'],
  },
  handle: {},
  handleIndicator: {
    backgroundColor: 'transparent',
  },
}));
