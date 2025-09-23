import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { getMyTokensOptions } from '~/entities/token';
import { Button, ButtonText } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

export default function TokenStatusButton() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push('/(authorized)/shop')}>
      <ButtonText size="sm">Token</ButtonText>
      <Suspense>
        <SuspenseQuery {...getMyTokensOptions()}>
          {({ data }) => (
            <CustomText style={styles.token}>{data.tokenCount}p</CustomText>
          )}
        </SuspenseQuery>
      </Suspense>
    </Button>
  );
}

const styles = StyleSheet.create((theme) => ({
  token: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    paddingLeft: 4,
  },
}));
