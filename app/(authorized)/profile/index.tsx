import { PrefetchQuery, SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Suspense } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { getCollectedColorOptions } from '~/entities/color';
import { Profile } from '~/pages/profile';
import { TokenStatusButton } from '~/pages/shop';
import { Loading } from '~/shared/ui/loading';
import { TopNavigation } from '~/shared/ui/navigation';

export default function ProfileScreen() {
  const router = useRouter();

  const theme = useAnimatedTheme();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Suspense fallback={<Loading />}>
        <PrefetchQuery {...getCollectedColorOptions()} />
        <TopNavigation
          left={<TokenStatusButton />}
          right={
            <Pressable onPress={() => router.push('/(authorized)/settings')}>
              <Settings color={theme.value.color['gray-5']} />
            </Pressable>
          }
        />
        <Profile />
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
