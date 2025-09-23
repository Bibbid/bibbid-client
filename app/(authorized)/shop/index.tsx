import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Shop } from '~/pages/shop';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';

export default function ShopScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation left={<NavBackButton />} />
      <Shop />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
