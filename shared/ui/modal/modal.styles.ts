import { StyleSheet } from 'react-native-unistyles';

export const modalStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: theme.fontWeight['medium'],
    fontSize: theme.fontSize['lg'],
    color: theme.color['gray-11'],
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSize['md'],
    color: theme.color['gray-7'],
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 24,
    color: theme.color['gray-4'],
  },
}));

export const confirmModalStyles = StyleSheet.create((theme) => ({
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  button: {
    flex: 1,
  },
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

export const generalModalStyles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 12,
  },
  title: {
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['xl'],
    color: theme.color['gray-11'],
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  descriptionWrapper: {
    rowGap: 4,
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  button: {
    flex: 1,
  },
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
