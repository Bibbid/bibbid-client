import { useLocalSearchParams, useRouter } from 'expo-router';
import { MoreHorizontal } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { FeedDetail } from '~/pages/feed';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';

export default function FeedDetailScreen() {
  const router = useRouter();

  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  if (!feedId) {
    return router.replace('/(authorized)/home');
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        right={
          <Pressable style={styles.optionButton}>
            <MoreHorizontal size={24} color="white" />
          </Pressable>
        }
      />
      <FeedDetail feedId={Number(feedId)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  optionButton: {
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
