import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { getMyTokensOptions } from '~/entities/token';
import { Button, ButtonText } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

export default function Shop() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>Shop</CustomText>
        <CustomText style={styles.description}>
          Make your day colorful with items
        </CustomText>
      </View>
      <View style={styles.content}>
        <View style={styles.tokenContainer}>
          <View style={styles.tokenHeader}>
            <CustomText style={styles.tokenDescription}>Your Token</CustomText>
            <Suspense>
              <SuspenseQuery {...getMyTokensOptions()}>
                {({ data }) => (
                  <CustomText style={styles.tokenAmount}>
                    {data.tokenCount}p
                  </CustomText>
                )}
              </SuspenseQuery>
            </Suspense>
          </View>
          <Button
            size="xl"
            variant="solid-light"
            onPress={() => router.push('/(authorized)/shop/token')}>
            <ButtonText size="md">Buy Token</ButtonText>
          </Button>
        </View>
        <View style={styles.itemListContainer}>
          <CustomText style={styles.itemTitle}>Items</CustomText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 4,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  description: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    rowGap: 16,
  },
  tokenContainer: {
    padding: 12,
    rowGap: 8,
    backgroundColor: theme.color['gray-2'],
  },
  tokenHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenDescription: {
    color: 'white',
    fontSize: theme.fontSize['sm'],
  },
  tokenAmount: {
    color: 'white',
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  itemListContainer: {
    rowGap: 16,
  },
  itemTitle: {
    color: 'white',
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
}));
