import { StyleSheet } from 'react-native-unistyles';

export const modalStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color['opacity-black-80'],
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius['lg'],
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    width: 312,
    height: 'auto',
    rowGap: 24,
    backgroundColor: theme.color['gray-2'],
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 8,
  },
  title: {
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['xl'],
    color: theme.color['gray-11'],
    textAlign: 'center',
  },
  subTitle: {
    fontSize: theme.fontSize['lg'],
    color: theme.color['gray-11'],
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSize['md'],
    color: theme.color['gray-7'],
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    color: theme.color['gray-4'],
  },
}));

export const confirmModalStyles = StyleSheet.create((theme) => ({
  cancelButtonText: {
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
    color: 'white',
  },
  actionButtonText: {
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
    color: theme.color['gray-3'],
  },
}));
