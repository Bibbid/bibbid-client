import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import SignIn from '~/pages/sign-up/ui/sign-up';
import { Image } from '~/shared/ui/image';

export default function SignInScreen() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Image
        source={require('~/assets/images/background.png')}
        style={styles.image}
      />
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
}));
