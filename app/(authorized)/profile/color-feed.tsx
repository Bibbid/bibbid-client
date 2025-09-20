import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { ProfileColorFeeds } from '~/pages/profile';
import {
  BlankNavItem,
  NavBackButton,
  TopNavigation,
} from '~/shared/ui/navigation';

export default function ColorFeed() {
  const searchParams = useLocalSearchParams<{ color: string }>();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation left={<NavBackButton />} right={<BlankNavItem />} />
      <ProfileColorFeeds color={searchParams.color} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
}));
