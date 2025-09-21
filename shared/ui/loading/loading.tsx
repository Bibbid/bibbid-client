import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('~/assets/lottie/loading.json')}
        style={styles.lottie}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 140,
    height: 140,
  },
}));
