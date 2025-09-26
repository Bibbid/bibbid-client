import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import AlertTriangle from '~/assets/icons/alert-triangle.svg';
import { useAuth } from '~/shared/auth';
import { Button, ButtonText } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

export default function ErrorScreen() {
  const { isSignedIn } = useAuth();

  const router = useRouter();

  const handleGoHome = () => {
    console.log('handleGoHome');

    if (isSignedIn) {
      router.push('/(authorized)/home');
    } else {
      router.push('/(unauthorized)/sign-in');
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={styles.container}>
      <View style={styles.content}>
        <AlertTriangle />
        <View style={styles.descriptionContainer}>
          <CustomText style={styles.descriptionHeader}>
            An error has occurred
          </CustomText>
          <CustomText style={styles.descriptionBody}>
            Please try again
          </CustomText>
        </View>
      </View>
      <View style={styles.footer}>
        <Button size="xl" style={styles.footerButton} onPress={handleGoHome}>
          <ButtonText>Go Home</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.color['gray-1'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    rowGap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    rowGap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionHeader: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['lg'],
  },
  descriptionBody: {
    color: theme.color['gray-6'],
    fontSize: theme.fontSize['md'],
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  footerButton: {
    width: '100%',
  },
}));
