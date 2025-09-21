import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

export default function Layout() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Stack
        screenOptions={{ contentStyle: styles.content, headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  content: {
    backgroundColor: 'transparent',
  },
}));
