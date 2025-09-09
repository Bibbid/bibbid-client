import '../translation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { StyleSheet } from 'react-native-unistyles';
import { Toast } from '~/shared/ui/toast';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: styles.container }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
      <Toast />
      {__DEV__ && <DevToolsBubble queryClient={queryClient} />}
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
    fontFamily: 'Montserrat',
  },
}));
