import '../translation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { BottomSheetOverlayProvider } from '~/shared/ui/bottom-sheet';
import { Toast } from '~/shared/ui/toast';

const queryClient = new QueryClient();

/**
 * Font loading issues on Android
 * - https://github.com/expo/expo/issues/33108
 * - https://github.com/expo/expo/issues/33673
 */

export default function Layout() {
  // 폰트 로딩 상태 확인
  const loadedFonts = Font.getLoadedFonts();
  console.log('Loaded fonts:', loadedFonts);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetOverlayProvider>
          <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: styles.container,
              }}>
              <Stack.Screen name="index" options={{ title: 'Home' }} />
            </Stack>
            <Toast />
            {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
          </SafeAreaView>
        </BottomSheetOverlayProvider>
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
