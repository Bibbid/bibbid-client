import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import {
  GetTodayColorSection,
  HeroImageSlide,
  ResetColorBoundary,
} from '~/pages/home/ui';
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
          <TopNavigation left={<CustomText>BBD</CustomText>} />
        </View>
        <View style={styles.content}>
          <GetTodayColorSection />
          <HeroImageSlide />
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 40,
    paddingHorizontal: 20,
  },
}));
