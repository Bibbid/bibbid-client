import { Suspense } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import Logo from '~/assets/icons/logo.svg';
import { useTodayColor } from '~/entities/color';
import { TodayColorSection, WhatsNewSection } from '~/pages/home';
import { Loading } from '~/shared/ui/loading';
import { TopNavigation } from '~/shared/ui/navigation';

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();

  const { rgbHexCode, shadowHexCode } = useTodayColor();

  const theme = useAnimatedTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          {
            backgroundColor: rgbHexCode,
            filter: [
              {
                dropShadow: {
                  color: shadowHexCode || theme.value.color['gray-1'],
                  offsetX: 10,
                  offsetY: -3,
                  standardDeviation: '15px',
                },
              },
            ],
          },
        ]}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.header, { paddingTop: top }]}>
          <TopNavigation
            left={<Logo />}
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Suspense fallback={<Loading />}>
          <TodayColorSection />
          <View style={styles.gap} />
          <WhatsNewSection />
          <View style={styles.gap} />
        </Suspense>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
  },
  header: {
    paddingHorizontal: 8,
    backgroundColor: theme.color['opacity-white-8'],
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
    color: 'white',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 486,
    zIndex: -1,
  },
  gap: {
    width: '100%',
    height: 40,
  },
}));
