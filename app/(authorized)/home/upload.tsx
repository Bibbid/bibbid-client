import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { UploadSection } from '~/pages/home';

export default function UploadScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <UploadSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
