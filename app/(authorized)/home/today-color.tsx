import { Image } from 'expo-image';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TodayColor } from '~/pages/home';

export default function TodayColorScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('~/assets/images/background.png')}
        style={styles.image}
      />
      <TodayColor />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
