import '../translation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { configure, getConsoleSink } from '@logtape/logtape';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { OverlayProvider } from 'overlay-kit';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { AuthLoaded } from '~/shared/auth';
import { useHideSplashScreen, useRevenueCat } from '~/shared/lib';
import { Toast } from '~/shared/ui/toast';

const isDev = process.env.NODE_ENV === 'development';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
    },
  },
});

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    {
      category: 'bibbid',
      lowestLevel: 'debug',
      sinks: isDev ? ['console'] : [],
    },
  ],
});

/**
 * Font loading issues on Android
 * - https://github.com/expo/expo/issues/33108
 * - https://github.com/expo/expo/issues/33673
 */
export default function Layout() {
  useHideSplashScreen();

  useRevenueCat();

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthLoaded>
          <OverlayProvider>
            <SafeAreaView edges={['left', 'right']} style={styles.container}>
              <KeyboardProvider>
                <BottomSheetModalProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      contentStyle: styles.container,
                      animation: 'none',
                    }}>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                    <Stack.Screen name="(authorized)" />
                    <Stack.Screen name="(unauthorized)" />
                  </Stack>
                  <Toast />
                  {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
                </BottomSheetModalProvider>
              </KeyboardProvider>
            </SafeAreaView>
          </OverlayProvider>
        </AuthLoaded>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
}));
