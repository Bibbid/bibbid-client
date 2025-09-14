import '../translation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { BottomSheetOverlayProvider } from '~/shared/ui/bottom-sheet';
import { Toast } from '~/shared/ui/toast';

const queryClient = new QueryClient();

export default function Layout() {
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
    fontFamily: 'Montserrat',
  },
}));
