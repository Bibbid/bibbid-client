import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Suspense } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { getMyTokensOptions } from '~/entities/token';
import { Profile } from '~/pages/profile';
import { Button, ButtonText } from '~/shared/ui/button';
import { Loading } from '~/shared/ui/loading';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function ProfileScreen() {
  const router = useRouter();

  const theme = useAnimatedTheme();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Suspense fallback={<Loading />}>
        <TopNavigation
          left={
            <Button>
              <ButtonText size="sm">Token</ButtonText>
              <SuspenseQuery {...getMyTokensOptions()}>
                {({ data }) => (
                  <CustomText style={styles.token}>
                    {data.tokenCount}p
                  </CustomText>
                )}
              </SuspenseQuery>
            </Button>
          }
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
  token: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    paddingLeft: 4,
  },
}));
