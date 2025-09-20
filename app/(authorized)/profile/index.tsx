import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { Button, ButtonText } from '~/shared/ui/button';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function ProfileScreen() {
  const router = useRouter();

  const theme = useAnimatedTheme();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={
          <Button>
            <ButtonText size="sm">Token</ButtonText>
            <CustomText style={styles.token}>1100p</CustomText>
          </Button>
        }
        right={
          <Pressable onPress={() => router.push('/(authorized)/settings')}>
            <Settings color={theme.value.color['gray-5']} />
          </Pressable>
        }
      />
      <View style={styles.content}></View>
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 40,
    paddingHorizontal: 20,
  },
}));
