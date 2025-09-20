import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { SettingShortcuts } from '~/pages/settings';
import { BlankNavItem, TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function SettingsScreen() {
  const router = useRouter();

  const theme = useAnimatedTheme();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft color={theme.value.color['gray-5']} />
          </Pressable>
        }
        center={<CustomText style={styles.title}>Setting</CustomText>}
        right={<BlankNavItem />}
      />
      <SettingShortcuts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: theme.fontWeight['medium'],
    fontSize: theme.fontSize['md'],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 40,
    paddingHorizontal: 20,
  },
}));
