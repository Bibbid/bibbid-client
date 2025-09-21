import { StyleSheet } from 'react-native-unistyles';

export const folderStyles = StyleSheet.create((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleWrapper: {
    backgroundColor: theme.color['gray-2'],
    paddingHorizontal: 10,
    height: 24,
  },
  title: {
    color: theme.color['gray-10'],
    fontSize: theme.fontSize['md'],
  },
  content: {
    position: 'relative',
    backgroundColor: theme.color['gray-2'],
    width: '100%',
    height: 182,
    padding: 18,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: theme.color['opacity-black-16'],
    zIndex: 1,
  },
  contentImageWrapper: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    width: '100%',
    height: '100%',
  },
  contentImage: {
    width: '100%',
    height: 120,
  },
  contentImageFooter: {
    height: 34,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentImageFooterText: {
    width: '100%',
    color: theme.color['opacity-white-80'],
    fontSize: theme.fontSize['md'],
  },
}));
