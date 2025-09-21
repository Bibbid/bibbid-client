import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { UploadSuccessful } from '~/pages/home';

export default function UploadSuccessfulScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <UploadSuccessful />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
