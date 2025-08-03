import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

export default function Layout() {
  return (
    <Stack screenOptions={{ contentStyle: styles.container }}>
      <Stack.Screen name="index" options={{ title: 'Foundation' }} />
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
}));
