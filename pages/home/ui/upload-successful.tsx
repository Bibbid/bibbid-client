import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';
import { StyleSheet } from 'react-native-unistyles';
import { Button, ButtonText } from '~/shared/ui/button';
import { Image } from '~/shared/ui/image';
import { CustomText } from '~/shared/ui/text';

const DELAY = 3000;

export default function UploadSuccessful() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/(authorized)/home');
    }, DELAY);

    return () => clearTimeout(timeout);
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>Upload Successful</CustomText>
        <Image
          source={require('~/assets/images/purchase.png')}
          style={styles.image}
        />
        <CustomText style={styles.description}>+100</CustomText>
      </View>
      <View style={styles.footer}>
        <Button
          variant="solid-gray"
          size="xl"
          style={styles.button}
          onPress={() => router.push('/(authorized)/home')}>
          <ButtonText variant="solid-gray" size="md" style={styles.buttonText}>
            Go Home
          </ButtonText>
        </Button>
      </View>
      <ContinuousConfetti />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.color['gray-2'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 24,
  },
  title: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight['semibold'],
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  description: {
    color: 'white',
    fontSize: theme.fontSize['2xl'],
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 32,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
  },
}));
