import '../translation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { OverlayProvider } from 'overlay-kit';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { AuthLoaded } from '~/shared/auth';
import { Toast } from '~/shared/ui/toast';

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

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (
      !process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_APPLE_API_KEY ||
      !process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY
    ) {
      throw new Error('RevenueCat API key is not set');
    }

    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_APPLE_API_KEY,
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY,
      });
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthLoaded>
          <OverlayProvider>
            <SafeAreaView edges={['left', 'right']} style={styles.container}>
              <BottomSheetModalProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: styles.container,
                  }}>
                  <Stack.Screen name="index" options={{ title: 'Home' }} />
                  <Stack.Screen name="(authorized)" />
                  <Stack.Screen name="(unauthorized)" />
                </Stack>
                <Toast />
                {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
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
