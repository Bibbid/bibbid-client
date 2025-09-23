import '../translation';
import ErrorScreen from './error';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ErrorBoundary } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { OverlayProvider } from 'overlay-kit';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { AuthLoaded } from '~/shared/auth';
import { Toast } from '~/shared/ui/toast';

const queryClient = new QueryClient();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

/**
 * Font loading issues on Android
 * - https://github.com/expo/expo/issues/33108
 * - https://github.com/expo/expo/issues/33673
 */
export default function Layout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthLoaded>
          <OverlayProvider>
            <SafeAreaView edges={['left', 'right']} style={styles.container}>
              <BottomSheetModalProvider>
                <ErrorBoundary fallback={<ErrorScreen />}>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      contentStyle: styles.container,
                    }}>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                  </Stack>
                  <Toast />
                  {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
                </ErrorBoundary>
              </BottomSheetModalProvider>
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
