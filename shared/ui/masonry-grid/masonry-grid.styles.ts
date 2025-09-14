import { StyleSheet } from 'react-native-unistyles';

export const masonryGridStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    minWidth: 156,
    width: '100%',
    borderRadius: theme.radius['xs'],
  },
  separator: {
    width: '100%',
    height: 14,
  },
  topGradient: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGradient: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
}));
