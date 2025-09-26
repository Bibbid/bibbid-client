import { useLocalSearchParams, useRouter } from 'expo-router';
import { MoreHorizontal } from 'lucide-react-native';
import { Suspense } from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { FeedDetail } from '~/pages/feed';
import { Loading } from '~/shared/ui/loading';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';

export default function FeedDetailScreen() {
  const router = useRouter();

  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  if (!feedId) {
    return router.replace('/(authorized)/home');
  }

  return (
    <View style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        right={
          <Pressable style={styles.optionButton}>
            <MoreHorizontal size={24} color="white" />
          </Pressable>
        }
      />
      <KeyboardAwareScrollView style={styles.scrollView}>
        <Suspense fallback={<Loading />}>
          <FeedDetail feedId={Number(feedId)} />
        </Suspense>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
    justifyContent: 'flex-start',
  },
  optionButton: {
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
}));
