import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Token } from '~/pages/shop';

export default function TokenScreen() {
  return (
    <View style={styles.container}>
      <Token />
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
  },
}));
