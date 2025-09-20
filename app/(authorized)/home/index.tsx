import { ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import Logo from '~/assets/icons/logo.svg';
import {
  TodayColorSection,
  ResetColorBoundary,
  WhatsNewSection,
} from '~/pages/home';
import { mmkv } from '~/shared/model';
import { TopNavigation } from '~/shared/ui/navigation';

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();

  const theme = useAnimatedTheme();

  const backgroundColor = mmkv.getString('todayColorRgb');
  const shadowColor = mmkv.getString('todayColorShadow');

  return (
    <View style={styles.container}>
      <ResetColorBoundary>
        <View
          style={[
            {
              paddingTop: top,
              backgroundColor,
              filter: [
                {
                  dropShadow: {
                    color: shadowColor || theme.value.color['gray-1'],
                    offsetX: 10,
                    offsetY: -3,
                    standardDeviation: '15px',
                  },
                },
              ],
            },
          ]}>
          <StatusBar barStyle="light-content" />
          <View style={{ paddingHorizontal: 8 }}>
            <TopNavigation
              left={<Logo />}
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </View>
        <ScrollView style={styles.content}>
          <TodayColorSection />
          <View style={styles.gap} />
          <WhatsNewSection />
        </ScrollView>
      </ResetColorBoundary>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
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
