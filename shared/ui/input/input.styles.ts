import { StyleSheet } from 'react-native-unistyles';

export const inputStyles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 6,
  },
  root: {
    height: 44,
    width: '100%',
    backgroundColor: theme.color['gray-2'],
    borderRadius: theme.radius['md'],
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: theme.fontSize['xs'],
    color: theme.color['gray-6'],
  },
  count: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    fontSize: theme.fontSize['xs'],
    color: theme.color['gray-6'],
  },
}));
