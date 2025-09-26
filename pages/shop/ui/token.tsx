import TokenStatusButton from './token-status-button';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Image } from '~/shared/ui/image';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function Token() {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView style={[styles.container, { paddingTop: top }]}>
      <TopNavigation
        left={<NavBackButton />}
        right={<TokenStatusButton />}
        style={styles.topNavigation}
      />
      <View style={styles.overlay}>
        <Image
          style={styles.overlayBackground}
          source={require('~/assets/images/overlay-background.png')}
        />
        <View style={styles.overlayContent}>
          <CustomText style={styles.overlayContentText}>
            {`Get Token for\nCustomize`}
          </CustomText>
          <CustomText style={styles.overlayContentDescription}>
            BBD is how you meet yourself
          </CustomText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  topNavigation: {
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 360,
  },
  overlayBackground: {
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    textAlign: 'left',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  overlayContentText: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  overlayContentDescription: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
}));
