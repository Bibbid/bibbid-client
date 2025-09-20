import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{ contentStyle: styles.content, headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="color-feed" />
      </Stack>
    </View>
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
