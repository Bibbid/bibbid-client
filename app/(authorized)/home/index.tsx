import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import {
  GetTodayColorSection,
  ResetColorBoundary,
  WhatsNewSection,
} from '~/pages/home';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function HomeScreen() {
  const theme = useAnimatedTheme();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ResetColorBoundary>
        <View style={styles.header}>
          <StatusBar
            backgroundColor={theme.value.color['gray-2']}
            barStyle="light-content"
          />
          <TopNavigation
            left={<CustomText style={styles.title}>BBD</CustomText>}
          />
        </View>
        <View style={styles.content}>
          <GetTodayColorSection />
          <WhatsNewSection />
        </View>
      </ResetColorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
    color: 'white',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 40,
    paddingHorizontal: 20,
  },
}));
