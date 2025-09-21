import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button, ButtonText } from '~/shared/ui/button';
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
      <CustomText>Upload Successful</CustomText>
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
  description: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight['semibold'],
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
